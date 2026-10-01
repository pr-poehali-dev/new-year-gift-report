import json
import os
import re
import smtplib
from email.mime.text import MIMEText
from email.header import Header
from urllib.parse import urlencode
from urllib.request import urlopen
import psycopg2
import psycopg2.extras

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json',
}

AMOUNT_LABELS = {
    '1-10': '1–10 шт.',
    '10-50': '10–50 шт.',
    '50-200': '50–200 шт.',
    '200+': 'Более 200 шт.',
}


def resp(status: int, data: dict) -> dict:
    return {
        'statusCode': status,
        'headers': CORS,
        'isBase64Encoded': False,
        'body': json.dumps(data, ensure_ascii=False, default=str),
    }


def esc(v) -> str:
    return str(v).replace("'", "''")


def split_list(raw: str) -> list:
    return [x.strip() for x in re.split(r'[,;\n]+', raw or '') if x.strip()]


def normalize_phone(p: str) -> str:
    digits = re.sub(r'\D', '', p)
    if len(digits) == 11 and digits.startswith('8'):
        digits = '7' + digits[1:]
    if len(digits) == 10:
        digits = '7' + digits
    return digits


def send_email(to_list: list, subject: str, text: str) -> str:
    user = os.environ.get('SMTP_USER', '')
    password = os.environ.get('SMTP_PASSWORD', '')
    if not user or not password:
        return 'Почта не настроена: нет SMTP_USER / SMTP_PASSWORD'
    msg = MIMEText(text, 'plain', 'utf-8')
    msg['Subject'] = Header(subject, 'utf-8')
    msg['From'] = user
    msg['To'] = ', '.join(to_list)
    try:
        with smtplib.SMTP_SSL('smtp.yandex.ru', 465, timeout=8) as s:
            s.login(user, password)
            s.sendmail(user, to_list, msg.as_string())
    except Exception as e:
        return f'Ошибка почты: {e}'
    return ''


def send_sms(phones: list, text: str) -> str:
    api_key = os.environ.get('SMSRU_API_KEY', '')
    if not api_key:
        return 'СМС не настроены: нет SMSRU_API_KEY'
    to = ','.join(normalize_phone(p) for p in phones)
    query = urlencode({'api_id': api_key, 'to': to, 'msg': text, 'json': 1})
    try:
        with urlopen(f'https://sms.ru/sms/send?{query}', timeout=8) as r:
            data = json.loads(r.read().decode('utf-8'))
    except Exception as e:
        return f'Ошибка СМС: {e}'
    if data.get('status') != 'OK':
        return f"Ошибка СМС: {data.get('status_text', 'неизвестная ошибка')}"
    return ''


def load_settings(cur, schema: str) -> dict:
    cur.execute(f'SELECT setting_key, value FROM {schema}.notify_settings')
    return {r['setting_key']: r['value'] for r in cur.fetchall()}


