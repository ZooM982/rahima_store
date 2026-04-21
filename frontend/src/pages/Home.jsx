import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Bestsellers from '../components/home/Bestsellers';
import About from '../components/home/About';
import Testimonials from '../components/home/Testimonials';
import productService from '../services/productService';

const Home = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetchProducts = async () => {
      try {
        const { data } = await productService.getProducts();
        if (!ignore && Array.isArray(data)) {
          setProducts(data.slice(0, 4)); // Show first 4 as bestsellers
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

  return (
    <main>
      <Hero />
      <Features />
      {!loading && products.length > 0 && (
        <Bestsellers products={products} onAddToCart={addToCart} />
      )}
      <About />
      <Testimonials />
    </main>
  );
};

export default Home;
