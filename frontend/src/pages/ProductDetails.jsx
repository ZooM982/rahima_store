import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, Star, ShieldCheck, Truck, RotateCcw, Loader2, Check } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import Button from '../components/common/Button';
import productService from '../services/productService';
import SEO, { buildProductSchema, buildBreadcrumbSchema } from '../components/SEO';
import { productSlug } from '../utils/slug';

const ProductDetails = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      _id: `${product._id}-${product.variants[selectedVariant]?.color || 'main'}`,
      price: product.price,
      img: currentImage,
      selectedColor: product.variants[selectedVariant]?.color
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    let ignore = false;
    const fetchProduct = async () => {
      try {
        const { data } = await productService.getProductById(slug);
        if (!ignore) {
          setProduct(data);
          if (data.variants && data.variants.length > 0) {
            setSelectedVariant(0);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchProduct();
    return () => { ignore = true; };
  }, [slug]);

  if (loading) return (
    <div className="pt-40 pb-20 flex flex-col items-center justify-center text-gray-400">
      <Loader2 className="animate-spin mb-4" size={32} />
      <p>Préparation de votre rituel beauté...</p>
    </div>
  );

  if (!product) return (
    <div className="pt-40 pb-20 text-center">
      <h2 className="text-2xl font-serif mb-4">Produit non trouvé</h2>
      <Link to="/products" className="text-primary font-bold">Retour à la boutique</Link>
    </div>
  );

  const currentImage = product.variants[selectedVariant]?.image || product.mainImage;

  return (
    <div className="pt-24 pb-14 md:pt-32 md:pb-20">
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
        <Link to="/products" className="flex items-center gap-2 text-gray-400 hover:text-primary mb-12 transition-colors group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Retour à la boutique
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Images Section */}
          <div className="space-y-6">
            <div className="aspect-square rounded-[60px] overflow-hidden bg-white shadow-2xl relative group">
              <img 
                src={currentImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm border border-white/50">
                   Incontournable
                </span>
              </div>
            </div>
            
            {/* Thumbnails / Variants */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {product.variants.map((v, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedVariant(i)}
                  className={`w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all ${selectedVariant === i ? 'border-primary ring-4 ring-primary/10 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={v.image || product.mainImage} className="w-full h-full object-cover" alt="" />
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
            
            <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">{product.name}</h1>
            
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-serif text-primary">{product.price.toLocaleString()} FCFA</span>
              <span className="text-gray-300 line-through text-lg">{(product.price * 1.2).toLocaleString()} FCFA</span>
            </div>

            <p className="text-gray-500 text-lg leading-relaxed mb-10 border-l-2 border-primary/20 pl-6 italic">
              {product.description || "Une expérience sensorielle unique, formulée avec soin pour sublimer votre éclat naturel au quotidien."}
            </p>

            {/* Variant Selector Labels */}
            {product.variants.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Teinte / Couleur : <span className="text-text-main">{product.variants[selectedVariant].color}</span></h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v, i) => (
                    <button 
                      key={i}
                      onClick={() => setSelectedVariant(i)}
                      className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all border ${selectedVariant === i ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-gray-400 border-gray-100 hover:border-primary'}`}
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
                <span className="font-bold text-sm">{product.name} ajouté au panier</span>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><ShieldCheck size={20} /></div>
                <div>
                  <h4 className="text-xs font-bold font-sans uppercase">Qualité Supérieure</h4>
                  <p className="text-[10px] text-gray-400">Testé & Approuvé</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Truck size={20} /></div>
                <div>
                  <h4 className="text-xs font-bold font-sans uppercase">Livraison Dakar</h4>
                  <p className="text-[10px] text-gray-400">Gratuite dès 50k</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl"><RotateCcw size={20} /></div>
                <div>
                  <h4 className="text-xs font-bold font-sans uppercase">Satisfait ou remboursé</h4>
                  <p className="text-[10px] text-gray-400">Sous 14 jours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
