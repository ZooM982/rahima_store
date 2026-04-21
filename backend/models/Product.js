const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, default: 0 }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Vêtements Homme', 'Vêtements Femme', 'Montres', 'Parfums', 'Sacs', 'Soin Visage', 'Maquillage', 'Accessoires']
  },
  // Default image if no variant selected
  mainImage: { type: String, required: true },
  // Optional variants (multiple colors, each with its own image)
  variants: [variantSchema],
  stock: { type: Number, default: 0 }, // Global stock or sum of variants
  isBestseller: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
