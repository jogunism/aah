import { ReactNode } from 'react';
import { getTranslation } from '@/lib/i18n.server';
import ClientWrapper from './layoutClientWrapper';

import ToastProvider from '@common/ToastProvider';

import './globals.css';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { lang } = await getTranslation();

  return (
    <html lang={lang}>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
        <ToastProvider />
      </body>
    </html>
  );
}
