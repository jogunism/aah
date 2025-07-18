'use client';

import React, { useState } from 'react';
// i18n client
import '@/lib/i18n.client';
import { useTranslation } from 'react-i18next';

import TuitionCalculation from '@/components/modal/TuitionCalculation';

const TuitionCalculationButton: React.FC = () => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  /*******************************************************
   * functions
   */
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /*******************************************************
   * render
   */
  return (
    <div className="mt-10 text-center">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded"
        onClick={openModal}
      >
        {t('TUITION_CALCULATOR')}
      </button>

      <TuitionCalculation isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default TuitionCalculationButton;
