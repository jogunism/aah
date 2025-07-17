import { getTranslation } from '@/lib/i18n.server';
import ParallaxImage from '@common/parallaxImage';

/**
 * Programs component
 */
export default async function Programes() {
  const { t } = await getTranslation();

  return (
    <div className="relative w-full bg-white mb-30">
      <ParallaxImage section="semesters" imagePath="/assets/image5.jpg" />

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
              {/* Short-Term Program */}
              <button className="flex-1 bg-red-700 hover:bg-red-800 shadow-lg text-gray-100 rounded-xl w-full p-6 flex flex-col items-start">
                <h1 className="font-semibold text-center w-full mt-3 mb-5 text-2xl">
                  {t('PROGRAMS_SHORT_BUTTON')}
                </h1>
                <p className="text-gray-100 text-base">{t('PROGRAMS_SHORT_DESCRIPTION')}</p>
              </button>

              {/* Long-Term Program */}
              <button className="flex-1 bg-blue-700 hover:bg-blue-800 shadow-lg text-gray-100 rounded-xl w-full p-6 flex flex-col items-start">
                <h1 className="font-semibold text-center w-full mt-3 mb-5 text-2xl">
                  {t('PROGRAMS_LONG_BUTTON')}
                </h1>
                <p className="text-gray-100 text-base">{t('PROGRAMS_LONG_DESCRIPTION')}</p>
              </button>
            </div>

            {/* ./body */}
          </div>
        </div>
      </div>
    </div>
  );
}
