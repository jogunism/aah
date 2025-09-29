'use client';

import React, { useState } from 'react';
import { useClientTranslation } from '@/lib/useClientTranslation';
import { trackProgramDetailsOpen } from '@/lib/gtag';
// UI Components
import ProgramDetails from '@/components/modal/ProgramDetails';
// type
import { ProgramType } from '@/types/constants';

interface ProgramesButtonProps {
  programType: ProgramType;
}

export default function ProgramesButton({ programType }: ProgramesButtonProps) {
  const { t, ready } = useClientTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProgramType, setCurrentProgramType] = useState<ProgramType | null>(null);

  const openModal = (type: ProgramType) => {
    setCurrentProgramType(type);
    setIsModalOpen(true);

    const programName = type === ProgramType.SHORT ? 'short-term' : 'long-term';
    const detailsType = type === ProgramType.SHORT ? 'short' : 'long';

    trackProgramDetailsOpen(programName, detailsType);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProgramType(null);
  };

  const colorClass =
    programType === ProgramType.SHORT
      ? 'bg-aah-red hover:bg-aah-red'
      : 'bg-aah-blue hover:bg-aah-blue';
  const titleKey =
    programType === ProgramType.SHORT ? 'PROGRAMS_SHORT_BUTTON' : 'PROGRAMS_LONG_BUTTON';
  const descriptionKey =
    programType === ProgramType.SHORT ? 'PROGRAMS_SHORT_DESCRIPTION' : 'PROGRAMS_LONG_DESCRIPTION';

  if (!ready) {
    return null;
  }

  return (
    <>
      <button
        className={`flex-1 shadow-lg text-gray-100 rounded-xl w-full p-6 flex flex-col items-start ${colorClass}`}
        onClick={() => openModal(programType)}
      >
        <h1 className="font-semibold text-center w-full mt-3 mb-5 text-2xl">{t(titleKey)}</h1>
        <p className="text-gray-100 text-base h-30 md:min-h-24">{t(descriptionKey)}</p>
      </button>

      <ProgramDetails //
        isOpen={isModalOpen}
        onClose={closeModal}
        programType={currentProgramType}
      />
    </>
  );
}
