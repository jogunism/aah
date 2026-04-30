'use client';

import Script from 'next/script';
import { useTranslation } from 'react-i18next';
import { FaInstagram } from 'react-icons/fa';
import ParallaxImage from '@common/parallaxImage';

const INSTAGRAM_GRADIENT =
  'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)';

/**
 * Instagram feed (LightWidget embed)
 * Set NEXT_PUBLIC_LIGHTWIDGET_ID in .env to enable.
 */
export default function Instagram() {
  const { t } = useTranslation();
  const widgetId = process.env.NEXT_PUBLIC_LIGHTWIDGET_ID;

  if (!widgetId) return null;

  return (
    <div className="relative w-full bg-white mb-30">
      <ParallaxImage
        section="instagram"
        imagePath="/assets/image7.jpg"
        alt="Daily life of aah students in Korea"
      />

      <div className="relative z-10 bg-gradient-to-b from-[#f3e1eb] to-[#fff] w-full px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {t('INSTAGRAM_TITLE')}
          </h2>
          <div className="text-lg text-gray-800">
            {/* body */}
            <p className="mb-8 text-center">{t('INSTAGRAM_DESCRIPTION')}</p>

            <div className="max-w-5xl mx-auto">
              <iframe
                src={`//lightwidget.com/widgets/${widgetId}.html`}
                className="lightwidget-widget"
                style={{ width: '100%', border: 0, overflow: 'hidden', background: 'transparent' }}
                title="Instagram feed"
              />
            </div>

            <div className="text-center mt-8">
              <a
                href="https://www.instagram.com/aah_korea/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: INSTAGRAM_GRADIENT }}
                className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-full shadow-md hover:opacity-90 transition-opacity"
              >
                <FaInstagram className="text-xl" />
                <span>{t('INSTAGRAM_FOLLOW_CTA')}</span>
              </a>
            </div>
            {/* ./body */}
          </div>
        </div>
      </div>

      <Script
        src="https://cdn.lightwidget.com/widgets/lightwidget.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
