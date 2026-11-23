// 개인정보·보안 정책 페이지(/privacy), 5개 언어
import { Metadata } from 'next';
import Header from '@/components/context/Header';
import Footer from '@/components/context/Footer';
import LegalPage from '@/components/legal/LegalPage';
import { privacyDocs } from '@/content/legal/privacy';
import { SITE_URL, buildHreflangMap, isSupportedLocale, DEFAULT_LOCALE } from '@/lib/locales';

const PATH = '/privacy';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: langParam } = await params;
  const doc = privacyDocs[isSupportedLocale(langParam) ? langParam : DEFAULT_LOCALE];
  return {
    title: doc.metaTitle,
    description: doc.metaDescription,
    alternates: { canonical: `${SITE_URL}/${langParam}${PATH}`, languages: buildHreflangMap(PATH) },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = isSupportedLocale(langParam) ? langParam : DEFAULT_LOCALE;
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header lang={lang} />
      <div className="h-[60px]" />
      <main className="flex-grow">
        <LegalPage doc={privacyDocs[lang]} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
