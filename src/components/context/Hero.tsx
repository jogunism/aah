// 홈 첫 화면: 핵심 메시지, CTA 2개, 신뢰 지표 바
import Image from 'next/image';
import { getTranslation } from '@/lib/i18n.server';
import ScrollLink from '@/components/common/ScrollLink';
import { buttonClass } from '@/components/ui/Button';
import { getUniversities } from '@/api/server';

// Swap this for a photo of students (class, campus, Seoul life) when available.
const HERO_IMAGE = '/assets/image5.jpg';

/**
 * First screen: one message, two actions, and a trust strip.
 */
export default async function Hero({ lang }: { lang: string }) {
  const { t } = await getTranslation(lang);
  const universities = await getUniversities();
  const count = universities.length || 16;

  const trust = [
    { value: t('TRUST_1_VALUE'), label: t('TRUST_1_LABEL') },
    { value: t('TRUST_2_VALUE'), label: t('TRUST_2_LABEL') },
    { value: t('TRUST_3_VALUE', { count }), label: t('TRUST_3_LABEL') },
    { value: t('TRUST_4_VALUE'), label: t('TRUST_4_LABEL') },
  ];

  return (
    <section className="relative w-full h-[calc(100svh-60px)] min-h-[640px] max-h-[860px] overflow-hidden text-white">
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_40%]"
      />
      {/* Readability gradients: left-to-right on desktop, bottom-up on mobile */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 md:bg-[linear-gradient(90deg,rgba(0,0,0,.68)_0%,rgba(0,0,0,.35)_50%,rgba(0,0,0,0)_80%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent hidden md:block" />

      <div className="relative z-10 h-full max-w-[1180px] mx-auto px-5 md:px-6 flex flex-col justify-end md:justify-center pb-[200px] md:pb-24">
        <p className="text-sm font-bold uppercase tracking-wide text-[#ffd6d8]">{t('HERO_EYEBROW')}</p>
        <h1 className="mt-3 mb-4 max-w-[680px] text-[40px] md:text-[64px] leading-[1.05] font-extrabold tracking-[-0.03em]">
          {t('HERO_TITLE')}
        </h1>
        <p className="max-w-[560px] text-[17px] md:text-xl leading-relaxed text-white/90">{t('HERO_LEAD')}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <ScrollLink lang={lang} section="programs" className={buttonClass('primary')}>
            {t('HERO_CTA_PRIMARY')}
          </ScrollLink>
          <ScrollLink lang={lang} section="contactus" className={buttonClass('outline-light')}>
            {t('HERO_CTA_SECONDARY')}
          </ScrollLink>
        </div>
      </div>

      {/* Trust strip */}
      <div className="absolute z-10 inset-x-0 bottom-0 border-t border-white/20 bg-black/25 backdrop-blur-md">
        <ul className="max-w-[1180px] mx-auto px-5 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 py-4 md:py-6">
          {trust.map((it) => (
            <li key={it.value}>
              <p className="text-[17px] md:text-[22px] font-extrabold leading-tight">{it.value}</p>
              <p className="text-xs md:text-[13px] text-white/80 leading-snug">{it.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
