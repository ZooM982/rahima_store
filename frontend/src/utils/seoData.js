export const SITE_URL = 'https://rahima.store';
export const SITE_NAME = 'Rahima Store';
export const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;
export const DEFAULT_DESC = "L'excellence de la beauté africaine et internationale. Cosmétiques premium, soins naturels, livraison à Dakar et partout au Sénégal.";

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+221 78 820 12 12 / +221 78 820 18 18',
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
  image: `${SITE_URL}/logo.png`,
  url: SITE_URL,
  telephone: '+221 78 820 12 12 / +221 78 820 18 18',
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
