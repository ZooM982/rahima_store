import React from 'react';
import Button from '../common/Button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-20">
      <div className="custom-container grid md:grid-cols-2 gap-10 items-center relative z-10">
        <div className="animate-fade-up">
          <span className="inline-block text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4">Cosmétique de Luxe</span>
          <h1 className="text-4xl md:text-7xl leading-[1.1] mb-8 font-serif">Révélez votre <span className="italic text-secondary">éclat</span> naturel</h1>
          <p className="text-lg text-gray-600 mb-10 max-w-md leading-relaxed">
            Découvrez notre collection exclusive de soins et maquillage conçue pour sublimer votre beauté unique avec des ingrédients précieux.
          </p>
          <div className="flex gap-4 ">
            <a href="/products">
              <Button className="whitespace-nowrap hidden md:block">Découvrir la gamme</Button>
              <Button className="whitespace-nowrap md:hidden">Notre gammes</Button>
              </a>
            <a href="#products">
              <Button variant="secondary" className="whitespace-nowrap">Nos Bestsellers</Button>
            </a>
          </div>
        </div>
        
        <div className="relative h-[300px] md:h-[500px] animate-scale">
          <div className="absolute -inset-4 bg-accent rounded-[40px] rotate-3 -z-10"></div>
          <div className="relative h-full w-full rounded-[40px] overflow-hidden shadow-2xl">
            <img src="/hero.png" alt="Rahima Store" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-8 left-0 md:-left-8 glass-effect p-5 rounded-2xl shadow-xl max-w-[200px] animate-fade">
            <p className="text-sm font-bold text-primary mb-1">100% Naturel</p>
            <p className="text-xs text-gray-500">Des ingrédients sélectionnés pour votre peau.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
