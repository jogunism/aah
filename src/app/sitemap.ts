import type { MetadataRoute } from 'next';
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  SITE_URL,
  buildHreflangMap,
} from '@/lib/locales';
import { getSchools } from '@/api/server';
import { defaultProgram } from '@/lib/plan';

// Rebuilt hourly so new or hidden schools follow the API
export const revalidate = 3600;

const ROUTES = [
  { path: '', priority: 1.0 },
  { path: '/programs/short', priority: 0.8 },
  { path: '/programs/long', priority: 0.8 },
  { path: '/plan', priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  // One page per school with prices (/plan/{id}); the list is the same in every currency
  const schools = (await getSchools('EUR')).filter((s) => defaultProgram(s));
  const routes = [...ROUTES, ...schools.map((s) => ({ path: `/plan/${s.id}`, priority: 0.7 }))];

  return SUPPORTED_LOCALES.flatMap((lang) =>
    routes.map(({ path, priority }) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: lang === DEFAULT_LOCALE ? priority : Math.round((priority - 0.1) * 10) / 10,
      alternates: {
        languages: buildHreflangMap(path),
      },
    })),
  );
}
