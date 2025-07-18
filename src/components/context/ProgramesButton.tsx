'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// UI Components
import ProgramDetails from '@/components/modal/ProgramDetails';
// type
import { ProgramType } from '@/types/constants';

interface ProgramesButtonProps {
  programType: ProgramType;
}

export default function ProgramesButton({ programType }: ProgramesButtonProps) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProgramType, setCurrentProgramType] = useState<ProgramType | null>(null);

  const openModal = (type: ProgramType) => {
    setCurrentProgramType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProgramType(null);
  };

  const baseButtonClass =
    'flex-1 shadow-lg text-gray-100 rounded-xl w-full p-6 flex flex-col items-start';
  const colorClass =
    programType === ProgramType.SHORT
      ? 'bg-[#D8484D] hover:bg-[#C03F44]'
      : 'bg-[#3A6EA5] hover:bg-[#2A5E95]';
  const buttonClass = `${baseButtonClass} ${colorClass}`;

  const titleKey =
    programType === ProgramType.SHORT ? 'PROGRAMS_SHORT_BUTTON' : 'PROGRAMS_LONG_BUTTON';
  const descriptionKey =
    programType === ProgramType.SHORT ? 'PROGRAMS_SHORT_DESCRIPTION' : 'PROGRAMS_LONG_DESCRIPTION';

  return (
    <>
      <button onClick={() => openModal(programType)} className={buttonClass}>
        <h1 className="font-semibold text-center w-full mt-3 mb-5 text-2xl">{t(titleKey)}</h1>
        <p className="text-gray-100 text-base">{t(descriptionKey)}</p>
      </button>

      <ProgramDetails isOpen={isModalOpen} onClose={closeModal} programType={currentProgramType} />
    </>
  );
}
