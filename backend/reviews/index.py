import json
import os
import psycopg2
import psycopg2.extras

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json',
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


def handler(event: dict, context) -> dict:
    """Отзывы покупателей: GET — список опубликованных, POST — добавить новый отзыв"""
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        name = str(body.get('name', '')).strip()[:100]
        email = str(body.get('email', '')).strip()[:200]
        text = str(body.get('text', '')).strip()[:3000]
        try:
            rating = int(body.get('rating', 5))
        except (TypeError, ValueError):
            rating = 5
        rating = max(1, min(5, rating))
        if not name or not text:
            return resp(400, {'error': 'Укажите имя и текст отзыва'})

        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute(
            f"INSERT INTO {schema}.reviews (name, email, rating, text) "
            f"VALUES ('{esc(name)}', '{esc(email)}', {rating}, '{esc(text)}') "
            f"RETURNING id, name, rating, text, created_at"
        )
        row = cur.fetchone()
        conn.commit()
        conn.close()
        return resp(200, {'ok': True, 'review': row})

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute(
        f"SELECT id, name, rating, text, created_at FROM {schema}.reviews "
        f"WHERE is_published = TRUE ORDER BY created_at DESC LIMIT 200"
    )
    rows = cur.fetchall()
    conn.close()
    return resp(200, {'reviews': rows})
