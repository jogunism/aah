// AI 검색용 사이트 요약 /llms.txt를 영어 번역문과 API 가격 범위로 생성하는 라우트(하루 1회 갱신)
// /llms.txt — a plain-Markdown summary of the site for AI assistants and
// AI search engines (https://llmstxt.org). Built from the English
// translations so it stays in sync with the site copy.
import en from '../../../public/locales/en/translation.json';
import { SITE_URL, SUPPORTED_LOCALES } from '@/lib/locales';
import { FAQ_ITEMS } from '@/lib/faq';
import { getPrices } from '@/api/server';

// Rendered per request (not at build time, when the API can be throttled) and cached
// by the CDN for a day, so the price ranges follow the API (exchange rates, school prices)
export const dynamic = 'force-dynamic';

const t = (key: keyof typeof en) =>
  String(en[key])
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const LANGUAGE_NAMES = new Intl.DisplayNames(['en'], { type: 'language' });

// Short-term vs long-term rows from the comparison table (cells use "\n" between school types)
const COMPARE_ROWS = [
  ['COMPARE_ROW_LENGTH', 'COMPARE_SHORT_LENGTH', 'COMPARE_LONG_LENGTH'],
  ['COMPARE_ROW_START', 'COMPARE_SHORT_START', 'COMPARE_LONG_START'],
  ['COMPARE_ROW_CLASSES', 'COMPARE_SHORT_CLASSES', 'COMPARE_LONG_CLASSES'],
  ['COMPARE_ROW_SIZE', 'COMPARE_SHORT_SIZE', 'COMPARE_LONG_SIZE'],
  ['COMPARE_ROW_VISA', 'TILE_SHORT_META_2', 'COMPARE_LONG_VISA'],
] as const;

const cell = (key: keyof typeof en) => String(en[key]).replace(/\n/g, '; ');

export async function GET() {
  const compare = COMPARE_ROWS.map(
    ([row, short, long]) =>
      `- **${t(row)}**: Short-term: ${cell(short)}. Long-term: ${cell(long)}.`,
  );

  const [eur, usd, gbp] = await Promise.all([getPrices('EUR'), getPrices('USD'), getPrices('GBP')]);
  const range = (min: number, max: number, sym: string) =>
    `${sym}${min.toLocaleString('en-US')}–${sym}${max.toLocaleString('en-US')}`;
  const other = (field: 'short' | 'long') =>
    [usd && range(usd[`${field}Min`], usd[`${field}Max`], '$'), gbp && range(gbp[`${field}Min`], gbp[`${field}Max`], '£')]
      .filter(Boolean)
      .join(', ');
  const prices =
    eur && usd
      ? `## Prices

Estimated totals for the first option at each school (registration fee, tuition and the aah! service & contract fee; the upper end includes a dormitory). ${t('COMPARE_PRICE_NOTE').replace(/<\/?b>/g, '')}

- Short-term: ${range(eur.shortMin, eur.shortMax, '€')} (${other('short')})
- Long-term, per semester: ${range(eur.longMin, eur.longMax, '€')} (${other('long')})
- Estimate for a specific school, duration and housing: ${SITE_URL}/en/plan

`
      : '';

  const weAre = (
    [
      'MAIN_WE_ARE_DESCRIPTION_1',
      'MAIN_WE_ARE_DESCRIPTION_2',
      'MAIN_WE_ARE_DESCRIPTION_3',
      'MAIN_WE_ARE_DESCRIPTION_4',
      'MAIN_WE_ARE_DESCRIPTION_5',
      'MAIN_WE_ARE_DESCRIPTION_6',
      'MAIN_WE_ARE_DESCRIPTION_7',
    ] as const
  ).map((k) => `- We are ${t(k)}`);

  const steps = ([1, 2, 3, 4, 5, 6] as const).map(
    (n) =>
      `${n}. **${t(`PROCESS_STEP_${n}_TITLE`)}**: ${t(`PROCESS_STEP_${n}_DESC`)}`,
  );

  const faq = FAQ_ITEMS.map(
    (n) => `### ${t(`FAQ_Q${n}`)}\n\n${t(`FAQ_A${n}`)}`,
  );

  const languages = SUPPORTED_LOCALES.map(
    (lc) => `- [${LANGUAGE_NAMES.of(lc)}](${SITE_URL}/${lc})`,
  );

  const body = `# aah! education

> ${t('METADATA_DESCRIPTION')}

${t('MAIN_DESCRIPTION')}

## About

${weAre.join('\n')}

## Programs

${t('LINEUP_TITLE')}

- [${t('PROGRAM_MODAL_SHORT_TERM')}](${SITE_URL}/en/programs/short): ${t('TILE_SHORT_SUB')} ${t('PROGRAMS_SHORT_DESCRIPTION')}
- [${t('PROGRAM_MODAL_LONG_TERM')}](${SITE_URL}/en/programs/long): ${t('TILE_LONG_SUB')} ${t('PROGRAMS_LONG_DESCRIPTION')}
- [${t('PLAN_META_TITLE')}](${SITE_URL}/en/plan): ${t('PLAN_LEAD')}

### Short-term vs long-term

${compare.join('\n')}

${prices}## How it works

${t('PROCESS_DESCRIPTION')}

${steps.join('\n')}

## ${t('FAQ_TITLE')}

${faq.join('\n\n')}

## Contact

- Email: contact@aah.education
- Free consultation: ${SITE_URL}/en#contactus
- Instagram: https://www.instagram.com/aah_education.korea

## Languages

${languages.join('\n')}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
