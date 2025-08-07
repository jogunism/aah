import { Metadata } from 'next';
import { ReactNode } from 'react';
import { getTranslation } from '@/lib/i18n.server';
import ClientWrapper from './layoutClientWrapper';

import ToastProvider from '@common/ToastProvider';
import GDPRPopup from '@/components/common/GDPRPopup';

import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslation();

  return {
    title: t('METADATA_TITLE'),
    description: t('METADATA_DESCRIPTION'),
    openGraph: {
      title: t('METADATA_TITLE'),
      description: t('METADATA_DESCRIPTION'),
      images: [
        {
          url: 'https://aah.education/assets/image1.jpg',
          width: 800,
          height: 600,
          alt: 'aah! education',
        },
      ],
      url: 'https://aah.education',
      siteName: 'aah! education',
      type: 'website',
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { lang } = await getTranslation();

  return (
    <html lang={lang}>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
        <ToastProvider />
        <GDPRPopup />
      </body>
    </html>
  );
}
