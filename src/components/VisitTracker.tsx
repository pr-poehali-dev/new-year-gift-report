import { useEffect } from 'react';
import { useLocation } from "@/lib/router-compat";
import func2url from '../../backend/func2url.json';

const STATS_URL = (func2url as Record<string, string>).stats;

function getVisitorId() {
  const key = 'visitor_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(key, id);
  }
  return id;
}

export default function VisitTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!STATS_URL || pathname.startsWith('/admin')) return;
    const key = `visit:${pathname}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
    try {
      const external = document.referrer && !document.referrer.startsWith(window.location.origin);
      fetch(STATS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitor_id: getVisitorId(),
          path: pathname,
          referrer: external ? document.referrer : '',
          mobile: window.matchMedia('(max-width: 768px)').matches,
        }),
        keepalive: true,
      }).catch(() => undefined);
    } catch {
      /* статистика не должна ломать сайт */
    }
  }, [pathname]);

  return null;
}
