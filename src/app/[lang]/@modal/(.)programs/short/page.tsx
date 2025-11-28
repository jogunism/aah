import ProgramContentShort from '@/components/programs/ProgramContentShort';
import InterceptedModal from '@/components/common/InterceptedModal';

export default function ShortProgramModal() {
  return (
    <InterceptedModal titleKey="PROGRAM_MODAL_SHORT_TERM">
      <div className="p-6">
        <ProgramContentShort />
      </div>
    </InterceptedModal>
  );
}
