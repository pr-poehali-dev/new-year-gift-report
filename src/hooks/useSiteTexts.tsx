import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import func2url from '../../backend/func2url.json';

export interface TextField {
  key: string;
  section: string;
  title: string;
  value: string;
  multiline: boolean;
  order: number;
}

export const TEXTS_URL = func2url.texts;

type Values = Record<string, string>;

const SiteTextsContext = createContext<Values>({});

export function SiteTextsProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<Values>({});

  useEffect(() => {
    fetch(TEXTS_URL)
      .then(r => r.json())
      .then(d => setValues(d.values || {}))
      .catch(() => setValues({}));
  }, []);

  return <SiteTextsContext.Provider value={values}>{children}</SiteTextsContext.Provider>;
}

export function useText() {
  const values = useContext(SiteTextsContext);
  return (key: string, fallback: string) => values[key] ?? fallback;
}
