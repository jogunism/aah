import Image from 'next/image';
import { getTranslation } from '@/lib/i18n.server';

export default async function Introduce() {
  const { t } = await getTranslation();

  return (
    <div className="relative w-full bg-white mb-30">
      <div className="relative w-screen h-[500px] overflow-hidden">
        <div className="relative w-full h-[100%]">
          <Image
            src="/assets/image1.jpg"
            alt={t('MAIN_SLOGAN')}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-[#f3e1eb] to-[#fff] w-full px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">{t('MAIN_SLOGAN')}</h2>
          <h3 className="text-xl font-bold text-gray-900 mb-3 text-left">
            {t('INTRODUCE_SEO_TITLE')}
          </h3>
          <div className="text-lg text-gray-800 ">
            {/* body */}
            <p className="mb-5">{t('MAIN_DESCRIPTION')}</p>
            <p>
              <strong>{t('MAIN_WE_ARE')}</strong>
            </p>
            <ul className="list-disc pl-12 ml-0">
              <li>{t('MAIN_WE_ARE_DESCRIPTION_1')}</li>
              <li>{t('MAIN_WE_ARE_DESCRIPTION_2')}</li>
              <li>{t('MAIN_WE_ARE_DESCRIPTION_3')}</li>
              <li>{t('MAIN_WE_ARE_DESCRIPTION_4')}</li>
              <li>{t('MAIN_WE_ARE_DESCRIPTION_5')}</li>
              <li>{t('MAIN_WE_ARE_DESCRIPTION_6')}</li>
              <li>{t('MAIN_WE_ARE_DESCRIPTION_7')}</li>
            </ul>
            {/* ./body */}
          </div>
        </div>
      </div>
    </div>
  );
}
