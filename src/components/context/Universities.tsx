import { getTranslation } from '@/lib/i18n.server';
import Image from 'next/image';
import { Section, SectionHeading } from '@/components/ui/Section';
// API
import { getUniversities } from '@/api/server';
// Types
import type { University } from '@/types/constants';

/**
 * Univercity list
 */
export default async function Univercities() {
  const { t } = await getTranslation();

  const universityList: University[] = await getUniversities();

  /*******************************************************
   * render
   */
  return (
    <Section id="universities">
      <SectionHeading title={t('UNI_TITLE')} lead={t('UNI_DESCRIPTION')} />
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3">
        {universityList.map((item: University, index) => {
          return (
            <li
              key={index}
              className="flex items-center gap-3 rounded-2xl border border-line bg-white px-3 py-3 md:px-4 md:py-4"
            >
              <Image
                src={`/assets/emblem/${item.id}.png`}
                alt={item.title}
                width={item.width ? item.width * 4 : 40}
                height={item.height ? item.height * 4 : 40}
                style={{
                  width: item.width ? item.width * 4 : 40,
                  height: item.height ? item.height * 4 : 40,
                }}
                className={`shrink-0 object-contain ${item.margin ? 'mx-1' : ''}`}
              />
              <p className="min-w-0 flex flex-col text-[13px] md:text-sm font-semibold leading-tight text-ink">
                {item.title}
                <span className="mt-0.5 text-xs font-normal text-muted">{item.subTitle}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
