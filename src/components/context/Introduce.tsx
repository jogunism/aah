import { getTranslation } from '@/lib/i18n.server';
import SmoothScrollLink from './SmoothScrollLink';
import { Section, SectionHeading } from '@/components/ui/Section';
import { buttonClass } from '@/components/ui/Button';

const WE_ARE = [1, 2, 3, 4, 5, 6, 7] as const;

export default async function Introduce() {
  const { t } = await getTranslation();

  return (
    <Section id="about" className="bg-soft">
      <SectionHeading title={t('MAIN_SLOGAN')} lead={t('MAIN_DESCRIPTION')} />
      <p className="mb-4 text-lg font-bold text-ink">{t('MAIN_WE_ARE')}</p>
      <ul className="grid md:grid-cols-2 gap-2.5 md:gap-3">
        {WE_ARE.map((n) => (
          <li key={n} className="flex gap-3 rounded-2xl bg-white p-4 md:p-5 text-[15px] leading-relaxed text-ink-2">
            <span className="mt-0.5 shrink-0 text-aah-red font-bold" aria-hidden="true">✓</span>
            <span dangerouslySetInnerHTML={{ __html: t(`MAIN_WE_ARE_DESCRIPTION_${n}`) }} />
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <SmoothScrollLink href="#contactus" className={buttonClass('primary')}>
          {t('MAIN_CTA')}
        </SmoothScrollLink>
      </div>
    </Section>
  );
}
