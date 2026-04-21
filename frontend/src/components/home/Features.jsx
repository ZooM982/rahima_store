import React from 'react';
import { Sparkles, Leaf, Zap, Heart } from 'lucide-react';

const Features = () => {
  const features = [
    { icon: <Sparkles className="w-10 h-10 text-primary" />, title: "Qualité Premium", desc: "Produits de haute performance" },
    { icon: <Leaf className="w-10 h-10 text-primary" />, title: "Éco-responsable", desc: "Ingrédients durables et bio" },
    { icon: <Zap className="w-10 h-10 text-primary" />, title: "Livraison Rapide", desc: "Chez vous en 48h chrono" },
    { icon: <Heart className="w-10 h-10 text-primary" />, title: "Service Client", desc: "À votre écoute 7j/7" }
  ];

  return (
    <section className="bg-white py-10 md:py-20">
      <div className="custom-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="text-center p-6 rounded-3xl hover:bg-bg-soft transition-all duration-300">
              <div className="flex justify-center mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
