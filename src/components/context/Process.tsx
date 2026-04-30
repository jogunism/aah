import { getTranslation } from '@/lib/i18n.server';
import ParallaxImage from '@common/parallaxImage';

const STEPS = [1, 2, 3, 4, 5, 6] as const;

/**
 * Study abroad process — step-by-step journey from inquiry to arrival
 */
export default async function Process() {
  const { t } = await getTranslation();

  return (
    <div className="relative w-full bg-white mb-30">
      <ParallaxImage section="process" imagePath="/assets/image6.jpg" />

      <div className="relative z-10 bg-gradient-to-b from-[#f3e1eb] to-[#fff] w-full px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl font-bold text-gray-800 mb-4 text-center"
            dangerouslySetInnerHTML={{ __html: t('PROCESS_TITLE') }}
          />
          <div className="text-lg text-gray-800">
            {/* body */}
            <p className="mb-10 text-center">{t('PROCESS_DESCRIPTION')}</p>

            <div className="grid md:grid-cols-3 gap-6">
              {STEPS.map(n => (
                <div
                  key={n}
                  className="relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col"
                >
                  <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-aah-red text-white flex items-center justify-center font-bold text-lg shadow-md">
                    {n}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-3">
                    {t(`PROCESS_STEP_${n}_TITLE`)}
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {t(`PROCESS_STEP_${n}_DESC`)}
                  </p>
                </div>
              ))}
            </div>
            {/* ./body */}
          </div>
        </div>
      </div>
    </div>
  );
}
