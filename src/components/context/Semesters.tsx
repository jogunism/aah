import { getTranslation } from '@/lib/i18n.server';
import ParallaxImage from '@common/parallaxImage';

export default async function Semesters() {
  const { t } = await getTranslation();

  return (
    <div className="relative w-full bg-white mb-30">
      <ParallaxImage section="semesters" imagePath="/assets/image5.jpg" />

      <div className="relative z-10 bg-gradient-to-b from-[#f3e1eb] to-[#fff] w-full px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {t('SEMESTERS_TITLE')}
          </h2>
          <div className="text-lg text-gray-800 ">
            {/* body */}
            <h2 className="text-xl font-bold text-gray-800 mb-5 text-center">
              {t('SEMESTERS_SUB_TITLE')}
            </h2>
            <p className="mb-5 text-center">{t('SEMESTERS_DESCRIPTION')}</p>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Short-Term Program */}
              <div className="flex-1 bg-white shadow-lg rounded-xl p-6">
                <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded mb-4 w-full">
                  {t('SEMESTERS_SHORT_BUTTON')}
                </button>
                <p className="text-gray-700 text-base">{t('SEMESTERS_SHORT_DESCRIPTION')}</p>
              </div>

              {/* Long-Term Program */}
              <div className="flex-1 bg-white shadow-lg rounded-xl p-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mb-4 w-full">
                  {t('SEMESTERS_LONG_BUTTON')}
                </button>
                <p className="text-gray-700 text-base">{t('SEMESTERS_LONG_DESCRIPTION')}</p>
              </div>
            </div>

            {/* ./body */}
          </div>
        </div>
      </div>
    </div>
  );
}
