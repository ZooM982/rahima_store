import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/ui/ProductCard';
import ProductSkeleton from '../components/ui/ProductSkeleton';
import SectionHeader from '../components/ui/SectionHeader';
import { Filter, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { buildBreadcrumbSchema } from '../utils/seoData';
import { useGetProductsQuery } from '../store/productApi';

const Products = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState(sessionStorage.getItem('catalog-category') || 'Tous');
  const [visibleCount, setVisibleCount] = useState(parseInt(sessionStorage.getItem('catalog-visible-count')) || 30);
  const loaderRef = useRef(null);

  // Use RTK Query with caching and optimized re-fetching
  const { data: allProducts = [], isLoading: loading, isSuccess } = useGetProductsQuery();

  // Restore scroll position when products are loaded
  useEffect(() => {
    if (isSuccess && allProducts.length > 0) {
      const savedScroll = sessionStorage.getItem('catalog-scroll');
      if (savedScroll) {
        const timeoutId = setTimeout(() => {
          window.scrollTo(0, parseInt(savedScroll));
          sessionStorage.removeItem('catalog-scroll');
        }, 100);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [isSuccess, allProducts]);

  // Save state on change
  useEffect(() => {
    sessionStorage.setItem('catalog-category', activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    sessionStorage.setItem('catalog-visible-count', visibleCount);
  }, [visibleCount]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setVisibleCount(prev => prev + 20);
      }
    }, { threshold: 1.0 });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  const handleProductClick = () => {
    sessionStorage.setItem('catalog-scroll', window.scrollY);
  };

  const safeProducts = Array.isArray(allProducts) ? allProducts : [];
  const categories = ['Tous', ...new Set(safeProducts.map(p => p.category))];

  // IDs of the 20 most recently added products
  const newProductIds = new Set(
    [...safeProducts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 20)
      .map(p => p._id)
  );

  const filteredProducts = activeCategory === 'Tous'
    ? safeProducts
    : safeProducts.filter(p => p.category === activeCategory);

  const paginatedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="pt-16 pb-10 md:pt-20 md:pb-14 custom-container">
      <SEO
        title="Boutique — Cosmétiques et Soins Beauté"
        description="Découvrez toute notre collection de cosmétiques, soins visage, cheveux et parfums. Livraison rapide à Dakar et partout au Sénégal."
        url="/products"
        keywords="acheter cosmétiques Dakar, boutique beauté sénégal, soins visage naturels, parfums africains, produits capillaires Dakar"
        structuredData={buildBreadcrumbSchema([
          { name: 'Accueil', url: '/' },
          { name: 'Boutique', url: '/products' },
        ])}
      />
      <SectionHeader subtitle="Notre Catalogue" title="Tous les produits" />
      
      <div className="flex items-center gap-4 mb-8 overflow-x-auto no-scrollbar pb-4 md:flex-wrap md:overflow-visible">
        <div className="p-2 bg-white/5 text-primary rounded-xl shrink-0 border border-white/10">
          <Filter size={18} />
        </div>
        <div className="flex gap-3 flex-nowrap md:flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
                activeCategory === cat 
                ? 'bg-primary text-black border-primary shadow-md shadow-primary/20' 
                : 'bg-white/5 text-white/40 border-white/10 hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading ? (
          Array(8).fill(0).map((_, i) => (
            <ProductSkeleton key={i} />
          ))
        ) : (
          paginatedProducts.map((p) => (
            <div key={p._id} onClick={handleProductClick}>
              <ProductCard product={p} onAddToCart={addToCart} isNew={newProductIds.has(p._id)} />
            </div>
          ))
        )}
      </div>



      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-20 bg-white/5 rounded-[40px] border border-white/10">
          <p className="text-xl text-white/40 font-serif">Aucun produit trouvé dans cette catégorie.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
