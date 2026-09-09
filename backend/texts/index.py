import json
import os
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


def handler(event: dict, context) -> dict:
    """Хранит редактируемые надписи сайта: GET отдаёт все тексты, POST сохраняет изменения по паролю администратора."""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    table = f'{schema}.site_texts'

    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute(
            f'SELECT text_key, section, title, value, multiline, sort_order FROM {table} ORDER BY id'
        )
        rows = cur.fetchall()
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
        return {
            'statusCode': 200,
            'headers': CORS,
            'isBase64Encoded': False,
            'body': json.dumps({'values': values, 'fields': fields}, ensure_ascii=False),
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

        updates = body.get('updates') or {}
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
