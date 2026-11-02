import ProgramContentShort from '@/components/programs/ProgramContentShort';
import ProgramPage from '@/components/programs/ProgramPage';
import { getTranslation } from '@/lib/i18n.server';
import { Metadata } from 'next';
import {
  SITE_URL,
  OG_IMAGE,
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
  const path = '/programs/short';

  return {
    title: t('PROGRAM_MODAL_SHORT_TERM'),
    description: t('PROGRAM_MODAL_SHORT_TERM_TITLE'),
    alternates: {
      canonical: `${SITE_URL}/${lang}${path}`,
      languages: buildHreflangMap(path),
    },
    openGraph: {
      title: t('PROGRAM_MODAL_SHORT_TERM'),
      description: t('PROGRAM_MODAL_SHORT_TERM_TITLE'),
      url: `${SITE_URL}/${lang}${path}`,
      siteName: 'aah! education',
      type: 'article',
      images: [OG_IMAGE],
      locale: LOCALE_META[lang].ogLocale,
      alternateLocale: SUPPORTED_LOCALES
        .filter((l) => l !== lang)
        .map((l) => LOCALE_META[l].ogLocale),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('PROGRAM_MODAL_SHORT_TERM'),
      description: t('PROGRAM_MODAL_SHORT_TERM_TITLE'),
      images: [OG_IMAGE.url],
    },
  };
}

export default async function ShortProgramPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = isSupportedLocale(langParam) ? langParam : DEFAULT_LOCALE;
  const { t } = await getTranslation(lang);

  const courseSchema = buildCourseSchema({
    lang,
    path: '/programs/short',
    name: t('PROGRAM_MODAL_SHORT_TERM'),
    description: t('PROGRAM_MODAL_SHORT_TERM_TITLE'),
    durationISO: 'P3W',
  });

  const breadcrumbSchema = buildBreadcrumbSchema(lang, [
    { name: 'Home', path: '' },
    { name: t('PROGRAM_MODAL_SHORT_TERM'), path: '/programs/short' },
  ]);

  return (
    <ProgramPage lang={lang} program="short">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProgramContentShort lang={lang} />
    </ProgramPage>
  );
}
