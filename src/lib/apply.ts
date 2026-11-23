// 신청 폼 선택지: 국가(페이지 언어 이름), 학기, 한국어 레벨

export const SEASONS = ['spring', 'summer', 'fall', 'winter'] as const;

/** The next 8 terms (Spring/Summer/Fall/Winter), starting after the current month */
export const termOptions = (now = new Date()): string[] => {
  const startMonth = { spring: 3, summer: 6, fall: 9, winter: 12 };
  const out: string[] = [];
  for (let y = now.getFullYear(); y <= now.getFullYear() + 2; y++) {
    for (const s of SEASONS) {
      if (y === now.getFullYear() && startMonth[s] <= now.getMonth() + 1) continue;
      out.push(`${y}-${s}`);
    }
  }
  return out.slice(0, 8);
};

export const KOREAN_LEVELS = ['none', 'beginner', 'basic', 'intermediate', 'advanced'] as const;

// ISO 3166-1 alpha-2; names come from Intl.DisplayNames in the page language
export const COUNTRY_CODES = (
  'AF AX AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BV BR IO BN BG BF BI CV KH CM CA KY ' +
  'CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF TF GA GM GE DE ' +
  'GH GI GR GL GD GP GU GT GG GN GW GY HT HM VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KP KR KW KG LA LV LB LS ' +
  'LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF MK MP NO OM ' +
  'PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA GS SS ES ' +
  'LK SD SR SJ SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UM UY UZ VU VE VN VG VI WF EH YE ZM ZW'
).split(' ');

export const countryName = (code: string, lang: string) => {
  try {
    return new Intl.DisplayNames([lang], { type: 'region' }).of(code) ?? code;
  } catch {
    return code;
  }
};

/** Countries sorted by their name in the page language */
export const countryOptions = (lang: string) =>
  COUNTRY_CODES.map((code) => ({ code, name: countryName(code, lang) })).sort((a, b) => a.name.localeCompare(b.name, lang));

// Countries of the site's languages, shown first in the country lists; the current page language's country leads
const LANG_COUNTRIES: Record<string, string[]> = { en: ['GB', 'US'], de: ['DE'], fr: ['FR'], es: ['ES'], it: ['IT'] };
export const pinnedCountries = (lang: string) => {
  const all = ['DE', 'FR', 'ES', 'IT', 'GB', 'US'];
  const own = LANG_COUNTRIES[lang] ?? [];
  return [...own, ...all.filter((c) => !own.includes(c))];
};

/** January … December in the page language */
export const monthNames = (lang: string) =>
  Array.from({ length: 12 }, (_, i) =>
    new Date(Date.UTC(2000, i, 1)).toLocaleDateString(lang, { month: 'long', timeZone: 'UTC' }),
  );

/** Newest first: from 14 years ago back to 1950 (the API accepts ages 14–100) */
export const birthYears = (now = new Date()) =>
  Array.from({ length: now.getFullYear() - 14 - 1950 + 1 }, (_, i) => now.getFullYear() - 14 - i);
