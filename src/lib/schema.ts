import { SITE_URL, SUPPORTED_LOCALES, type Locale } from './locales';

const ORG_ID = `${SITE_URL}/#organization`;

// Languages the agency works in (interface) + the language students learn (Korean) + Japanese parent org context.
const KNOWS_LANGUAGES = [...SUPPORTED_LOCALES, 'ko', 'ja'];

// Markets aah! education Europe targets. ISO 3166-1 alpha-2.
const AREA_SERVED = ['DE', 'AT', 'CH', 'FR', 'BE', 'LU', 'NL', 'ES', 'IT', 'PT', 'GB', 'KR'];

const countryName = new Intl.DisplayNames(['en'], { type: 'region' });

const SOCIAL_LINKS = ['https://www.instagram.com/aah_education.korea', 'https://aah-e.net'];

export const buildOrganizationSchema = ({
  description,
  slogan,
}: {
  description: string;
  slogan: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': ['Organization', 'EducationalOrganization'],
  '@id': ORG_ID,
  name: 'aah! education',
  alternateName: ['aah! education Europe', 'aah education'],
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/assets/logo.png`,
  },
  image: `${SITE_URL}/assets/main.jpg`,
  description,
  slogan,
  email: 'contact@aah.education',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'contact@aah.education',
    availableLanguage: [...SUPPORTED_LOCALES],
    areaServed: AREA_SERVED,
  },
  sameAs: SOCIAL_LINKS,
  inLanguage: SUPPORTED_LOCALES as unknown as string[],
  knowsLanguage: KNOWS_LANGUAGES,
  areaServed: AREA_SERVED.map((code) => ({
    '@type': 'Country',
    name: countryName.of(code) ?? code,
    identifier: code,
  })),
  parentOrganization: {
    '@type': 'Organization',
    name: 'aah! education (Japan/Korea)',
    url: 'https://aah-e.net',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Korean Language Programs',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Short-Term (1–3 weeks during school holidays)',
        url: `${SITE_URL}/en/programs/short`,
      },
      {
        '@type': 'OfferCatalog',
        name: 'Long-Term (semesters of 10 weeks at universities, 4 weeks at language schools)',
        url: `${SITE_URL}/en/programs/long`,
      },
    ],
  },
});

export const buildCourseSchema = ({
  lang,
  path,
  name,
  description,
  workloadISO,
  priceFromEur,
}: {
  lang: Locale;
  path: string;
  name: string;
  description: string;
  workloadISO: string; // class hours, ISO 8601 duration, e.g. "PT60H"
  priceFromEur: number | null; // lowest estimated total; omitted when the API has no price
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name,
  description,
  url: `${SITE_URL}/${lang}${path}`,
  inLanguage: lang,
  educationalLevel: 'Beginner to Advanced',
  teaches: 'Korean language and culture',
  provider: { '@type': 'Organization', '@id': ORG_ID, name: 'aah! education', sameAs: SITE_URL },
  ...(priceFromEur
    ? { offers: { '@type': 'Offer', category: 'Paid', price: priceFromEur, priceCurrency: 'EUR' } }
    : {}),
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Onsite',
    courseWorkload: workloadISO,
    location: {
      '@type': 'Place',
      name: 'South Korea',
      address: { '@type': 'PostalAddress', addressCountry: 'KR' },
    },
  },
});

export const buildBreadcrumbSchema = (
  lang: Locale,
  trail: { name: string; path: string }[],
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}/${lang}${item.path}`,
  })),
});

export const buildFaqSchema = (items: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
});
