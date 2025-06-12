import { getTranslation } from '@/lib/i18n.server';
import ParallaxImage from '@common/parallaxImage';

import { univercities } from '@/lib/univercities';
import type { University } from '@/types/constants';

export default async function Univercities() {
  const { t } = await getTranslation();

  return (
    <div className="relative w-full bg-white mb-30">
      <ParallaxImage section="univercities" imagePath="/assets/image4.jpg" />

      <div className="relative z-10 bg-gradient-to-b from-[#f3e1eb] to-[#fff] w-full px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">{t('UNI_TITLE')}</h2>

          <div className="text-lg text-gray-800 ">
            {/* body */}
            <p className="mb-5">{t('UNI_DESCRIPTION')}</p>

            <div className="mt-10">
              <ul className="list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 w-fit mx-auto">
                {univercities.map((item: University, index) => {
                  const widthClass = {
                    9: 'w-9',
                    12: 'w-12',
                  }[item.width ?? 12];

                  const heightClass = {
                    10: 'h-10',
                    12: 'h-12',
                  }[item.height ?? 12];

                  return (
                    <li key={index} className="flex justify-start items-center gap-4 py-3">
                      <img
                        src={`/assets/emblem/${item.emblem}.png`}
                        alt={item.emblem}
                        className={`${widthClass} ${heightClass} ${item.margin ? 'ml-1.5 mr-1.5' : ''}`}
                      />
                      <strong className="flex flex-col">
                        {item.title}
                        <span className="text-sm text-gray-500 font-normal">{item.subtitle}</span>
                      </strong>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* ./body */}
          </div>
        </div>
      </div>
    </div>
  );
}
