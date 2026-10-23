import { useEffect, useState } from 'react';
import func2url from '../../backend/func2url.json';
import { MAINTENANCE_MSG } from '@/lib/serverStatus';

export const REVIEWS_URL = (func2url as Record<string, string>).reviews;

export interface UserReview {
  id: number;
  name: string;
  rating: number;
  text: string;
  created_at: string;
}

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export function formatReviewDate(iso: string) {
  const d = new Date(iso.replace(' ', 'T'));
  if (isNaN(d.getTime())) return '';
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function useReviews() {
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(REVIEWS_URL)
      .then((r) => r.json())
      .then((d) => { if (alive) setReviews(Array.isArray(d.reviews) ? d.reviews : []); })
      .catch(() => {})
      .finally(() => { if (alive) setLoaded(true); });
    return () => { alive = false; };
  }, []);

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