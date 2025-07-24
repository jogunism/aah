'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { i18nPromise } from './i18n.client';

export const useClientTranslation = () => {
  const [ready, setReady] = useState(false);
  const translation = useTranslation();

  useEffect(() => {
    i18nPromise.then(() => {
      setReady(true);
    });
  }, []);

  return { ...translation, ready };
};
