import ProgramContentLong from '@/components/programs/ProgramContentLong';
import InterceptedModal from '@/components/common/InterceptedModal';
import { getTranslation } from '@/lib/i18n.server';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function LongProgramModal({ params }: PageProps) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);

  return (
    <InterceptedModal title={t('PROGRAM_MODAL_LONG_TERM')}>
      <div className="p-6">
        <ProgramContentLong lang={lang} />
      </div>
    </InterceptedModal>
  );
}
