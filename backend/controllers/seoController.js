const Product = require('../models/Product');

const SITE_URL = 'https://rahima-store.vercel.app';

/** Mirror of frontend slug utility */
const slugify = (text = '') =>
  text.toString()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const productSlug = (product) => `${slugify(product.name)}-${product._id}`;

/**
 * Generates an XML sitemap dynamically from the product catalog.
 * Static pages are hardcoded; product pages are fetched from DB.
 */
const generateSitemap = async (req, res) => {
  try {
    const products = await Product.find({}, '_id name updatedAt').lean();

    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/products', priority: '0.9', changefreq: 'daily' },
      { url: '/conditions-generales', priority: '0.3', changefreq: 'yearly' },
      { url: '/politique-confidentialite', priority: '0.3', changefreq: 'yearly' },
      { url: '/livraison-retours', priority: '0.4', changefreq: 'monthly' },
      { url: '/faq', priority: '0.5', changefreq: 'monthly' },
    ];

    const productPages = products.map(p => ({
      url: `/products/${productSlug(p)}`,
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: p.updatedAt ? new Date(p.updatedAt).toISOString().split('T')[0] : undefined,
    }));

    const allPages = [...staticPages, ...productPages];

    const today = new Date().toISOString().split('T')[0];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allPages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod || today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.header('Cache-Control', 'public, max-age=3600'); // cache 1h
    res.send(xml);
  } catch (err) {
    res.status(500).send('Error generating sitemap');
  }
};

/**
 * Generates a robots.txt file.
 */
const generateRobots = (req, res) => {
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /dashboard
Disallow: /login
Disallow: /register
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml`;

  res.header('Content-Type', 'text/plain');
  res.send(robots);
};

module.exports = { generateSitemap, generateRobots };
