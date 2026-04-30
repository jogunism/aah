import Link from 'next/link';
import ProgramContentLong from '@/components/programs/ProgramContentLong';
import { getTranslation } from '@/lib/i18n.server';
import { Metadata } from 'next';
import {
  SITE_URL,
  LOCALE_META,
  SUPPORTED_LOCALES,
  buildHreflangMap,
  isSupportedLocale,
  DEFAULT_LOCALE,
} from '@/lib/locales';
import { buildCourseSchema, buildBreadcrumbSchema } from '@/lib/schema';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = isSupportedLocale(langParam) ? langParam : DEFAULT_LOCALE;
  const { t } = await getTranslation(lang);
  const path = '/programs/long';

  return {
    title: t('PROGRAM_MODAL_LONG_TERM'),
    description: t('PROGRAM_MODAL_LONG_TERM_TITLE'),
    alternates: {
      canonical: `${SITE_URL}/${lang}${path}`,
      languages: buildHreflangMap(path),
    },
    openGraph: {
      title: t('PROGRAM_MODAL_LONG_TERM'),
      description: t('PROGRAM_MODAL_LONG_TERM_TITLE'),
      url: `${SITE_URL}/${lang}${path}`,
      siteName: 'aah! education',
      type: 'article',
      locale: LOCALE_META[lang].ogLocale,
      alternateLocale: SUPPORTED_LOCALES
        .filter((l) => l !== lang)
        .map((l) => LOCALE_META[l].ogLocale),
    },
  };
}

export default async function LongProgramPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = isSupportedLocale(langParam) ? langParam : DEFAULT_LOCALE;
  const { t } = await getTranslation(lang);

  const courseSchema = buildCourseSchema({
    lang,
    path: '/programs/long',
    name: t('PROGRAM_MODAL_LONG_TERM'),
    description: t('PROGRAM_MODAL_LONG_TERM_TITLE'),
    durationISO: 'P3M',
  });

  const breadcrumbSchema = buildBreadcrumbSchema(lang, [
    { name: 'Home', path: '' },
    { name: t('PROGRAM_MODAL_LONG_TERM'), path: '/programs/long' },
  ]);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-5xl mx-auto">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4 px-2"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('BACK_TO_MAIN') || 'Back to Main'}
        </Link>
        <div className="bg-white rounded-lg shadow-lg">
          <h1 className="text-xl font-bold text-gray-700 py-6 px-6 border-b">
            {t('PROGRAM_MODAL_LONG_TERM')}
          </h1>
          <div className="p-6">
            <ProgramContentLong lang={lang} />
          </div>
        </div>
      </div>
    </main>
  );
}
