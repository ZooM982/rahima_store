import React from 'react';
import { Star, Quote } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const Testimonials = () => {
  const reviews = [
    { name: "Sarah B.", text: "Le sérum éclat est devenu un indispensable de ma routine. Ma peau n'a jamais été aussi lumineuse !", rating: 5 },
    { name: "Léa M.", text: "La palette rose gold a des pigments incroyables. Très satisfaite de la qualité des produits.", rating: 5 },
    { name: "Aminata D.", text: "Service client au top et livraison ultra rapide. Je recommande Rahima Store à 100%.", rating: 5 },
  ];

  return (
    <section id="testimonials" className="py-14 md:py-32 bg-black relative overflow-hidden">
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
      
      {/* Floral Elements */}
      <div className="absolute top-10 right-0 w-[400px] h-[400px] opacity-15 pointer-events-none z-0">
        <img src="/flowers-bg.png" alt="" className="w-full h-full object-contain -scale-x-100 mix-blend-lighten" />
      </div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] opacity-15 pointer-events-none z-0">
        <img src="/flowers-bg.png" alt="" className="w-full h-full object-contain rotate-45 mix-blend-lighten" />
      </div>
      
      <div className="custom-container">
        <SectionHeader subtitle="Avis Clientes" title="Elles nous font confiance" alignment="center" />
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="glass-effect p-10 rounded-[40px] relative group hover:border-primary/30 transition-all duration-500">
              <Quote className="absolute top-8 right-10 text-primary w-10 h-10 opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all" />
              <div className="flex gap-1 mb-6">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg text-white/80 leading-relaxed mb-8 italic font-serif">"{r.text}"</p>
              <p className="font-bold text-sm uppercase tracking-widest text-primary">{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
