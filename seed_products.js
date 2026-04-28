const products = [
  {
    name: "Pink Blush",
    price: 15000,
    category: "Parfums",
    description: "Une fragrance envoûtante et féminine qui capture l'essence de la délicatesse. Cette Eau de Parfum de 50ml de Rahima Store offre des notes florales subtiles et rafraîchissantes.",
    mainImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000",
    stock: 50,
    isBestseller: true
  },
  {
    name: "Ensemble African Chic",
    price: 15000,
    category: "Vêtements Femme",
    description: "Sublimez votre style avec cet ensemble deux pièces élégant. Composé d'une tunique fluide et d'un pantalon large assorti, cet ensemble arbore des motifs ethniques modernes.",
    mainImage: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=1000",
    stock: 30,
    isBestseller: true
  },
  {
    name: "Robe Longue en Broderie Blanche",
    price: 20000,
    category: "Vêtements Femme",
    description: "Élégante et intemporelle, cette robe longue en broderie anglaise blanche est une pièce maîtresse. Ses manches évasées à volants apportent une touche romantique.",
    mainImage: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=1000",
    stock: 20
  },
  {
    name: "Kaftan Turquoise Géométrique",
    price: 20000,
    category: "Vêtements Femme",
    description: "Magnifique kaftan turquoise orné de motifs géométriques blancs. Sa coupe généreuse et fluide offre un confort absolu tout en garantissant un style sophistiqué.",
    mainImage: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=1000",
    stock: 25
  },
  {
    name: "Robe de Soirée Or Métallique",
    price: 40000,
    category: "Vêtements Femme",
    description: "Somptueuse robe de soirée plissée au fini or métallique. Une pièce d'exception pour vos soirées de gala et moments inoubliables.",
    mainImage: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=1000",
    stock: 15,
    isBestseller: true
  },
  {
    name: "Robe de Cérémonie Dentelle Fleurie",
    price: 80000,
    category: "Vêtements Femme",
    description: "Haute couture pour vos moments précieux. Cette robe de cérémonie longue est confectionnée dans une dentelle précieuse aux motifs floraux délicats.",
    mainImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000",
    stock: 10
  },
  {
    name: "Chemise Sun Glow",
    price: 15000,
    category: "Vêtements Femme",
    description: "Motifs verticaux vibrants en rose et orange. Confectionnée dans un tissu léger et respirant, elle est parfaite pour un style décontracté mais chic.",
    mainImage: "https://images.unsplash.com/photo-1598033129183-c4f50c717658?auto=format&fit=crop&q=80&w=1000",
    stock: 40
  },
  {
    name: "Boubou Lace Divine Blanc",
    price: 25000,
    category: "Vêtements Femme",
    description: "Pureté et élégance. Entièrement conçu dans une dentelle blanche de haute qualité. Sa légèreté vous assure une élégance sans effort.",
    mainImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000",
    stock: 20
  },
  {
    name: "Ensemble Silk Elegance Taupe",
    price: 25000,
    category: "Vêtements Femme",
    description: "Soie satinée fluide de couleur taupe, cet ensemble se distingue par ses manches plissées uniques. Sophistication moderne garantie.",
    mainImage: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=1000",
    stock: 15
  },
  {
    name: "Shay Oud",
    price: 15000,
    category: "Parfums",
    description: "Intensité et mystère de l'Orient. Fragrance boisée et chaleureuse concentrée dans un flacon de poche élégant.",
    mainImage: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000",
    stock: 50,
    isBestseller: true
  },
  {
    name: "Green Apple",
    price: 15000,
    category: "Parfums",
    description: "Explosion de fraîcheur acidulée. Ses notes fruitées et pétillantes apportent dynamisme et légèreté.",
    mainImage: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=1000",
    stock: 50
  },
  {
    name: "Coffret Zaara Elixir (+ Huile)",
    price: 15000,
    category: "Parfums",
    description: "Le duo parfait pour une tenue longue durée. Ce coffret comprend votre Eau de Parfum de 50ml accompagnée de son huile de parfum concentrée.",
    mainImage: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&q=80&w=1000",
    stock: 30
  },
  {
    name: "Coffret White Oud (+ Huile)",
    price: 15000,
    category: "Parfums",
    description: "Duo White Oud et son huile de parfum. Une fragrance pure et sophistiquée pour un sillage inoubliable.",
    mainImage: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1000",
    stock: 30
  },
  {
    name: "Coffret Oud Madawi (+ Huile)",
    price: 15000,
    category: "Parfums",
    description: "Le luxe du Oud Madawi en coffret avec son huile. Intensité et raffinement dans chaque goutte.",
    mainImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000",
    stock: 30
  }
];

const mongoose = require('mongoose');
require('dotenv').config({ path: 'backend/.env' });
const Product = require('./backend/models/Product');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Product.deleteMany({});
    console.log('Cleared existing products');
    const result = await Product.create(products);
    console.log(`Inserted ${result.length} products`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
