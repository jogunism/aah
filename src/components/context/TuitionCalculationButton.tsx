'use client';

import React, { useState } from 'react';
// i18n client
import { useClientTranslation } from '@/lib/useClientTranslation';

import TuitionCalculation from '@/components/modal/TuitionCalculation';

const TuitionCalculationButton: React.FC = () => {
  const { t, ready } = useClientTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  /*******************************************************
   * functions
   */
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /*******************************************************
   * render
   */
  if (!ready) {
    return null;
  }

  return (
    <>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded"
        onClick={openModal}
      >
        {t('TUITION_CALCULATOR')}
      </button>

      <TuitionCalculation isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default TuitionCalculationButton;
