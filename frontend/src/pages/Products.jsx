import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/ui/ProductCard';
import SectionHeader from '../components/ui/SectionHeader';
import { Filter, Loader2 } from 'lucide-react';
import productService from '../services/productService';

const Products = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetchProducts = async () => {
      try {
        const { data } = await productService.getProducts();
        if (!ignore && Array.isArray(data)) setAllProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchProducts();
    return () => { ignore = true; };
  }, []);

  const safeProducts = Array.isArray(allProducts) ? allProducts : [];
  const categories = ['Tous', ...new Set(safeProducts.map(p => p.category))];

  const filteredProducts = activeCategory === 'Tous' 
    ? safeProducts 
    : safeProducts.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 pb-14 md:pt-32 md:pb-20 custom-container">
      <SectionHeader subtitle="Notre Catalogue" title="Tous les produits" />
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 mb-16 items-center">
        <Filter size={20} className="text-primary mr-2" />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
              activeCategory === cat 
              ? 'bg-primary text-white border-primary shadow-lg' 
              : 'bg-white text-gray-400 border-gray-100 hover:border-primary hover:text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 text-gray-400 min-h-[400px]">
          <Loader2 className="animate-spin mb-4" size={32} />
          <p>Chargement de votre univers beauté...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((p, i) => (
            <ProductCard key={i} product={p} onAddToCart={addToCart} />
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-20 bg-white rounded-[40px]">
          <p className="text-xl text-gray-400">Aucun produit trouvé dans cette catégorie.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
