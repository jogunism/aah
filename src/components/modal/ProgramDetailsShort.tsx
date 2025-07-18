"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';

const ProgramDetailsShort: React.FC = () => {
  const { t } = useTranslation();

  return <p className="text-gray-800">{t('PROGRAM_SHORT_TERM_CONTENT')}</p>;
};

export default ProgramDetailsShort;
