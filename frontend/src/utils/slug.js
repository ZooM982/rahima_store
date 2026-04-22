/**
 * Returns the URL-safe slug for a product.
 * Prefers the server-generated `slug` field.
 * Falls back to generating one from the name (for offline/SSR use).
 */
export const productSlug = (product) => {
  if (!product) return '';
  // Prefer the backend-stored slug (clean, no ID)
  if (product.slug) return product.slug;
  // Fallback: generate from name
  return slugify(product.name || '');
};

export const slugify = (text = '') =>
  text.toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

/**
 * Extracts a MongoDB ObjectId from an old-style slug (name-id format).
 * Used as a backward-compat fallback only — new URLs are pure slugs.
 */
export const extractIdFromSlug = (slug = '') => {
  const match = slug.match(/([a-f0-9]{24})$/i);
  return match ? match[1] : null;
};
