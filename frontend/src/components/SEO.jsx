import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://rahima.store';
const SITE_NAME = 'Rahima Store';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;
const DEFAULT_DESC = "L'excellence de la beauté africaine et internationale. Cosmétiques premium, soins naturels, livraison à Dakar et partout au Sénégal.";

/**
 * Composant SEO réutilisable avec support complet :
 * - Title & meta description
 * - Open Graph (Facebook, WhatsApp, LinkedIn)
 * - Twitter Cards
 * - Canonical URL
 * - Structured Data (JSON-LD)
 * - Robots
 */
const SEO = ({
  title,
  description = DEFAULT_DESC,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  noIndex = false,
  structuredData = null,
  keywords = 'cosmétiques, beauté, soins, Dakar, Sénégal, produits naturels, rahima store',
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Beauté & Cosmétiques au Sénégal`;
  const canonicalUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const ogImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* ── Basic ── */}
      <html lang="fr" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Rahima Store" />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* ── Open Graph ── */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="fr_SN" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@rahimastore" />

      {/* ── Geo / Local SEO ── */}
      <meta name="geo.region" content="SN-DK" />
      <meta name="geo.placename" content="Dakar, Sénégal" />
      <meta name="geo.position" content="14.6937;-17.4441" />
      <meta name="ICBM" content="14.6937, -17.4441" />

      {/* ── Structured Data (JSON-LD) ── */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

// ── Pre-built structured data factories ──────────────────────────

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpeg`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+221-33-800-00-00',
    contactType: 'customer service',
    areaServed: 'SN',
    availableLanguage: 'French',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rue Félix Faure',
    addressLocality: 'Dakar',
    addressRegion: 'Plateau',
    addressCountry: 'SN',
  },
  sameAs: [
    'https://www.facebook.com/rahimastore',
    'https://www.instagram.com/rahimastore',
  ],
};

export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/products?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const storeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: SITE_NAME,
  image: `${SITE_URL}/og-image.jpg`,
  url: SITE_URL,
  telephone: '+221-33-800-00-00',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rue Félix Faure',
    addressLocality: 'Dakar',
    addressRegion: 'Plateau',
    postalCode: 'BP 12500',
    addressCountry: 'SN',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  priceRange: '$$',
  currenciesAccepted: 'XOF',
  paymentAccepted: 'Cash',
};

export const buildProductSchema = (product) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.mainImage,
  brand: {
    '@type': 'Brand',
    name: SITE_NAME,
  },
  offers: {
    '@type': 'Offer',
    url: `${SITE_URL}/products/${product._id}`,
    priceCurrency: 'XOF',
    price: product.price,
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  },
  category: product.category,
});

export const buildBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.url}`,
  })),
});

export default SEO;
