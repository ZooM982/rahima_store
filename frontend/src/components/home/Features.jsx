import React from 'react';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const Features = () => {
  const features = [
    { 
      icon: <ShieldCheck size={24} className="text-green-500" />, 
      title: "Qualité Supérieure", 
      desc: "Testé & Approuvé",
      bg: "bg-green-50"
    },
    { 
      icon: <Truck size={24} className="text-blue-500" />, 
      title: "Livraison Dakar", 
      desc: "Gratuite dès 50k",
      bg: "bg-blue-50"
    },
    { 
      icon: <RotateCcw size={24} className="text-orange-500" />, 
      title: "Satisfait ou Remboursé", 
      desc: "Sous 14 jours",
      bg: "bg-orange-50"
    }
  ];

  return (
    <section className="bg-white py-12 md:py-24 border-t border-gray-50 mt-10">
      <div className="custom-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-6 group">
              <div className={`w-16 h-16 ${f.bg} rounded-3xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                {f.icon}
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-gray-900 leading-tight font-sans">
                  {f.title}
                </h3>
                <p className="text-[13px] text-gray-400 font-medium mt-1 uppercase tracking-wider italic">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
