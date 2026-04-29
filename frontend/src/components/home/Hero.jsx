import React from 'react';
import Button from '../common/Button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-20 bg-black">
      {/* Floral Background Elements */}
      <div className="absolute top-20 -left-20 w-[500px] h-[500px] opacity-50 pointer-events-none z-0 animate-pulse-slow">
        <img src="/flowers-bg.png" alt="" className="w-full h-full object-contain rotate-45 mix-blend-lighten" />
      </div>
      <div className="absolute -bottom-40 -right-20 w-[700px] h-[700px] hidden md:block opacity-30 pointer-events-none z-0">
        <img src="/flowers-bg.png" alt="" className="w-full h-full object-contain -rotate-12 blur-[1px] mix-blend-lighten" />
      </div>

      <div className="custom-container grid md:grid-cols-2 gap-10 items-center relative z-10">
        <div className="animate-fade-up">
          <span className="inline-block text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">Cosmétique de Luxe</span>
          <h1 className="text-4xl md:text-7xl leading-[1.1] mb-8 font-serif text-white">Révélez votre <span className="italic text-gold-gradient px-2">éclat</span> naturel</h1>
          <p className="text-lg text-white/60 mb-10 max-w-md leading-relaxed">
            Découvrez notre collection exclusive de soins et maquillage conçue pour sublimer votre beauté unique avec des ingrédients précieux.
          </p>
          <div className="flex gap-4 ">
            <a href="/products">
              <Button className="whitespace-nowrap hidden md:flex">Découvrir la gamme</Button>
              <Button className="whitespace-nowrap md:hidden flex">Notre gamme</Button>
            </a>
            <a href="/#products">
              <Button variant="secondary" className="whitespace-nowrap">Nos Bestsellers</Button>
            </a>
          </div>
        </div>
        
        <div className="relative h-[300px] md:h-[500px] animate-scale">
          <div className="absolute -inset-4 bg-gold-gradient opacity-20 blur-2xl rounded-[40px] rotate-3 -z-10"></div>
          <div className="relative h-full w-full rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(232,170,24,0.15)] border border-white/10">
            <img 
              src="/hero.png" 
              alt="Rahima Store" 
              className="w-full h-full object-cover scale-105 grayscale hover:grayscale-0 hover:scale-100 transition-transform duration-700" 
              fetchpriority="high"
              loading="eager"
              width="600"
              height="500"
            />
          </div>
          <div className="absolute -bottom-8 left-0 md:-left-8 glass-effect p-5 rounded-2xl shadow-2xl border border-white/10 max-w-[200px] animate-fade">
            <p className="text-sm font-bold text-gold-gradient mb-1">100% Naturel</p>
            <p className="text-xs text-white/50">Des ingrédients sélectionnés pour votre peau.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
