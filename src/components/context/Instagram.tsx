'use client';

import Script from 'next/script';
import { useTranslation } from 'react-i18next';
import { FaInstagram } from 'react-icons/fa';
import { Section, SectionHeading } from '@/components/ui/Section';

const INSTAGRAM_GRADIENT =
  'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)';

const BeholdWidget = 'behold-widget' as unknown as React.FC<{ 'feed-id': string }>;

/**
 * Instagram feed (Behold.so embed)
 * Set NEXT_PUBLIC_BEHOLD_FEED_ID in .env to enable.
 */
export default function Instagram() {
  const { t } = useTranslation();
  const feedId = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID;

  if (!feedId) return null;

  return (
    <Section className="bg-soft">
      <SectionHeading title={t('INSTAGRAM_TITLE')} lead={t('INSTAGRAM_DESCRIPTION')} center />
      <div className="max-w-5xl mx-auto">
        <BeholdWidget feed-id={feedId} />
      </div>

      <div className="text-center mt-8">
        <a
          href="https://www.instagram.com/aah_education.korea"
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: INSTAGRAM_GRADIENT }}
          className="inline-flex items-center gap-2 h-11 px-6 text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
        >
          <FaInstagram className="text-xl" />
          <span>{t('INSTAGRAM_FOLLOW_CTA')}</span>
        </a>
      </div>

      <Script
        type="module"
        src="https://w.behold.so/widget.js"
        strategy="afterInteractive"
      />
    </Section>
  );
}
