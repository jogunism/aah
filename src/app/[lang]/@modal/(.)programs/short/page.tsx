import ProgramContentShort from '@/components/programs/ProgramContentShort';
import InterceptedModal from '@/components/common/InterceptedModal';
import { getTranslation } from '@/lib/i18n.server';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function ShortProgramModal({ params }: PageProps) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);

  return (
    <InterceptedModal title={t('PROGRAM_MODAL_SHORT_TERM')}>
      <div className="p-6">
        <ProgramContentShort lang={lang} />
      </div>
    </InterceptedModal>
  );
}
