import { useEffect, useState } from 'react';
import func2url from '../../backend/func2url.json';
import { products as fallbackProducts } from '@/data/products';

export const PRODUCTS_URL = func2url.products;

export interface ApiProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  weight: string;
  image: string;
  description: string;
  badge: string;
  sort_order: number;
  is_active: boolean;
}

export function useProducts(onlyActive = true) {
  const [items, setItems] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = () => {
    setLoading(true);
    fetch(PRODUCTS_URL)
      .then(r => r.json())
      .then(d => setItems(d.products || []))
      .catch(() =>
        setItems(
          fallbackProducts.map((p, i) => ({
            ...p,
            badge: p.badge || '',
            sort_order: i,
            is_active: true,
          })) as ApiProduct[],
        ),
      )
      .finally(() => setLoading(false));
  };

  useEffect(reload, []);

  return { products: onlyActive ? items.filter(p => p.is_active) : items, loading, reload, setItems };
}
