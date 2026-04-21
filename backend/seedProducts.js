const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  // Maquillage
  {
    name: "Fond de Teint Éclat Pur",
    description: "Un fond de teint léger offrant une couvrance modulable et un fini naturel longue durée. Enrichi en agents hydratants.",
    price: 15500,
    category: "Maquillage",
    stock: 25,
    mainImage: "/images/products/maquillage.png",
    images: []
  },
  {
    name: "Rouge à Lèvres Mat Velours",
    description: "Une couleur intense et un fini mat confortable qui ne dessèche pas les lèvres. Tenue 12h assurée.",
    price: 8500,
    category: "Maquillage",
    stock: 40,
    mainImage: "/images/products/maquillage.png",
    images: []
  },
  // Parfums
  {
    name: "Essence de Rahima (Signature)",
    description: "Un parfum envoûtant mêlant des notes de jasmin, de vanille et de bois de oud. La signature olfactive de Rahima Store.",
    price: 45000,
    category: "Parfums",
    stock: 15,
    mainImage: "/images/products/parfum.png",
    images: []
  },
  {
    name: "Brume de Nuit",
    description: "Une brume légère et rafraîchissante aux extraits de fleurs nocturnes, parfaite pour une soirée d'été.",
    price: 12000,
    category: "Parfums",
    stock: 30,
    mainImage: "/images/products/parfum.png",
    images: []
  },
  // Soin Visage
  {
    name: "Sérum Hydratation Intense",
    description: "Concentré d'acide hyaluronique pour repulper la peau et effacer les signes de fatigue en quelques minutes.",
    price: 22000,
    category: "Soin Visage",
    stock: 20,
    mainImage: "/images/products/serum.png",
    images: []
  },
  {
    name: "Gommage Douceur Éclat",
    description: "Élimine délicatement les impuretés pour révéler un teint lumineux et une peau incroyablement douce.",
    price: 10500,
    category: "Soin Visage",
    stock: 50,
    mainImage: "/images/products/serum.png",
    images: []
  },
  // Soin Corps
  {
    name: "Lait Corps Soyeux",
    description: "Une texture non grasse qui nourrit intensément votre peau tout au long de la journée. Parfum karité et amande.",
    price: 9500,
    category: "Soin Corps",
    stock: 35,
    mainImage: "/images/products/body_oil.png",
    images: []
  },
  {
    name: "Huile de Massage Royale",
    description: "Mélange d'huiles précieuses pour un moment de détente absolue. Apaise le corps et l'esprit.",
    price: 18000,
    category: "Soin Corps",
    stock: 12,
    mainImage: "/images/products/body_oil.png",
    images: []
  }
];

const seedProducts = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is missing in .env");
    
    await mongoose.connect(uri);
    console.log("Connecté à MongoDB...");
    
    await Product.insertMany(products);
    console.log("Produits ajoutés avec succès !");
    
    process.exit();
  } catch (err) {
    console.error("Erreur de seeding:", err);
    process.exit(1);
  }
};

seedProducts();
