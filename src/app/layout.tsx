'use client';

import { ReactNode } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import I18nProvider from './provider';

import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <ParallaxProvider>{children}</ParallaxProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
