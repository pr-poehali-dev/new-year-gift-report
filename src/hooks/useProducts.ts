import { createContext, useContext, useEffect, useState } from 'react';
import func2url from '../../backend/func2url.json';
import { products as fallbackProducts } from '@/data/products';
import { loadWithFallback } from '@/lib/resilientFetch';

export const PRODUCTS_URL = func2url.products;

export interface ApiProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  weight: string;
  image: string;
  images: string[];
  description: string;
  badge: string;
  sort_order: number;
  is_active: boolean;
  is_sold_out?: boolean;
}

export const InitialProductsContext = createContext<ApiProduct[] | null>(null);

export async function fetchProducts(): Promise<ApiProduct[] | null> {
  try {
    const d = await loadWithFallback<{ products?: ApiProduct[] }>(
      PRODUCTS_URL,
      'products',
      d => Array.isArray(d?.products) && d.products.length > 0,
    );
    return (d.products || []).map((p: ApiProduct) => ({
      ...p,
      images: Array.isArray(p.images) ? p.images : [],
    }));
  } catch {
    return null;
  }
}

export function useProducts(onlyActive = true) {
  const initial = useContext(InitialProductsContext);
  const [items, setItems] = useState<ApiProduct[]>(initial || []);
  const [loading, setLoading] = useState(!initial);

  const reload = () => {
    setLoading(true);
    loadWithFallback<{ products?: ApiProduct[] }>(
      PRODUCTS_URL,
      'products',
      d => Array.isArray(d?.products) && d.products.length > 0,
    )
      .then(d =>
        setItems(
          (d.products || []).map((p: ApiProduct) => ({
            ...p,
            images: Array.isArray(p.images) ? p.images : [],
          })),
        ),
      )
      .catch(() =>
        setItems(
          fallbackProducts.map((p, i) => ({
            ...p,
            badge: p.badge || '',
            images: [],
            sort_order: i,
            is_active: true,
          })) as ApiProduct[],
        ),
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (initial) return;
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { products: onlyActive ? items.filter(p => p.is_active) : items, loading, reload, setItems };
}