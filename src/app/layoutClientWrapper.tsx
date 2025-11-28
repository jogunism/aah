'use client';

import '@/lib/i18n.client'; // 클라이언트 i18n 초기화 — 여기 최상단에 추가
import { ReactNode, useEffect } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import I18nProvider from './provider';
import i18n from '@/lib/i18n.client';

interface ClientWrapperProps {
  children: ReactNode;
  lang: string;
}

export default function ClientWrapper({ children, lang }: ClientWrapperProps) {
  // URL의 lang과 i18n 언어 동기화
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <I18nProvider>
      <ParallaxProvider>{children}</ParallaxProvider>
    </I18nProvider>
  );
}
