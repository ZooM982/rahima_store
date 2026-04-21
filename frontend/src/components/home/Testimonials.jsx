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
    <section id="testimonials" className="py-14 md:py-32 bg-white">
      <div className="custom-container">
        <SectionHeader subtitle="Avis Clientes" title="Ce que disent nos clientes" alignment="center" />
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-bg-soft p-10 rounded-[40px] relative group hover:shadow-xl transition-all duration-500">
              <Quote className="absolute top-8 right-10 text-accent w-10 h-10 opacity-50 group-hover:scale-110 transition-transform" />
              <div className="flex gap-1 mb-6">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg text-text-main leading-relaxed mb-8 italic">"{r.text}"</p>
              <p className="font-bold text-sm uppercase tracking-widest">{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
