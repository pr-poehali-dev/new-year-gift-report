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


def esc(v):
    return str(v).replace("'", "''")


def upload_image(data_url: str) -> str:
    header, _, payload = data_url.partition(',')
    ext = 'png'
    if 'jpeg' in header or 'jpg' in header:
        ext = 'jpg'
    elif 'webp' in header:
        ext = 'webp'
    key_id = os.environ['AWS_ACCESS_KEY_ID']
    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=key_id,
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    name = f'products/{uuid.uuid4().hex}.{ext}'
    s3.put_object(
        Bucket='files',
        Key=name,
        Body=base64.b64decode(payload),
        ContentType=f'image/{"jpeg" if ext == "jpg" else ext}',
    )
    return f'https://cdn.poehali.dev/projects/{key_id}/bucket/{name}'


def handler(event: dict, context) -> dict:
    """Управляет каталогом подарков: GET отдаёт список наборов, POST создаёт, обновляет и удаляет их по паролю администратора."""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    table = f'{schema}.products'
    conn = psycopg2.connect(os.environ['DATABASE_URL'])

    if method == 'GET':
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute(
            f'SELECT id, name, price, category, weight, image, description, badge, sort_order, is_active '
            f'FROM {table} ORDER BY sort_order, id'
        )
        rows = [dict(r) for r in cur.fetchall()]
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': CORS,
            'isBase64Encoded': False,
            'body': json.dumps({'products': rows}, ensure_ascii=False),
        }

    if method == 'POST':
        headers = {k.lower(): v for k, v in (event.get('headers') or {}).items()}
        admin_password = os.environ.get('ADMIN_PASSWORD', '')
        if not admin_password or headers.get('x-admin-password', '') != admin_password:
            conn.close()
            return {
                'statusCode': 401,
                'headers': CORS,
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Неверный пароль'}, ensure_ascii=False),
            }

        body = json.loads(event.get('body') or '{}')
        action = body.get('action', 'save')
        cur = conn.cursor()

        if action == 'delete':
            cur.execute(f"DELETE FROM {table} WHERE id = {int(body.get('id', 0))}")
            conn.commit()
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': CORS,
                'isBase64Encoded': False,
                'body': json.dumps({'success': True}),
            }

        if action == 'upload':
            url = upload_image(body.get('image', ''))
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': CORS,
                'isBase64Encoded': False,
                'body': json.dumps({'url': url}),
            }

        items = body.get('products') or []
        for p in items:
            pid = int(p.get('id') or 0)
            fields = (
                f"name = '{esc(p.get('name', ''))}', "
                f"price = {int(p.get('price') or 0)}, "
                f"category = '{esc(p.get('category', 'Картон'))}', "
                f"weight = '{esc(p.get('weight', ''))}', "
                f"image = '{esc(p.get('image', ''))}', "
                f"description = '{esc(p.get('description', ''))}', "
                f"badge = '{esc(p.get('badge') or '')}', "
                f"sort_order = {int(p.get('sort_order') or 0)}, "
                f"is_active = {'TRUE' if p.get('is_active', True) else 'FALSE'}, "
                f"updated_at = NOW()"
            )
            if pid > 0:
                cur.execute(f'UPDATE {table} SET {fields} WHERE id = {pid}')
            else:
                cur.execute(
                    f"INSERT INTO {table} (name, price, category, weight, image, description, badge, sort_order, is_active) "
                    f"VALUES ('{esc(p.get('name', 'Новый подарок'))}', {int(p.get('price') or 0)}, "
                    f"'{esc(p.get('category', 'Картон'))}', '{esc(p.get('weight', ''))}', "
                    f"'{esc(p.get('image', ''))}', '{esc(p.get('description', ''))}', "
                    f"'{esc(p.get('badge') or '')}', {int(p.get('sort_order') or 0)}, "
                    f"{'TRUE' if p.get('is_active', True) else 'FALSE'})"
                )

        conn.commit()
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': CORS,
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'saved': len(items)}),
        }

    conn.close()
    return {
        'statusCode': 405,
        'headers': CORS,
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'}),
    }
