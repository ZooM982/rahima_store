import React from 'react';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import DecorativePictogram from '../ui/DecorativePictogram';

const Features = () => {
  const features = [
    { 
      icon: <ShieldCheck size={24} />, 
      title: "Qualité Supérieure", 
      desc: "Testé & Approuvé"
    },
    { 
      icon: <Truck size={24} />, 
      title: "Livraison Dakar", 
      desc: "Gratuite dès 50k"
    },
    { 
      icon: <RotateCcw size={24} />, 
      title: "Satisfait ou Remboursé", 
      desc: "Sous 14 jours"
    }
  ];

  return (
    <section className="bg-black py-12 md:py-24 border-t border-white/5 mt-10 relative overflow-hidden">
      <DecorativePictogram className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.12]" size="w-[600px] h-[600px]" />
      <div className="custom-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-6 group border p-2 rounded-[20px]">
              <div className="w-16 h-16 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-primary/20 transition-all duration-500">
                <div className="text-primary">{f.icon}</div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-white leading-tight font-sans">
                  {f.title}
                </h2>
                <p className="text-[13px] text-white/40 font-medium mt-1 uppercase tracking-wider italic">
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
