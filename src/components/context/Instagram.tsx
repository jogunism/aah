'use client';

import Script from 'next/script';
import { useTranslation } from 'react-i18next';
import ParallaxImage from '@common/parallaxImage';

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
      <ParallaxImage section="instagram" imagePath="/assets/modal/content3.jpg" />

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
                allowTransparency
                className="lightwidget-widget"
                style={{ width: '100%', border: 0, overflow: 'hidden' }}
                title="Instagram feed"
              />
            </div>

            <div className="text-center mt-6">
              <a
                href="https://www.instagram.com/aah_korea/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-aah-red hover:underline font-semibold"
              >
                @aah_korea →
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
