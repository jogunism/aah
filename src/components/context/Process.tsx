import { getTranslation } from '@/lib/i18n.server';
import { Section, SectionHeading } from '@/components/ui/Section';

const STEPS = [1, 2, 3, 4, 5, 6] as const;

/**
 * Study abroad process — step-by-step journey from inquiry to arrival
 */
export default async function Process() {
  const { t } = await getTranslation();

  return (
    <Section id="process">
      <SectionHeading
        title={<span dangerouslySetInnerHTML={{ __html: t('PROCESS_TITLE') }} />}
        lead={t('PROCESS_DESCRIPTION')}
        center
      />
      <ol className="relative grid gap-6 lg:grid-cols-6 lg:gap-0">
        {/* connector line (desktop) */}
        <span aria-hidden="true" className="hidden lg:block absolute top-5 left-[8%] right-[8%] h-0.5 bg-line" />
        {STEPS.map((n) => (
          <li
            key={n}
            className="relative grid grid-cols-[40px_1fr] gap-x-4 lg:flex lg:flex-col lg:items-center lg:text-center lg:px-3"
          >
            <span className="row-span-2 w-10 h-10 rounded-full bg-aah-red text-white font-extrabold flex items-center justify-center lg:mb-4">
              {n}
            </span>
            <h3 className="text-base font-bold text-ink">{t(`PROCESS_STEP_${n}_TITLE`)}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{t(`PROCESS_STEP_${n}_DESC`)}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
