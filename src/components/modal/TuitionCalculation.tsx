'use client';

import React from 'react';
// i18n client
import { useTranslation } from 'react-i18next';

import Modal from '@/components/common/Modal';

interface TuitionCalculationProps {
  isOpen: boolean;
  onClose: () => void;
}

const TuitionCalculation: React.FC<TuitionCalculationProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal
      size={'lg'}
      isOpen={isOpen}
      onClose={onClose}
      title={t('TUITION_CALCULATOR_MODAL_TITLE')}
      isScrollAllowed={false}
    >
      <div className="p-6">
        <p>This is the content of the Tuition Calculator Modal.</p>
        <p>You can replace this with your actual calculator component.</p>
      </div>
    </Modal>
  );
};

export default TuitionCalculation;
