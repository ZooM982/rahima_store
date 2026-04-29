import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Bestsellers from '../components/home/Bestsellers';
import About from '../components/home/About';
import Testimonials from '../components/home/Testimonials';
import productService from '../services/productService';
import ProductSkeleton from '../components/ui/ProductSkeleton';
import SectionHeader from '../components/ui/SectionHeader';
import SEO, { organizationSchema, webSiteSchema, storeSchema } from '../components/SEO';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const { addToCart } = useCart();

  // Reuse catalog-products query to share cache
  const { data: allProducts = [], isLoading: loading } = useQuery({
    queryKey: ['catalog-products'],
    queryFn: async () => {
      const { data } = await productService.getProducts();
      return data;
    },
  });

  // 4 bestsellers to display
  const products = allProducts.slice(0, 4);

  // IDs of the 20 most recently added products
  const newProductIds = new Set(
    [...allProducts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 20)
      .map(p => p._id)
  );

  return (
    <main>
      <SEO
        url="/"
        structuredData={[organizationSchema, webSiteSchema, storeSchema]}
        keywords="cosmétiques Dakar, beauté sénégal, soins naturels africains, boutique beauté Dakar, produits cosmétiques Sénégal"
      />
      <Hero />
      <Features />
      <div id="products">
        {loading ? (
          <section className="py-14 md:py-24">
            <div className="custom-container">
              <SectionHeader subtitle="Nos Incontournables" title="Les Bestsellers" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {Array(4).fill(0).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            </div>
          </section>
        ) : products.length > 0 ? (
          <Bestsellers products={products} onAddToCart={addToCart} newProductIds={newProductIds} />
        ) : null}
      </div>
      <About />
      <Testimonials />
    </main>
  );
};

export default Home;
