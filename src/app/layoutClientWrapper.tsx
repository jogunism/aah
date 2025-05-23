'use client';

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
