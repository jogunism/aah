"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';

const ProgramDetailsLong: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <p className="text-gray-800">{t('PROGRAM_LONG_TERM_CONTENT')}</p>
    </div>
  );
};

export default ProgramDetailsLong;