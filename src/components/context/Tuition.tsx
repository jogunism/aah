import { getTranslation } from '@/lib/i18n.server';
import ParallaxImage from '@common/parallaxImage';

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
            <div className="grid md:grid-cols-2 gap-6">
              {/* Short-term box */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-xl font-extrabold mb-4 text-indigo-700 border-b-4 border-indigo-400 pb-1">
                    📘 Short-term Program (3 weeks)
                  </h4>
                  <p className="mb-4 text-base text-gray-700">
                    A short but intensive experience that fits well into your vacation. Great for
                    those who want to explore studying abroad before committing longer.
                  </p>
                  <p className="mb-2">
                    <span className="text-2xl font-bold text-gray-900">€1,600</span>
                    <span className="text-base text-gray-700 font-medium"> – €2,500</span>
                  </p>
                </div>
                <div className="mt-auto flex justify-end">
                  <p className="text-sm text-gray-500">Includes VAT / Flight not included</p>
                </div>
              </div>

              {/* Long-term box */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-xl font-extrabold mb-4 text-indigo-700 border-b-4 border-indigo-400 pb-1">
                    📗 Long-term Program (1 semester)
                  </h4>
                  <p className="mb-4 text-base text-gray-700">
                    A full-semester academic experience with deeper immersion. Ideal for those
                    pursuing credits or long-term cultural integration.
                  </p>
                  <p className="mb-2">
                    <span className="text-2xl font-bold text-gray-900">€1,800</span>
                    <span className="text-base text-gray-700 font-medium"> – €2,800</span>
                  </p>
                </div>
                <div className="mt-auto flex justify-end">
                  <p className="text-sm text-gray-500">Includes VAT / Flight not included</p>
                </div>
              </div>
            </div>

            {/* Included items */}
            <div className="mt-10">
              <h5 className="text-2xl font-semibold mb-3">What's Included</h5>
              <ul className="list-none space-y-2 text-base">
                <li>✈️ Airport pickup at Incheon National Airport (ICN)</li>
                <li>🏫 Tuition and registration fee of selected university</li>
                <li>🏠 Accommodation</li>
                <li>📶 Local SIM card (mobile data)</li>
                <li>🛡️ Travel insurance</li>
                <li>
                  📘 VISA Support: H-1 (tourist employment), or working holiday (Long terms only)
                </li>
                <li>📞 Emergency support</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                ※ Program contents and pricing may vary depending on university and curriculum.
              </p>
            </div>
            {/* ./body */}
          </div>
        </div>
      </div>
    </div>
  );
}
