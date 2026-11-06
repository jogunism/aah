import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import { notFound } from 'next/navigation';
import ClientWrapper from '../layoutClientWrapper';
import GoogleAnalytics from '@/components/common/GoogleAnalytics';

import ToastProvider from '@common/ToastProvider';
import GDPRPopup from '@/components/common/GDPRPopup';
import NavigationProgress from '@/components/common/NavigationProgress';
import AnalyticsTracker from '@/components/common/AnalyticsTracker';

const PRE_PAINT_SCRIPT = `try{var d=document.documentElement,m=document.cookie.match(/(?:^|; )currency=(USD|EUR|GBP)(?:;|$)/);if(m)d.dataset.cur=m[1];var q=new URLSearchParams(location.search);if(/\\/plan\\/?$/.test(location.pathname)&&(q.has('program')||q.has('school')))d.dataset.planQuery='1'}catch(e){}`;

import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_META,
  SITE_URL,
  OG_IMAGE,
  buildHreflangMap,
  isSupportedLocale,
  type Locale,
} from '@/lib/locales';
import { buildOrganizationSchema } from '@/lib/schema';

import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

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
    title: {
      default: t('METADATA_TITLE'),
      template: '%s | aah! education',
    },
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
      images: [OG_IMAGE],
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
      images: [OG_IMAGE.url],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
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
    <html lang={lang} className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Pages are cached for every visitor, so mark the visitor's currency and /plan query
            before first paint; globals.css hides prices / the plan builder until they match */}
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT_SCRIPT }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <Suspense fallback={null}>
            <GoogleAnalytics />
            <AnalyticsTracker />
          </Suspense>
        )}
        <NavigationProgress />
        <ClientWrapper lang={lang}>
          {children}
        </ClientWrapper>
        <ToastProvider />
        <GDPRPopup />
      </body>
    </html>
  );
}
