import json
import os
import re
from urllib.parse import urlparse
import psycopg2
import psycopg2.extras

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
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


def ref_host(ref: str) -> str:
    try:
        return (urlparse(ref).hostname or '').replace('www.', '')[:300]
    except ValueError:
        return ''


def handler(event: dict, context) -> dict:
    """Статистика посещений: POST — записать визит, GET — сводка для админки (по паролю)"""
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    headers = {k.lower(): v for k, v in (event.get('headers') or {}).items()}

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        vid = re.sub(r'[^a-zA-Z0-9-]', '', str(body.get('visitor_id', '')))[:64]
        if not vid:
            return resp(400, {'error': 'visitor_id required'})
        path = str(body.get('path', '/'))[:300] or '/'
        if path.startswith('/admin'):
            return resp(200, {'ok': True})
        ref = ref_host(str(body.get('referrer', '')))
        device = 'mobile' if body.get('mobile') else 'desktop'
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {schema}.visits (visitor_id, path, referrer, device) "
            f"VALUES ('{esc(vid)}', '{esc(path)}', '{esc(ref)}', '{device}')"
        )
        conn.commit()
        conn.close()
        return resp(200, {'ok': True})

    admin_password = os.environ.get('ADMIN_PASSWORD', '')
    if not admin_password or headers.get('x-admin-password', '') != admin_password:
        return resp(401, {'error': 'Нет доступа'})

    qs = event.get('queryStringParameters') or {}
    try:
        days = max(1, min(365, int(qs.get('days', 30))))
    except (TypeError, ValueError):
        days = 30

    tz = "(created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Moscow')"
    now_msk = "(NOW() AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Moscow')"
    period = f"{tz} >= date_trunc('day', {now_msk}) - INTERVAL '{days - 1} days'"

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    cur.execute(
        f"SELECT "
        f"COUNT(*) FILTER (WHERE {tz}::date = {now_msk}::date) AS today_views, "
        f"COUNT(DISTINCT visitor_id) FILTER (WHERE {tz}::date = {now_msk}::date) AS today_visitors, "
        f"COUNT(*) FILTER (WHERE {tz}::date = {now_msk}::date - 1) AS yesterday_views, "
        f"COUNT(DISTINCT visitor_id) FILTER (WHERE {tz}::date = {now_msk}::date - 1) AS yesterday_visitors, "
        f"COUNT(*) FILTER (WHERE {period}) AS period_views, "
        f"COUNT(DISTINCT visitor_id) FILTER (WHERE {period}) AS period_visitors, "
        f"COUNT(*) FILTER (WHERE {period} AND device = 'mobile') AS period_mobile "
        f"FROM {schema}.visits"
    )
    summary = cur.fetchone()

    cur.execute(
        f"SELECT {tz}::date AS day, COUNT(*) AS views, COUNT(DISTINCT visitor_id) AS visitors "
        f"FROM {schema}.visits WHERE {period} GROUP BY 1 ORDER BY 1"
    )
    daily = cur.fetchall()

    cur.execute(
        f"SELECT path, COUNT(*) AS views FROM {schema}.visits WHERE {period} "
        f"GROUP BY path ORDER BY views DESC LIMIT 10"
    )
    pages = cur.fetchall()

    cur.execute(
        f"SELECT COALESCE(NULLIF(referrer, ''), 'Прямые заходы') AS source, COUNT(DISTINCT visitor_id) AS visitors "
        f"FROM {schema}.visits WHERE {period} GROUP BY 1 ORDER BY visitors DESC LIMIT 10"
    )
    sources = cur.fetchall()
    conn.close()

    return resp(200, {'days': days, 'summary': summary, 'daily': daily, 'pages': pages, 'sources': sources})
