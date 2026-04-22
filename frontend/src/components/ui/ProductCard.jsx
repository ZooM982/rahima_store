import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { productSlug } from '../../utils/slug';

const ProductCard = ({ product, onAddToCart, isNew }) => {
  return (
    <div className="group">
      <div className="relative h-[250px] md:h-[350px] rounded-3xl overflow-hidden mb-6 bg-gray-100">
        <Link to={`/products/${productSlug(product)}`}>
          <img 
            src={product.mainImage || product.img} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors"></div>
        </Link>
        <button 
          onClick={() => onAddToCart({ ...product, img: product.mainImage || product.img })}
          className="absolute cursor-pointer bottom-6 left-1/2 -translate-x-1/2 w-[80%] bg-white py-4 rounded-full font-bold shadow-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center justify-center gap-2"
        >
          <ShoppingBag size={18} />
          Ajouter
        </button>
        {isNew && (
          <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">New</div>
        )}
      </div>
      <Link to={`/products/${productSlug(product)}`}>
        <p className="text-xs text-text-muted uppercase tracking-widest mb-2">{product.category}</p>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
        <p className="font-serif italic text-lg">{product.price} FCFA</p>
      </Link>
    </div>
  );
};

export default ProductCard;
