import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, FileText } from 'lucide-react';
import SEO from '../SEO';
import DecorativePictogram from '../ui/DecorativePictogram';

const LegalLayout = ({ title, lastUpdated, children }) => {
  const location = useLocation();
  return (
    <div className="pt-24 pb-20 md:pt-32 custom-container relative overflow-hidden min-h-screen">
      <DecorativePictogram className="top-40 -left-20 rotate-12 opacity-[0.02]" size="w-[600px] h-[600px]" />
      <DecorativePictogram className="bottom-0 -right-20 -rotate-45" size="w-80 h-80" />
      <SEO
        title={title}
        description={`${title} de Rahima Store. Informations légales et conditions d'utilisation pour nos clients au Sénégal.`}
        url={location.pathname}
        noIndex
      />

      <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-primary mb-10 transition-colors text-sm">
        <ChevronLeft size={18} /> Retour à l'accueil
      </Link>

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-3">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-white">{title}</h1>
            <p className="text-xs text-gray-400 mt-1">Dernière mise à jour : {lastUpdated}</p>
          </div>
        </div>

        <div className="mt-10 prose prose-sm max-w-none space-y-8 text-gray-400 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-lg font-bold text-white mb-3 pb-2 border-b border-white/5">{title}</h2>
    <div className="space-y-2">{children}</div>
  </div>
);

export { LegalLayout, Section };
