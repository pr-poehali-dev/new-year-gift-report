import { createContext, useContext, useEffect, useState } from 'react';
import func2url from '../../backend/func2url.json';
import { MAINTENANCE_MSG } from '@/lib/serverStatus';

export const REVIEWS_URL = (func2url as Record<string, string>).reviews;

export interface UserReview {
  id: number;
  name: string;
  role?: string;
  rating: number;
  text: string;
  created_at: string;
}

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export function formatReviewDate(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})[ T]\d{2}:\d{2}(:\d{2})?(\.\d+)?$/.exec(iso);
  if (m) return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
  const d = new Date(iso.replace(' ', 'T'));
  if (isNaN(d.getTime())) return '';
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export const InitialReviewsContext = createContext<UserReview[] | null>(null);

export async function fetchReviews(): Promise<UserReview[] | null> {
  try {
    const r = await fetch(REVIEWS_URL);
    const d = await r.json();
    return Array.isArray(d.reviews) ? d.reviews : [];
  } catch {
    return null;
  }
}

export function useReviews() {
  const initial = useContext(InitialReviewsContext);
  const [reviews, setReviews] = useState<UserReview[]>(initial || []);
  const [loaded, setLoaded] = useState(!!initial);

  useEffect(() => {
    if (initial) return;
    let alive = true;
    fetch(REVIEWS_URL)
      .then((r) => r.json())
      .then((d) => { if (alive) setReviews(Array.isArray(d.reviews) ? d.reviews : []); })
      .catch(() => {})
      .finally(() => { if (alive) setLoaded(true); });
    return () => { alive = false; };
  }, [initial]);

  return { reviews, loaded };
}

export async function submitReview(data: { name: string; email: string; rating: number; text: string }) {
  let r: Response;
  try {
    r = await fetch(REVIEWS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error(MAINTENANCE_MSG);
  }
  if (r.status >= 500) throw new Error(MAINTENANCE_MSG);
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error || 'Не удалось отправить отзыв');
  return d;
}