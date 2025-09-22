import { Metadata } from 'next';
import { ReactNode } from 'react';
import { getTranslation } from '@/lib/i18n.server';
import ClientWrapper from './layoutClientWrapper';
import GoogleAnalytics from '@/components/common/GoogleAnalytics';

import ToastProvider from '@common/ToastProvider';
import GDPRPopup from '@/components/common/GDPRPopup';

import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const { t, lang } = await getTranslation();

  return {
    title: t('METADATA_TITLE'),
    description: t('METADATA_DESCRIPTION'),
    keywords: 'study in Korea, Korean language, study abroad Korea, Korean university, Seoul study, Korea education, Korean course, visa support Korea, study visa Korea, Korean language school',
    authors: [{ name: 'aah! education' }],
    creator: 'aah! education',
    publisher: 'aah! education',
    robots: 'index, follow',
    alternates: {
      canonical: 'https://aah.education',
      languages: {
        'en': 'https://aah.education',
        'de': 'https://aah.education',
      },
    },
    openGraph: {
      title: t('METADATA_TITLE'),
      description: t('METADATA_DESCRIPTION'),
      images: [
        {
          url: 'https://aah.education/assets/main.jpg',
          width: 800,
          height: 600,
          alt: 'Study in Korea with aah! education',
        },
      ],
      url: 'https://aah.education',
      siteName: 'aah! education',
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'de_DE',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('METADATA_TITLE'),
      description: t('METADATA_DESCRIPTION'),
      images: ['https://aah.education/assets/main.jpg'],
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { lang } = await getTranslation();

  return (
    <html lang={lang}>
      <body>
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics />}
        <ClientWrapper>{children}</ClientWrapper>
        <ToastProvider />
        <GDPRPopup />
      </body>
    </html>
  );
}
