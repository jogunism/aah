// 홈 "포함 항목" 섹션(픽업·지원·숙소·SIM·비자·긴급 지원)과 플랜 빌더(/plan) 진입점
import { getTranslation } from '@/lib/i18n.server';
import { Section, SectionHeading } from '@/components/ui/Section';
import Link from 'next/link';
import { buttonClass } from '@/components/ui/Button';

const ITEMS = [
  { n: 1, icon: '✈️' },
  { n: 2, icon: '🏫' },
  { n: 3, icon: '🏠' },
  { n: 4, icon: '📶' },
  { n: 5, icon: '📘' },
  { n: 6, icon: '📞' },
] as const;

export default async function Included({ lang }: { lang: string }) {
  const { t } = await getTranslation(lang);

  return (
    <Section id="tuition" className="bg-soft">
      <SectionHeading title={t('INCLUDED_TITLE')} lead={t('INCLUDED_LEAD')} center />
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {ITEMS.map(({ n, icon }) => (
          <li key={n} className="rounded-[22px] bg-white p-4 md:p-7">
            <span className="text-[26px] md:text-[30px]" aria-hidden="true">{icon}</span>
            <h3 className="mt-3 text-[15px] md:text-lg font-bold text-ink">{t(`INC_${n}_TITLE`)}</h3>
            <p className="mt-1 text-[13px] md:text-sm leading-relaxed text-muted">{t(`INC_${n}_DESC`)}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center">
        <Link href={`/${lang}/plan`} className={buttonClass('blue')}>
          {t('TUITION_CALCULATOR')}
        </Link>
      </div>
    </Section>
  );
}
