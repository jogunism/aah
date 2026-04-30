import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';
import { notFound } from 'next/navigation';
import ClientWrapper from '../layoutClientWrapper';
import GoogleAnalytics from '@/components/common/GoogleAnalytics';

import ToastProvider from '@common/ToastProvider';
import GDPRPopup from '@/components/common/GDPRPopup';

import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_META,
  SITE_URL,
  buildHreflangMap,
  isSupportedLocale,
  type Locale,
} from '@/lib/locales';
import { buildOrganizationSchema } from '@/lib/schema';

import '../globals.css';

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

async function getTranslation(lang: Locale) {
  const { createI18nInstance } = await import('@/lib/i18n.server');
  const i18n = await createI18nInstance(lang);
  return {
    t: i18n.t.bind(i18n),
    lang,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang: Locale = isSupportedLocale(langParam) ? langParam : DEFAULT_LOCALE;
  const { t } = await getTranslation(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: t('METADATA_TITLE'),
    description: t('METADATA_DESCRIPTION'),
    keywords: 'study in Korea, Korean language, study abroad Korea, Korean university, Seoul study, Korea education, Korean course, visa support Korea, study visa Korea, Korean language school',
    authors: [{ name: 'aah! education' }],
    creator: 'aah! education',
    publisher: 'aah! education',
    robots: 'index, follow',
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: buildHreflangMap(),
    },
    openGraph: {
      title: t('METADATA_TITLE'),
      description: t('METADATA_DESCRIPTION'),
      images: [
        {
          url: `${SITE_URL}/assets/main.jpg`,
          width: 800,
          height: 600,
          alt: 'Study in Korea with aah! education',
        },
      ],
      url: `${SITE_URL}/${lang}`,
      siteName: 'aah! education',
      type: 'website',
      locale: LOCALE_META[lang].ogLocale,
      alternateLocale: SUPPORTED_LOCALES
        .filter((l) => l !== lang)
        .map((l) => LOCALE_META[l].ogLocale),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('METADATA_TITLE'),
      description: t('METADATA_DESCRIPTION'),
      images: [`${SITE_URL}/assets/main.jpg`],
    },
  };
}

export default async function LangLayout({
  children,
  modal,
  params,
}: {
  children: ReactNode;
  modal: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSupportedLocale(lang)) {
    notFound();
  }

  const { t } = await getTranslation(lang);

  const jsonLd = buildOrganizationSchema({
    description: t('METADATA_DESCRIPTION'),
    slogan: t('MAIN_SLOGAN'),
  });

  return (
    <html lang={lang}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
        )}
        <ClientWrapper lang={lang}>
          {children}
          {modal}
        </ClientWrapper>
        <ToastProvider />
        <GDPRPopup />
      </body>
    </html>
  );
}
