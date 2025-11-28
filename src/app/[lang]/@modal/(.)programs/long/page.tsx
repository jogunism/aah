import ProgramContentLong from '@/components/programs/ProgramContentLong';
import InterceptedModal from '@/components/common/InterceptedModal';

export default function LongProgramModal() {
  return (
    <InterceptedModal titleKey="PROGRAM_MODAL_LONG_TERM">
      <div className="p-6">
        <ProgramContentLong />
      </div>
    </InterceptedModal>
  );
}
