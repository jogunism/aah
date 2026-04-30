import { SITE_URL, SUPPORTED_LOCALES, type Locale } from './locales';

const ORG_ID = `${SITE_URL}/#organization`;

// Languages the agency works in (interface) + the language students learn (Korean) + Japanese parent org context.
const KNOWS_LANGUAGES = [...SUPPORTED_LOCALES, 'ko', 'ja'];

// Markets aah! education Europe targets. ISO 3166-1 alpha-2.
const AREA_SERVED = ['DE', 'AT', 'CH', 'FR', 'BE', 'LU', 'NL', 'ES', 'IT', 'PT', 'KR'];

const SOCIAL_LINKS = ['https://www.instagram.com/aah_korea', 'https://aah-e.net'];

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
  email: 'hyunwoo@aah-e.net',
  sameAs: SOCIAL_LINKS,
  inLanguage: SUPPORTED_LOCALES as unknown as string[],
  knowsLanguage: KNOWS_LANGUAGES,
  areaServed: AREA_SERVED.map((code) => ({ '@type': 'Country', name: code })),
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
        name: 'Short-Term (3 weeks)',
        url: `${SITE_URL}/en/programs/short`,
      },
      {
        '@type': 'OfferCatalog',
        name: 'Long-Term (3 months)',
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
  durationISO,
}: {
  lang: Locale;
  path: string;
  name: string;
  description: string;
  durationISO: string; // ISO 8601 duration, e.g. "P3W"
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name,
  description,
  url: `${SITE_URL}/${lang}${path}`,
  inLanguage: lang,
  educationalLevel: 'Beginner to Advanced',
  teaches: 'Korean language and culture',
  provider: { '@id': ORG_ID },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'In-person',
    courseWorkload: durationISO,
    location: {
      '@type': 'Place',
      name: 'Seoul, South Korea',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Seoul',
        addressCountry: 'KR',
      },
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
