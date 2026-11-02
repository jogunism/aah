'use client';

import React, { useState } from 'react';
// i18n client
import { useClientTranslation } from '@/lib/useClientTranslation';
import { trackTuitionCalculationOpen, trackTuitionCalculationClose } from '@/lib/gtag';

import TuitionCalculation from '@/components/modal/TuitionCalculation';
import { buttonClass } from '@/components/ui/Button';

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
        className={buttonClass('blue')}
        onClick={openModal}
      >
        {t('TUITION_CALCULATOR')}
      </button>

      <TuitionCalculation isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default TuitionCalculationButton;
