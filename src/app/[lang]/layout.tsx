import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';
import { notFound } from 'next/navigation';
import ClientWrapper from '../layoutClientWrapper';
import GoogleAnalytics from '@/components/common/GoogleAnalytics';

import ToastProvider from '@common/ToastProvider';
import GDPRPopup from '@/components/common/GDPRPopup';
import MailingListModal from '@/components/common/MailingListModal';

import '../globals.css';

// 지원하는 언어 목록
const supportedLocales = ['en', 'de'] as const;
type Locale = (typeof supportedLocales)[number];

// 정적 경로 생성
export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({ lang }));
}

// i18n 서버 함수 - lang 파라미터 사용
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
  const lang = supportedLocales.includes(langParam as Locale) ? (langParam as Locale) : 'en';
  const { t } = await getTranslation(lang);

  return {
    title: t('METADATA_TITLE'),
    description: t('METADATA_DESCRIPTION'),
    keywords: 'study in Korea, Korean language, study abroad Korea, Korean university, Seoul study, Korea education, Korean course, visa support Korea, study visa Korea, Korean language school',
    authors: [{ name: 'aah! education' }],
    creator: 'aah! education',
    publisher: 'aah! education',
    robots: 'index, follow',
    alternates: {
      canonical: `https://aah.education/${lang}`,
      languages: {
        'en': 'https://aah.education/en',
        'de': 'https://aah.education/de',
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
      url: `https://aah.education/${lang}`,
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

  // 지원하지 않는 언어면 404
  if (!supportedLocales.includes(lang as Locale)) {
    notFound();
  }

  return (
    <html lang={lang}>
      <body>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
        )}
        <ClientWrapper lang={lang}>
          {children}
          {modal}
          <MailingListModal />
        </ClientWrapper>
        <ToastProvider />
        <GDPRPopup />
      </body>
    </html>
  );
}
