import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import ProductCard from '../ui/ProductCard';
import { Link } from 'react-router-dom';

const Bestsellers = ({ products, onAddToCart, newProductIds = new Set() }) => {
  return (
    <section id="products" className="py-14 md:py-24">
      <div className="custom-container">
        <SectionHeader subtitle="Nos Incontournables" title="Les Bestsellers" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <ProductCard key={i} product={p} onAddToCart={onAddToCart} isNew={newProductIds.has(p._id)} />
          ))}
        </div>
        <div className="flex justify-center mt-10">
        <Link to="/products">
          <button className="btn-primary">Voir tous les produits</button>
        </Link>
      </div>
      </div>
    </section>
  );
};

export default Bestsellers;
