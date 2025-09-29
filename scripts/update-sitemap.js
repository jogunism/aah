#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

function updateSitemap() {
  try {
    // Read the current sitemap
    let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

    // Get current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];

    // Replace all lastmod dates with current date
    const updatedContent = sitemapContent.replace(
      /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
      `<lastmod>${currentDate}</lastmod>`
    );

    // Write back to file
    fs.writeFileSync(sitemapPath, updatedContent, 'utf8');

    console.log(`✅ Sitemap updated successfully with date: ${currentDate}`);
  } catch (error) {
    console.error('❌ Failed to update sitemap:', error.message);
    process.exit(1);
  }
}

updateSitemap();