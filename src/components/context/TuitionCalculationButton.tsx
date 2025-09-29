'use client';

import React, { useState } from 'react';
// i18n client
import { useClientTranslation } from '@/lib/useClientTranslation';
import { trackTuitionCalculationOpen, trackTuitionCalculationClose } from '@/lib/gtag';

import TuitionCalculation from '@/components/modal/TuitionCalculation';

const TuitionCalculationButton: React.FC = () => {
  const { t, ready } = useClientTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  /*******************************************************
   * functions
   */
  const openModal = () => {
    setIsModalOpen(true);
    trackTuitionCalculationOpen('tuition_button');
  };
  const closeModal = () => {
    setIsModalOpen(false);
    trackTuitionCalculationClose('close_button');
  };

  /*******************************************************
   * render
   */
  if (!ready) {
    return null;
  }

  return (
    <>
      <button
        className="bg-aah-blue hover:bg-aah-blue text-white font-semibold py-3 px-5 rounded"
        onClick={openModal}
      >
        {t('TUITION_CALCULATOR')}
      </button>

      <TuitionCalculation isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default TuitionCalculationButton;
