import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check } from 'lucide-react';
import { productSlug } from '../../utils/slug';

const ProductCard = ({ product, onAddToCart, isNew }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart({ ...product, img: product.mainImage || product.img });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group">
      <div className="relative h-[220px] md:h-[320px] rounded-3xl overflow-hidden mb-6 bg-gray-100">
        <Link to={`/products/${productSlug(product)}`}>
          <img 
            src={product.mainImage || product.img} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors"></div>
        </Link>
        <button 
          onClick={handleAddToCart}
          className={`absolute cursor-pointer bottom-6 left-1/2 -translate-x-1/2 w-[80%] py-4 rounded-full font-bold shadow-xl hidden md:flex items-center justify-center gap-2 transition-all duration-300 ${
            isAdded 
              ? 'bg-green-500 text-white opacity-100 scale-95 translate-y-0' 
              : 'bg-white text-gray-900 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0'
          }`}
        >
          {isAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
          {isAdded ? 'Ajouté' : 'Ajouter'}
        </button>
        {isNew && (
          <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">New</div>
        )}
      </div>
      <Link to={`/products/${productSlug(product)}`}>
        <p className="text-xs text-text-muted uppercase tracking-widest mb-2">{product.category}</p>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
        <p className="font-serif text-primary italic text-lg">{product.price} FCFA</p>
      </Link>
      
      {/* Toast Notification */}
      {isAdded && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl z-[100] flex items-center gap-2 animate-bounce">
          <Check size={18} />
          <span className="font-bold text-sm">Produit ajouté au panier</span>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
