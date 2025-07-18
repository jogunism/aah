import { getTranslation } from '@/lib/i18n.server';
import ParallaxImage from '@common/parallaxImage';
import TuitionCalcurationButton from './TuitionCalculationButton';

export default async function Price() {
  const { t } = await getTranslation();

  return (
    <div className="relative w-full bg-white mb-30">
      <ParallaxImage section="tuition" imagePath="/assets/image7.jpg" />

      <div className="relative z-10 bg-gradient-to-b from-[#f3e1eb] to-[#fff] w-full px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {t('TUITION_TITLE')}
          </h2>
          <div className="text-lg text-gray-800 ">
            {/* body */}
            <p className="mb-5 text-center">{t('TUITION_DESCRIPTION')}</p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Short-term box */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-xl font-extrabold mb-4 text-indigo-700 border-b-4 border-indigo-400 pb-1">
                    📘 {t('TUITION_SHORT_TERM_TITLE')}
                  </h4>
                  <p className="mb-4 text-base text-gray-700">
                    {t('TUITION_SHORT_TERM_DESCRIPTION')}
                  </p>
                  <p className="mb-2">
                    <span className="text-2xl font-bold text-gray-900">€1,600</span>
                    <span className="text-base text-gray-700 font-medium"> - €2,500</span>
                  </p>
                </div>
                <div className="mt-auto flex justify-end">
                  <p className="text-xs text-gray-500">{t('TUITION_COMMENT')}</p>
                </div>
              </div>

              {/* Long-term box */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-xl font-extrabold mb-4 text-indigo-700 border-b-4 border-indigo-400 pb-1">
                    📗 {t('TUITION_LONG_TERM_TITLE')}
                  </h4>
                  <p className="mb-4 text-base text-gray-700">
                    {t('TUITION_LONG_TERM_DESCRIPTION')}
                  </p>
                  <p className="mb-2">
                    <span className="text-2xl font-bold text-gray-900">€1,800</span>
                    <span className="text-base text-gray-700 font-medium"> - €2,800</span>
                  </p>
                </div>
                <div className="mt-auto flex justify-end">
                  <p className="text-xs text-gray-500">{t('TUITION_COMMENT')}</p>
                </div>
              </div>
            </div>

            {/* Included items */}
            <div className="mt-10">
              <h5 className="text-2xl font-semibold mb-3">{t('TUITION_WHATS_INCLUDE_TITLE')}</h5>
              <ul className="list-none space-y-2 text-base">
                <li>{t('TUITION_WHATS_INCLUDE_ELEMENT_1')}</li>
                <li>{t('TUITION_WHATS_INCLUDE_ELEMENT_2')}</li>
                <li>{t('TUITION_WHATS_INCLUDE_ELEMENT_3')}</li>
                <li>{t('TUITION_WHATS_INCLUDE_ELEMENT_4')}</li>
                <li>{t('TUITION_WHATS_INCLUDE_ELEMENT_5')}</li>
                <li>{t('TUITION_WHATS_INCLUDE_ELEMENT_6')}</li>
                <li>{t('TUITION_WHATS_INCLUDE_ELEMENT_7')}</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">{t('TUITION_WHATS_INCLUDE_COMMENT')}</p>
            </div>

            <TuitionCalcurationButton />

            {/* ./body */}
          </div>
        </div>
      </div>
    </div>
  );
}
