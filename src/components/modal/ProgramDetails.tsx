'use client';

import React from 'react';

import '@/lib/i18n.client';
import { useTranslation } from 'react-i18next';

import Modal from '@/components/common/Modal';
import ProgramDetailsShort from '@/components/modal/ProgramDetailsShort';
import ProgramDetailsLong from '@/components/modal/ProgramDetailsLong';

import { ProgramType } from '@/types/constants';

interface ProgramDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  programType: ProgramType | null;
}

const ProgramDetails: React.FC<ProgramDetailsProps> = ({ isOpen, onClose, programType }) => {
  const { t } = useTranslation();

  const title =
    programType === ProgramType.SHORT
      ? t('PROGRAM_MODAL_SHORT_TERM_TITLE')
      : t('PROGRAM_MODAL_LONG_TERM_TITLE');

  return (
    <Modal size={'lg'} isOpen={isOpen} onClose={onClose} title={title}>
      <div className="p-6">
        {programType === ProgramType.SHORT && <ProgramDetailsShort />}
        {programType === ProgramType.LONG && <ProgramDetailsLong />}
      </div>
    </Modal>
  );
};

export default ProgramDetails;
