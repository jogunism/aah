import { ReactNode } from 'react';
import initI18n from '@/lib/i18n.server';
import ClientWrapper from './layoutClientWrapper';

import './globals.css';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const i18n = await initI18n(); // 서버 i18n 초기화
  const lang = i18n.language || 'en';

  return (
    <html lang={lang}>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
