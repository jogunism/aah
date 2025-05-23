'use client';

import '@/lib/i18n.client'; // 클라이언트 i18n 초기화 — 여기 최상단에 추가
import { ReactNode } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import I18nProvider from './provider';

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <ParallaxProvider>{children}</ParallaxProvider>
    </I18nProvider>
  );
}
