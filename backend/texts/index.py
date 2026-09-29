import json
import os
import base64
import uuid
import boto3
import psycopg2
import psycopg2.extras

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json',
}


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


EXT_BY_TYPE = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'image/gif': 'gif',
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/zip': 'zip',
}


def upload_image(data_url: str, filename: str = '') -> str:
    header, _, payload = data_url.partition(',')
    mime = header.replace('data:', '').replace(';base64', '').strip() or 'application/octet-stream'
    ext = EXT_BY_TYPE.get(mime, '')
    if not ext and '.' in filename:
        ext = filename.rsplit('.', 1)[-1].lower()[:8]
    if not ext:
        ext = 'bin'

    key_id = os.environ['AWS_ACCESS_KEY_ID']
    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=key_id,
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    name = f'site/{uuid.uuid4().hex}.{ext}'
    s3.put_object(Bucket='files', Key=name, Body=base64.b64decode(payload), ContentType=mime)
    return f'https://cdn.poehali.dev/projects/{key_id}/bucket/{name}'


def handler(event: dict, context) -> dict:
    """Хранит редактируемые надписи сайта: GET отдаёт все тексты, POST сохраняет изменения по паролю администратора."""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    table = f'{schema}.site_texts'
    settings_table = f'{schema}.site_settings'

    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute(
            f'SELECT text_key, section, title, value, multiline, sort_order FROM {table} ORDER BY id'
        )
        rows = cur.fetchall()
        cur.execute(
            f'SELECT setting_key, kind, title, hint, value, sort_order FROM {settings_table} ORDER BY sort_order, id'
        )
        setting_rows = cur.fetchall()
        cur.close()
        conn.close()

        values = {r['text_key']: r['value'] for r in rows}
        fields = [
            {
                'key': r['text_key'],
                'section': r['section'],
                'title': r['title'],
                'value': r['value'],
                'multiline': bool(r['multiline']),
                'order': r['sort_order'],
            }
            for r in rows
        ]
        settings = {r['setting_key']: r['value'] for r in setting_rows}
        setting_fields = [
            {
                'key': r['setting_key'],
                'kind': r['kind'],
                'title': r['title'],
                'hint': r['hint'],
                'value': r['value'],
            }
            for r in setting_rows
        ]
        return {
            'statusCode': 200,
            'headers': CORS,
            'isBase64Encoded': False,
            'body': json.dumps(
                {
                    'values': values,
                    'fields': fields,
                    'settings': settings,
                    'settingFields': setting_fields,
                },
                ensure_ascii=False,
            ),
        }

    if method == 'POST':
        headers = {k.lower(): v for k, v in (event.get('headers') or {}).items()}
        password = headers.get('x-admin-password', '')
        admin_password = os.environ.get('ADMIN_PASSWORD', '')

        body = json.loads(event.get('body') or '{}')

        if body.get('action') == 'login':
            ok = bool(admin_password) and body.get('password') == admin_password
            return {
                'statusCode': 200 if ok else 401,
                'headers': CORS,
                'isBase64Encoded': False,
                'body': json.dumps({'success': ok}),
            }

        if not admin_password or password != admin_password:
            return {
                'statusCode': 401,
                'headers': CORS,
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Неверный пароль'}, ensure_ascii=False),
            }

        if body.get('action') == 'upload':
            return {
                'statusCode': 200,
                'headers': CORS,
                'isBase64Encoded': False,
                'body': json.dumps(
                    {'url': upload_image(body.get('image', ''), body.get('filename', ''))}
                ),
            }

        updates = body.get('updates') or {}
        settings_updates = body.get('settings') or {}
        conn = get_conn()
        cur = conn.cursor()
        saved = 0
        for key, value in updates.items():
            safe_key = str(key).replace("'", "''")
            safe_value = str(value).replace("'", "''")
            cur.execute(
                f"UPDATE {table} SET value = '{safe_value}', updated_at = NOW() WHERE text_key = '{safe_key}'"
            )
            saved += cur.rowcount
        for key, value in settings_updates.items():
            safe_key = str(key).replace("'", "''")
            safe_value = str(value).replace("'", "''")
            cur.execute(
                f"UPDATE {settings_table} SET value = '{safe_value}', updated_at = NOW() WHERE setting_key = '{safe_key}'"
            )
            saved += cur.rowcount
        conn.commit()
        cur.close()
        conn.close()

        return {
            'statusCode': 200,
            'headers': CORS,
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'saved': saved}),
        }

    return {
        'statusCode': 405,
        'headers': CORS,
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'}),
    }