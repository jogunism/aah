'use client';

import { I18nextProvider } from 'react-i18next';
import { ReactNode, useEffect } from 'react';
import i18n from './i18n';

export default function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
