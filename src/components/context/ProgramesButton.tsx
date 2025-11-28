'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClientTranslation } from '@/lib/useClientTranslation';
import { trackProgramDetailsOpen } from '@/lib/gtag';
// type
import { ProgramType } from '@/types/constants';

interface ProgramesButtonProps {
  programType: ProgramType;
}

export default function ProgramesButton({ programType }: ProgramesButtonProps) {
  const { t, ready } = useClientTranslation();
  const pathname = usePathname();

  // 현재 언어 추출 (예: /en → en, /de → de)
  const lang = pathname.split('/')[1] || 'en';

  const handleClick = () => {
    const programName = programType === ProgramType.SHORT ? 'short-term' : 'long-term';
    const detailsType = programType === ProgramType.SHORT ? 'short' : 'long';
    trackProgramDetailsOpen(programName, detailsType);
  };

  const colorClass =
    programType === ProgramType.SHORT
      ? 'bg-aah-red hover:bg-aah-red'
      : 'bg-aah-blue hover:bg-aah-blue';
  const titleKey =
    programType === ProgramType.SHORT ? 'PROGRAMS_SHORT_BUTTON' : 'PROGRAMS_LONG_BUTTON';
  const descriptionKey =
    programType === ProgramType.SHORT ? 'PROGRAMS_SHORT_DESCRIPTION' : 'PROGRAMS_LONG_DESCRIPTION';

  // URL path (short-term → short, long-term → long)
  const programPath = programType === ProgramType.SHORT ? 'short' : 'long';

  if (!ready) {
    return null;
  }

  return (
    <Link
      href={`/${lang}/programs/${programPath}`}
      onClick={handleClick}
      scroll={false}
      className={`flex-1 shadow-lg text-gray-100 rounded-xl w-full p-6 flex flex-col items-start ${colorClass}`}
    >
      <h1 className="font-semibold text-center w-full mt-3 mb-5 text-2xl">{t(titleKey)}</h1>
      <p className="text-gray-100 text-base h-30 md:min-h-24">{t(descriptionKey)}</p>
    </Link>
  );
}
