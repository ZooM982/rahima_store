import React from 'react';
import Button from '../common/Button';

const About = () => {
  return (
    <section id="about" className="bg-text-main text-white overflow-hidden relative py-14 md:py-32">
      <div className="custom-container grid md:grid-cols-2 gap-20 items-center">
        <div className="relative h-[400px] md:h-[500px]">
          <div className="relative h-full w-full rounded-tr-[100px] rounded-bl-[100px] overflow-hidden">
            <img src="/hero.png" alt="Founder" className="w-full h-full object-cover opacity-80" />
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-secondary rounded-full hidden md:block"></div>
        </div>
        <div>
          <h2 className="text-5xl mb-8 font-serif">L'histoire de <span className="italic text-secondary font-serif">Rahima</span></h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Rahima Store est née d'une passion pour la beauté authentique et naturelle. Nous croyons que chaque femme possède un éclat unique qui ne demande qu'à être révélé par des soins d'exception.
          </p>
          <Button variant="secondary" className="border-secondary text-secondary hover:bg-secondary hover:text-white">Lire notre manifeste</Button>
        </div>
      </div>
    </section>
  );
};

export default About;
