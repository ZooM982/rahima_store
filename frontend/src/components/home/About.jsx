import React from 'react';
import Button from '../common/Button';
import aboutimg from "../../assets/about.png"
const About = () => {
  return (
    <section id="about" className="bg-black overflow-hidden relative py-14 md:py-32">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold-gradient opacity-5 blur-[120px] -z-10"></div>
      
      {/* Floral Element */}
      <div className="absolute -bottom-16 -right-10 w-[500px] h-[500px] opacity-15 pointer-events-none z-0">
        <img src="/flowers-bg.png" alt="" className="w-full h-full object-contain rotate-90 scale-125 mix-blend-lighten" />
      </div>
      
      <div className="custom-container grid md:grid-cols-2 gap-20 items-center">
        <div className="relative h-[400px] md:h-[500px] animate-fade-up">
          <div className="relative h-full w-full rounded-tr-[120px] rounded-bl-[120px] overflow-hidden border border-white/10 shadow-2xl">
            <img src={aboutimg} alt="Founder" className="w-full h-full object-cover grayscale hover:grayscale-0 " />
            <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-1000"></div>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-primary/20 rounded-full hidden md:block animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-gold-gradient opacity-10 blur-3xl rounded-full -z-10"></div>
        </div>
        <div>
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Notre Essence</span>
          <h2 className="text-4xl md:text-6xl mb-8 font-serif text-white">L&rsquo;histoire de <span className="italic text-gold-gradient px-2">Rahima</span></h2>
          <p className="text-white text-lg leading-relaxed mb-10">
            Rahima Store est née d&rsquo;une passion pour la beauté authentique et naturelle. Nous croyons que chaque femme possède un éclat unique qui ne demande qu&rsquo;à être révélé par des soins d&rsquo;exception.
            <br /><br />
            Notre mission est de fusionner les rituels ancestraux et l&rsquo;innovation moderne pour offrir une expérience sensorielle inégalée.
          </p>
          <Button className='mx-auto md:mx-0' variant="secondary">Lire notre manifeste</Button>
        </div>
      </div>
    </section>
  );
};

export default About;
