import { Helmet } from 'react-helmet-async';
import { SITE_NAME, SITE_URL, DEFAULT_DESC, DEFAULT_IMAGE } from '../utils/seoData';

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

export default SEO;
