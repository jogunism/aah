// 이용약관·취소 정책 페이지(/terms), 5개 언어
import { Metadata } from 'next';
import Header from '@/components/context/Header';
import Footer from '@/components/context/Footer';
import LegalPage from '@/components/legal/LegalPage';
import { termsDocs } from '@/content/legal/terms';
import { SITE_URL, buildHreflangMap, isSupportedLocale, DEFAULT_LOCALE } from '@/lib/locales';
import { getServerCurrency } from '@/lib/currency.server';
import { getEurRates } from '@/api/server';

export const revalidate = 3600; // refund amounts follow exchange rates, like the tuition prices

const PATH = '/terms';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: langParam } = await params;
  const doc = termsDocs[isSupportedLocale(langParam) ? langParam : DEFAULT_LOCALE];
  return {
    title: doc.metaTitle,
    description: doc.metaDescription,
    alternates: { canonical: `${SITE_URL}/${langParam}${PATH}`, languages: buildHreflangMap(PATH) },
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = isSupportedLocale(langParam) ? langParam : DEFAULT_LOCALE;
  const money = { lang, rates: await getEurRates(), currency: await getServerCurrency(lang) };
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header lang={lang} />
      <div className="h-[60px]" />
      <main className="flex-grow">
        <LegalPage doc={termsDocs[lang]} money={money} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
