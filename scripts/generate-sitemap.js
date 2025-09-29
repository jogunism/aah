#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

// Site configuration
const SITE_URL = 'https://aah.education';

// Define your site structure
const pages = [
  {
    url: '/',
    changefreq: 'monthly',
    priority: '1.0',
    // You can set specific lastmod dates for different pages
    // If not set, current date will be used
    lastmod: null
  }
  // Add more pages as needed:
  // {
  //   url: '/about',
  //   changefreq: 'yearly',
  //   priority: '0.8',
  //   lastmod: null
  // },
  // {
  //   url: '/contact',
  //   changefreq: 'monthly',
  //   priority: '0.9',
  //   lastmod: null
  // }
];

function generateSitemap() {
  try {
    const currentDate = new Date().toISOString().split('T')[0];

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

    // Write sitemap to file
    fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');

    console.log(`✅ Sitemap generated successfully with ${pages.length} pages`);
    console.log(`📅 Last modified: ${currentDate}`);
    console.log(`📍 Saved to: ${sitemapPath}`);
  } catch (error) {
    console.error('❌ Failed to generate sitemap:', error.message);
    process.exit(1);
  }
}

generateSitemap();