def handler(event: dict, context) -> dict:
    """Заявки «Жду звонка»: POST create сохраняет заявку и шлёт письмо и СМС; админ видит список заявок и настраивает получателей уведомлений."""
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    body = json.loads(event.get('body') or '{}') if method == 'POST' else {}
    action = body.get('action', 'create') if method == 'POST' else 'list'

    if action == 'create':
        name = str(body.get('name', '')).strip()[:200]
        phone = str(body.get('phone', '')).strip()[:50]
        amount = str(body.get('amount', '')).strip()[:50]
        if not name or len(re.sub(r'\D', '', phone)) < 10:
            return resp(400, {'error': 'Укажите имя и корректный номер телефона'})

        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute(
            f"INSERT INTO {schema}.leads (name, phone, amount) "
            f"VALUES ('{esc(name)}', '{esc(phone)}', '{esc(amount)}') RETURNING id"
        )
        lead_id = cur.fetchone()['id']
        conn.commit()

        st = load_settings(cur, schema)
        amount_label = AMOUNT_LABELS.get(amount, amount or 'не указано')
        errors = []
        email_ok = sms_ok = False

        emails = split_list(st.get('emails', ''))
        if st.get('email_enabled') == 'true' and emails:
            text = (
                f'Новая заявка с сайта «Жду звонка» №{lead_id}\n\n'
                f'Имя: {name}\nТелефон: {phone}\nКоличество подарков: {amount_label}\n'
            )
            err = send_email(emails, f'Новая заявка: {name}, {phone}', text)
            email_ok = not err
            if err:
                errors.append(err)

        phones = split_list(st.get('phones', ''))
        if st.get('sms_enabled') == 'true' and phones:
            err = send_sms(phones, f'Заявка: {name}, {phone}, подарков: {amount_label}')
            sms_ok = not err
            if err:
                errors.append(err)

        cur.execute(
            f"UPDATE {schema}.leads SET email_sent = {'TRUE' if email_ok else 'FALSE'}, "
            f"sms_sent = {'TRUE' if sms_ok else 'FALSE'}, notify_error = '{esc('; '.join(errors))}' "
            f"WHERE id = {int(lead_id)}"
        )
        conn.commit()
        cur.close()
        conn.close()
        return resp(200, {'success': True, 'id': lead_id})

    headers = {k.lower(): v for k, v in (event.get('headers') or {}).items()}
    admin_password = os.environ.get('ADMIN_PASSWORD', '')
    if not admin_password or headers.get('x-admin-password', '') != admin_password:
        return resp(401, {'error': 'Неверный пароль'})

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    if action == 'list':
        cur.execute(
            f'SELECT id, name, phone, amount, status, email_sent, sms_sent, notify_error, created_at '
            f'FROM {schema}.leads ORDER BY id DESC LIMIT 500'
        )
        leads = [dict(r) for r in cur.fetchall()]
        st = load_settings(cur, schema)
        cur.close()
        conn.close()
        return resp(200, {
            'leads': leads,
            'settings': st,
            'configured': {
                'email': bool(os.environ.get('SMTP_USER') and os.environ.get('SMTP_PASSWORD')),
                'sms': bool(os.environ.get('SMSRU_API_KEY')),
            },
        })

    if action == 'status':
        status = body.get('status', 'new')
        if status not in ('new', 'in_work', 'done'):
            status = 'new'
        cur.execute(f"UPDATE {schema}.leads SET status = '{status}' WHERE id = {int(body.get('id', 0))}")
        conn.commit()
        cur.close()
        conn.close()
        return resp(200, {'success': True})

    if action == 'delete':
        cur.execute(f"DELETE FROM {schema}.leads WHERE id = {int(body.get('id', 0))}")
        conn.commit()
        cur.close()
        conn.close()
        return resp(200, {'success': True})

    if action == 'settings':
        allowed = ('emails', 'phones', 'email_enabled', 'sms_enabled')
        for key, value in (body.get('settings') or {}).items():
            if key not in allowed:
                continue
            cur.execute(
                f"INSERT INTO {schema}.notify_settings (setting_key, value) VALUES ('{esc(key)}', '{esc(value)}') "
                f"ON CONFLICT (setting_key) DO UPDATE SET value = EXCLUDED.value"
            )
        conn.commit()
        cur.close()
        conn.close()
        return resp(200, {'success': True})

    if action == 'test':
        st = load_settings(cur, schema)
        cur.close()
        conn.close()
        result = {}
        emails = split_list(st.get('emails', ''))
        phones = split_list(st.get('phones', ''))
        if emails:
            result['email'] = send_email(emails, 'Проверка уведомлений', 'Это тестовое письмо: уведомления о заявках настроены.') or 'ok'
        if phones:
            result['sms'] = send_sms(phones, 'Проверка: СМС-уведомления о заявках работают') or 'ok'
        return resp(200, result)

    cur.close()
    conn.close()
    return resp(400, {'error': 'Неизвестное действие'})
