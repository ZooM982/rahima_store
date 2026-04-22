import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Bestsellers from '../components/home/Bestsellers';
import About from '../components/home/About';
import Testimonials from '../components/home/Testimonials';
import productService from '../services/productService';
import SEO, { organizationSchema, webSiteSchema, storeSchema } from '../components/SEO';

const Home = () => {
  const { addToCart } = useCart();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetchProducts = async () => {
      try {
        const { data } = await productService.getProducts();
        if (!ignore && Array.isArray(data)) {
          setAllProducts(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchProducts();
    return () => { ignore = true; };
  }, []);

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
        {!loading && products.length > 0 && (
          <Bestsellers products={products} onAddToCart={addToCart} newProductIds={newProductIds} />
        )}
      </div>
      <About />
      <Testimonials />
    </main>
  );
};

export default Home;
