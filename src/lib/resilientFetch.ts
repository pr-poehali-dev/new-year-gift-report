const SNAPSHOT_BASE = 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/bucket/snapshot';

async function getJson(url: string, timeoutMs: number, noCache = false) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const finalUrl = noCache ? `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}` : url;
    const res = await fetch(finalUrl, { signal: ctrl.signal });
    if (!res.ok) throw new Error(String(res.status));
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

export async function loadWithFallback<T>(
  apiUrl: string,
  name: 'products' | 'texts',
  isValid: (d: T) => boolean,
): Promise<T> {
  const sources: (() => Promise<T>)[] = [
    () => getJson(apiUrl, 7000),
    () => getJson(`${SNAPSHOT_BASE}/${name}.json`, 6000, true),
    () => getJson(`/data/${name}.json`, 6000),
  ];
  for (const load of sources) {
    try {
      const data = await load();
      if (isValid(data)) return data;
    } catch {
      /* пробуем следующий источник */
    }
  }
  throw new Error('no data');
}
