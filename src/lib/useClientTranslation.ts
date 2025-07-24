'use client';

import { useState, useEffect } from 'react';
import { useTranslation, UseTranslationOptions } from 'react-i18next';
import { i18nPromise } from './i18n.client';

export const useClientTranslation = (options?: UseTranslationOptions<any>) => {
  const [ready, setReady] = useState(false);
  const translation = useTranslation(undefined, options);

  useEffect(() => {
    i18nPromise.then(() => {
      setReady(true);
    });
  }, []);

  return { ...translation, ready };
};
