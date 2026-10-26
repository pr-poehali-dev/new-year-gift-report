import { toast as sonner } from 'sonner';
import func2url from '../../backend/func2url.json';

export const MAINTENANCE_MSG = 'Сервер на техническом обслуживании';
const MAINTENANCE_DESC = 'Пожалуйста, попробуйте чуть позже';
const WINDOW_MS = 5000;

let lastDownAt = 0;

export function isServerDown() {
  return Date.now() - lastDownAt < WINDOW_MS;
}

export function showMaintenance() {
  sonner.error(MAINTENANCE_MSG, { id: 'maintenance', description: MAINTENANCE_DESC });
}

const SILENT_URLS = [(func2url as Record<string, string>).stats].filter(Boolean);
const isApi = (url: string) =>
  url.includes('functions.poehali.dev') && !SILENT_URLS.some(u => url.startsWith(u));

export function installServerWatcher() {
  const w = window as Window & { __serverWatcher?: boolean };
  if (w.__serverWatcher) return;
  w.__serverWatcher = true;
  const original = window.fetch.bind(window);

  const originalError = sonner.error.bind(sonner);
  sonner.error = ((message: Parameters<typeof originalError>[0], data?: Parameters<typeof originalError>[1]) => {
    if (message !== MAINTENANCE_MSG && isServerDown()) {
      return originalError(MAINTENANCE_MSG, { id: 'maintenance', description: MAINTENANCE_DESC });
    }
    return originalError(message, data);
  }) as typeof sonner.error;

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    const method = (init?.method || (input instanceof Request ? input.method : 'GET')).toUpperCase();
    if (!isApi(url)) return original(input, init);

    const notify = () => {
      lastDownAt = Date.now();
      if (method !== 'GET') showMaintenance();
    };

    try {
      const res = await original(input, init);
      if (res.status >= 500) notify();
      return res;
    } catch (e) {
      if (!(e instanceof DOMException && e.name === 'AbortError')) notify();
      throw e;
    }
  };
}