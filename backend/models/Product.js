const mongoose = require('mongoose');

// ── Slug utility (mirrors frontend utils/slug.js) ─────────────────
const slugify = (text = '') =>
  text.toString()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, default: 0 }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, index: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Vêtements Homme', 'Vêtements Femme', 'Montres', 'Parfums', 'Sacs', 'Soin Visage', 'Soin Corps', 'Maquillage', 'Accessoires']
  },
  mainImage: { type: String, required: true },
  variants: [variantSchema],
  stock: { type: Number, default: 0 },
  isBestseller: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// ── Auto-generate slug before save ────────────────────────────────
productSchema.pre('save', async function (next) {
  if (!this.isModified('name') && this.slug) return next();

  const base = slugify(this.name);
  let slug = base;
  let counter = 1;

  // Ensure uniqueness
  while (await mongoose.model('Product').exists({ slug, _id: { $ne: this._id } })) {
    slug = `${base}-${counter++}`;
  }
  this.slug = slug;
  next();
});

// ── Auto-generate slug on findOneAndUpdate ─────────────────────────
productSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (!update?.name) return next();

  const base = slugify(update.name);
  let slug = base;
  let counter = 1;
  const docId = this.getQuery()._id;

  while (await mongoose.model('Product').exists({ slug, _id: { $ne: docId } })) {
    slug = `${base}-${counter++}`;
  }
  this.setUpdate({ ...update, slug });
  next();
});

module.exports = mongoose.model('Product', productSchema);
