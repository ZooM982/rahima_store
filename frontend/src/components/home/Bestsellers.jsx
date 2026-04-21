import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import ProductCard from '../ui/ProductCard';

const Bestsellers = ({ products, onAddToCart }) => {
  return (
    <section id="products" className="py-14 md:py-32">
      <div className="custom-container">
        <SectionHeader subtitle="Nos Incontournables" title="Les Bestsellers" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <ProductCard key={i} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
