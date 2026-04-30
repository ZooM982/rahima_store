import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, Star, ShieldCheck, Truck, RotateCcw, Loader2, Check } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import Button from '../components/common/Button';
import DetailsSkeleton from '../components/ui/DetailsSkeleton';
import SEO from '../components/SEO';
import { buildProductSchema, buildBreadcrumbSchema } from '../utils/seoData';
import { productSlug } from '../utils/slug';
import ProductCard from '../components/ui/ProductCard'

import { useGetProductQuery } from '../store/productApi';

const ProductDetails = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  // Use RTK Query for automatic caching and re-validation
  const { data: product, isLoading: loading } = useGetProductQuery(slug);

  const handleAddToCart = () => {
    const variant = product?.variants?.[selectedVariant];
    addToCart({
      ...product,
      _id: variant ? `${product._id}-${variant.color}` : product._id,
      price: product.price,
      img: selectedImage || product.mainImage,
      selectedColor: variant?.color
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (loading) return <DetailsSkeleton />;

  if (!product) return (
    <div className="pt-40 pb-20 text-center bg-black min-h-screen">
      <h2 className="text-2xl font-serif mb-4 text-white">Produit non trouvé</h2>
      <Link to="/products" className="text-primary font-bold">Retour à la boutique</Link>
    </div>
  );

  const currentDisplayImage = selectedImage || product.mainImage;

  return (
    <div className="pt-16 pb-10 md:pt-20 md:pb-14">
      <SEO
        title={product.name}
        description={product.description || `Découvrez ${product.name} — ${product.category}. Livraison rapide à Dakar.`}
        image={product.mainImage}
        url={`/products/${productSlug(product)}`}
        type="product"
        keywords={`${product.name}, ${product.category}, cosmétiques Dakar, acheter ${product.name} Sénégal`}
        structuredData={[
          buildProductSchema(product),
          buildBreadcrumbSchema([
            { name: 'Accueil', url: '/' },
            { name: 'Boutique', url: '/products' },
            { name: product.name, url: `/products/${productSlug(product)}` },
          ]),
        ]}
      />
      <div className="custom-container">
        <Link to="/products" className="flex items-center gap-2 text-white/40 hover:text-primary mb-8 transition-colors group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Retour à la boutique
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Images Section */}
          <div className="space-y-6">
            <div className="aspect-9/16 md:aspect-square rounded-[30px] overflow-hidden bg-white/5 border border-white/10 shadow-2xl relative group">
              <img 
                src={currentDisplayImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="bg-gold-gradient text-black px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                   Incontournable
                </span>
              </div>
            </div>
            
            {/* Thumbnails / Variants */}
            <div className="flex gap-4 p-2 overflow-x-auto pb-4 scrollbar-hide">
              {/* Main Image Thumbnail */}
              <button 
                onClick={() => setSelectedImage(product.mainImage)}
                className={`w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${selectedImage === product.mainImage ? 'border-primary ring-4 ring-primary/10 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={product.mainImage} className="w-full h-full object-cover" alt="Main view" />
              </button>

              {/* Variant Thumbnails */}
              {product.variants.map((v, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    setSelectedVariant(i);
                    setSelectedImage(v.image);
                  }}
                  className={`w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all ${selectedImage === v.image ? 'border-primary ring-4 ring-primary/10 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={v.image} className="w-full h-full object-cover" alt={v.color} />
                </button>
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="animate-fade-up">
            <div className="flex items-center gap-2 mb-4 text-primary font-bold text-xs uppercase tracking-[0.2em]">
              <Star size={14} className="fill-primary" />
              <span>{product.category}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight text-white">{product.name}</h1>
            
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-serif text-primary">{product.price.toLocaleString()} FCFA</span>
              <span className="text-white/20 line-through text-lg">{(product.price * 1.2).toLocaleString()} FCFA</span>
            </div>

            <p className="text-white/60 text-lg leading-relaxed mb-10 border-l-2 border-primary/20 pl-6 italic">
              {product.description || "Une expérience sensorielle unique, formulée avec soin pour sublimer votre éclat naturel au quotidien."}
            </p>

            {/* Variant Selector Labels */}
            {product.variants.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Teinte / Couleur : <span className="text-primary">{product.variants[selectedVariant].color}</span></h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v, i) => (
                    <button 
                      key={i}
                      onClick={() => {
                        setSelectedVariant(i);
                        setSelectedImage(v.image);
                      }}
                      className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all border ${selectedVariant === i ? 'bg-primary text-black border-primary shadow-lg shadow-primary/20' : 'bg-white/5 text-white/40 border-white/10 hover:border-primary'}`}
                    >
                      {v.color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mb-12 relative">
              <Button 
                onClick={handleAddToCart}
                className={`flex-1 py-6 text-base transition-all duration-300 ${
                  isAdded ? 'bg-green-500 hover:bg-green-600 scale-95 shadow-lg shadow-green-500/30' : ''
                }`}
              >
                {isAdded ? <Check size={20} /> : <ShoppingBag size={20} />} 
                {isAdded ? 'Ajouté au panier !' : 'Ajouter au panier'}
              </Button>
            </div>
            
            {/* Toast Notification */}
            {isAdded && (
              <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl z-[100] flex items-center gap-2 animate-bounce">
                <Check size={18} />
                <span className="font-bold whitespace-nowrap text-sm">{product.name} ajouté au panier</span>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/5 text-primary rounded-2xl border border-white/5"><ShieldCheck size={20} /></div>
                <div>
                  <h4 className="text-xs font-bold font-sans uppercase text-white">Qualité Supérieure</h4>
                  <p className="text-[10px] text-white/40">Testé & Approuvé</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/5 text-primary rounded-2xl border border-white/5"><Truck size={20} /></div>
                <div>
                  <h4 className="text-xs font-bold font-sans uppercase text-white">Livraison Dakar</h4>
                  <p className="text-[10px] text-white/40">Gratuite dès 50k</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/5 text-primary rounded-2xl border border-white/5"><RotateCcw size={20} /></div>
                <div>
                  <h4 className="text-xs font-bold font-sans uppercase text-white">Satisfait ou remboursé</h4>
                  <p className="text-[10px] text-white/40">Sous 14 jours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section Produits Similaires */}
      {product.similarProducts && product.similarProducts.length > 0 && (
        <div className="custom-container mt-20 pt-20 border-t border-primary">
          <h2 className="text-3xl font-serif mb-12 text-white">Vous aimerez aussi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {product.similarProducts.map((p) => (
              <ProductCard key={p._id} product={p} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
