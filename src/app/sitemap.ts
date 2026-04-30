import type { MetadataRoute } from 'next';
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  SITE_URL,
  buildHreflangMap,
} from '@/lib/locales';

const ROUTES = [
  { path: '', priority: 1.0 },
  { path: '/programs/short', priority: 0.8 },
  { path: '/programs/long', priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SUPPORTED_LOCALES.flatMap((lang) =>
    ROUTES.map(({ path, priority }) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: lang === DEFAULT_LOCALE ? priority : priority - 0.1,
      alternates: {
        languages: buildHreflangMap(path),
      },
    })),
  );
}
