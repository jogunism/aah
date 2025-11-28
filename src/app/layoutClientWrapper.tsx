'use client';

import '@/lib/i18n.client'; // 클라이언트 i18n 초기화 — 여기 최상단에 추가
import { ReactNode, useEffect, useLayoutEffect } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import I18nProvider from './provider';
import i18n from '@/lib/i18n.client';

interface ClientWrapperProps {
  children: ReactNode;
  lang: string;
}

// 서버에서는 useEffect, 클라이언트에서는 useLayoutEffect 사용
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function ClientWrapper({ children, lang }: ClientWrapperProps) {
  // 렌더링 전에 언어 동기화 (hydration mismatch 방지)
  if (typeof window !== 'undefined' && i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  // URL의 lang과 i18n 언어 동기화 (이후 변경 시)
  useIsomorphicLayoutEffect(() => {
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
