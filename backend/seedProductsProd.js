const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  // Maquillage
  {
    name: "Fond de Teint Éclat Pur",
    description: "Un fond de teint léger offrant une couvrance modulable et un fini naturel longue durée.",
    price: 15500,
    category: "Maquillage",
    stock: 25,
    mainImage: "/images/products/maquillage.png"
  },
  {
    name: "Palette Ombre à Paupières",
    description: "Des couleurs pigmentées et faciles à estomper pour un regard sublime.",
    price: 12500,
    category: "Maquillage",
    stock: 20,
    mainImage: "/images/products/maquillage.png"
  },
  // Parfums
  {
    name: "Essence de Rahima (Signature)",
    description: "Un parfum envoûtant mêlant jasmin, vanille et oud.",
    price: 45000,
    category: "Parfums",
    stock: 15,
    mainImage: "/images/products/parfum.png"
  },
  {
    name: "Nuit d'Orient",
    description: "Une fragrance mystérieuse pour vos soirées exceptionnelles.",
    price: 38000,
    category: "Parfums",
    stock: 12,
    mainImage: "/images/products/parfum.png"
  },
  // Soin Visage
  {
    name: "Sérum Hydratation Intense",
    description: "Concentré d'acide hyaluronique pour repulper la peau.",
    price: 22000,
    category: "Soin Visage",
    stock: 30,
    mainImage: "/images/products/serum.png"
  },
  {
    name: "Crème de Jour Éclat",
    description: "Hydrate et protège contre les agressions extérieures.",
    price: 18500,
    category: "Soin Visage",
    stock: 25,
    mainImage: "/images/products/serum.png"
  },
  // Soin Corps
  {
    name: "Huile de Massage Royale",
    description: "Mélange d'huiles précieuses pour un moment de détente absolue.",
    price: 18000,
    category: "Soin Corps",
    stock: 15,
    mainImage: "/images/products/body_oil.png"
  },
  {
    name: "Beurre de Karité Parfumé",
    description: "Nourrit intensément les peaux les plus sèches.",
    price: 9500,
    category: "Soin Corps",
    stock: 40,
    mainImage: "/images/products/body_oil.png"
  },
  // Vêtements Homme
  {
    name: "Blazer Tailored Fit",
    description: "Blazer ajusté pour un look professionnel et élégant.",
    price: 55000,
    category: "Vêtements Homme",
    stock: 10,
    mainImage: "/images/products/homme.png"
  },
  {
    name: "Chemise Oxford Blanche",
    description: "La chemise essentielle, coupe parfaite et tissu de qualité.",
    price: 25000,
    category: "Vêtements Homme",
    stock: 30,
    mainImage: "/images/products/homme.png"
  },
  // Vêtements Femme
  {
    name: "Robe de Soie Chic",
    description: "Une robe fluide et élégante pour toutes les occasions.",
    price: 65000,
    category: "Vêtements Femme",
    stock: 8,
    mainImage: "/images/products/femme.png"
  },
  {
    name: "Ensemble Satin Rahima",
    description: "Confort et prestige réunis dans un ensemble unique.",
    price: 48000,
    category: "Vêtements Femme",
    stock: 15,
    mainImage: "/images/products/femme.png"
  },
  // Montres
  {
    name: "Montre Chrono Luxe",
    description: "Une montre automatique aux finitions exceptionnelles.",
    price: 120000,
    category: "Montres",
    stock: 5,
    mainImage: "/images/products/montre.png"
  },
  {
    name: "Montre Quartz Classic",
    description: "L'élégance intemporelle à votre poignet.",
    price: 75000,
    category: "Montres",
    stock: 10,
    mainImage: "/images/products/montre.png"
  },
  // Sacs
  {
    name: "Sac à Main Designer",
    description: "Cuir véritable et finitions travaillées à la main.",
    price: 85000,
    category: "Sacs",
    stock: 6,
    mainImage: "/images/products/sac.png"
  },
  {
    name: "Pochette de Soirée",
    description: "L'accessoire parfait pour compléter vos tenues de fête.",
    price: 32000,
    category: "Sacs",
    stock: 20,
    mainImage: "/images/products/sac.png"
  },
  // Accessoires
  {
    name: "Lunettes de Soleil Iconique",
    description: "Protection UV et design avant-gardiste.",
    price: 18500,
    category: "Accessoires",
    stock: 25,
    mainImage: "/images/products/accessoire.png"
  },
  {
    name: "Carré de Soie Imprimé",
    description: "Apportez une touche de couleur à votre style.",
    price: 12000,
    category: "Accessoires",
    stock: 40,
    mainImage: "/images/products/accessoire.png"
  }
];

const PROD_URI = "mongodb+srv://haurlyroll_db_user:ZIyFlr1LsWDFWicI@rahimastore.7ecxfrw.mongodb.net/?appName=RahimaStore";

const seedProducts = async () => {
  try {
    console.log("Tentative de connexion à la base de données PRODUCTION...");
    await mongoose.connect(PROD_URI);
    console.log("Connecté à RahimaStore Production ✅");

    // Optionnel: Nettoyer pour éviter les doublons lors du test
    // await Product.deleteMany({});
    
    await Product.insertMany(products);
    console.log(`Succès: ${products.length} produits ajoutés à la base de données ! 🚀`);
    
    process.exit();
  } catch (err) {
    console.error("Erreur de seeding PROD:", err);
    process.exit(1);
  }
};

seedProducts();
