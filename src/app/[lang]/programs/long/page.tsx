import Link from 'next/link';
import ProgramContentLong from '@/components/programs/ProgramContentLong';
import { getTranslation } from '@/lib/i18n.server';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const { t } = await getTranslation(lang);

  return {
    title: t('PROGRAM_MODAL_LONG_TERM'),
    description: t('PROGRAM_MODAL_LONG_TERM_TITLE'),
  };
}

export default async function LongProgramPage({ params }: PageProps) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
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
