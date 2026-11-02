// /llms.txt — a plain-Markdown summary of the site for AI assistants and
// AI search engines (https://llmstxt.org). Built from the English
// translations so it stays in sync with the site copy.
import en from '../../../public/locales/en/translation.json';
import { SITE_URL, SUPPORTED_LOCALES } from '@/lib/locales';

export const dynamic = 'force-static';

const t = (key: keyof typeof en) =>
  String(en[key])
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const LANGUAGE_NAMES = new Intl.DisplayNames(['en'], { type: 'language' });

export function GET() {
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

  const languages = SUPPORTED_LOCALES.map(
    (lc) => `- [${LANGUAGE_NAMES.of(lc)}](${SITE_URL}/${lc})`,
  );

  const body = `# aah! education

> ${t('METADATA_DESCRIPTION')}

${t('MAIN_DESCRIPTION')}

## About

${weAre.join('\n')}

## Programs

${t('PROGRAMS_SUB_TITLE')}

- [${t('PROGRAMS_SHORT_BUTTON')}](${SITE_URL}/en/programs/short): ${t('PROGRAMS_SHORT_DESCRIPTION')}
- [${t('PROGRAMS_LONG_BUTTON')}](${SITE_URL}/en/programs/long): ${t('PROGRAMS_LONG_DESCRIPTION')}

## How it works

${t('PROCESS_DESCRIPTION')}

${steps.join('\n')}

## Contact

- Email: contact@aah.education
- Free consultation: ${SITE_URL}/en#contactus
- Instagram: https://www.instagram.com/aah_education.korea

## Languages

${languages.join('\n')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
