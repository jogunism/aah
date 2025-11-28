#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

// Site configuration
const SITE_URL = 'https://aah.education';

// Supported languages
const languages = ['en', 'de'];
const defaultLang = 'en';

// Define your site structure (paths without language prefix)
const pages = [
  {
    path: '',  // root path for each language
    changefreq: 'monthly',
    priority: '1.0',
    lastmod: null
  },
  {
    path: '/programs/short',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: null
  },
  {
    path: '/programs/long',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: null
  }
];

function generateSitemap() {
  try {
    const currentDate = new Date().toISOString().split('T')[0];

    // Generate URLs for each language
    const urls = [];

    pages.forEach(page => {
      languages.forEach(lang => {
        const url = `${SITE_URL}/${lang}${page.path}`;
        const alternates = languages.map(altLang => ({
          lang: altLang,
          url: `${SITE_URL}/${altLang}${page.path}`
        }));

        urls.push({
          loc: url,
          lastmod: page.lastmod || currentDate,
          changefreq: page.changefreq,
          priority: lang === defaultLang ? page.priority : '0.9',
          alternates
        });
      });
    });

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
${url.alternates.map(alt => `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.url}" />`).join('\n')}
  </url>`).join('\n')}
</urlset>
`;

    // Write sitemap to file
    fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');

    console.log(`✅ Sitemap generated successfully with ${urls.length} URLs (${pages.length} pages x ${languages.length} languages)`);
    console.log(`🌐 Languages: ${languages.join(', ')}`);
    console.log(`📅 Last modified: ${currentDate}`);
    console.log(`📍 Saved to: ${sitemapPath}`);
  } catch (error) {
    console.error('❌ Failed to generate sitemap:', error.message);
    process.exit(1);
  }
}

generateSitemap();
