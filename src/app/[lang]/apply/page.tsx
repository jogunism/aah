// 공식 신청서 페이지(/apply). 사이트에서 링크하지 않고 주소로만 들어오므로 검색에서 제외
import { Metadata } from 'next';
import Header from '@/components/context/Header';
import Footer from '@/components/context/Footer';
import ApplyForm from '@/components/portal/ApplyForm';
import { getTranslation } from '@/lib/i18n.server';
import { getApplySchools } from '@/lib/applySchools.server';
import { isSupportedLocale, DEFAULT_LOCALE } from '@/lib/locales';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = isSupportedLocale(langParam) ? langParam : DEFAULT_LOCALE;
  const { t } = await getTranslation(lang);
  return { title: t('APPLY_META_TITLE'), robots: { index: false, follow: false } };
}

export default async function ApplyPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = isSupportedLocale(langParam) ? langParam : DEFAULT_LOCALE;
  const schools = await getApplySchools(lang);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header lang={lang} />
      <div className="h-[60px]" />
      <main className="flex-grow px-5 md:px-6 pt-10 md:pt-14 pb-16 md:pb-24">
        <ApplyForm lang={lang} schools={schools} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
