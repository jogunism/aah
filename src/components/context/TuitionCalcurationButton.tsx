'use client';

import React, { useState } from 'react';
// i18n client
import '@/lib/i18n.client';
import { useTranslation } from 'react-i18next';

import Modal from '@/components/common/Modal';

const TuitionCalcurationButton: React.FC = () => {
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

      <Modal
        size={'lg'}
        isOpen={isModalOpen}
        onClose={closeModal}
        title={t('TUITION_CALCULATOR_MODAL_TITLE')}
      >
        <div className="p-6">
          <p>This is the content of the Tuition Calculator Modal.</p>
          <p>You can replace this with your actual calculator component.</p>
        </div>
      </Modal>
    </div>
  );
};

export default TuitionCalcurationButton;
