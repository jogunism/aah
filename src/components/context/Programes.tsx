import React from 'react';
import { getTranslation } from '@/lib/i18n.server';
// UI Component
import ParallaxImage from '@common/parallaxImage';
import ProgramesButton from './ProgramesButton';
// type
import { ProgramType } from '@/types/constants';

/**
 * Programs component (Server Component)
 */
export default async function Programes() {
  const { t } = await getTranslation();

  return (
    <div className="relative w-full bg-white mb-30">
      <ParallaxImage section="semesters" imagePath="/assets/image3.jpg" />

      <div className="relative z-10 bg-gradient-to-b from-[#f3e1eb] to-[#fff] w-full px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {t('PROGRAMS_TITLE')}
          </h2>
          <div className="text-lg text-gray-800 ">
            {/* body */}

            <h2 className="text-xl font-bold text-gray-800 mb-5 text-center">
              {t('PROGRAMS_SUB_TITLE')}
            </h2>
            <p className="mb-10 text-center">{t('PROGRAMS_DESCRIPTION')}</p>

            <div className="flex flex-col md:flex-row gap-6">
              <ProgramesButton programType={ProgramType.SHORT} />
              <ProgramesButton programType={ProgramType.LONG} />
            </div>

            {/* ./body */}
          </div>
        </div>
      </div>
    </div>
  );
}
