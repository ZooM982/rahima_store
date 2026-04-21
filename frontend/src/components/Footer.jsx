import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Send, Share2, Mail, MapPin, Phone } from 'lucide-react';
import logo from '../assets/logo.jpeg';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-50 pt-20 pb-10">
      <div className="custom-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
              <img src={logo} alt="Rahima Store" className="w-10 h-10 object-cover rounded-full border border-gray-100 shadow-sm" />
              <span className="font-serif italic text-primary">Rahima Store</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              L'excellence de la beauté africaine et internationale. Nous sélectionnons le meilleur pour votre éclat naturel.
            </p>
            <div className="flex gap-4">
              {[Globe, Send, Share2].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-bg-soft flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif italic text-lg mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/products" className="hover:text-primary transition-colors">Boutique</Link></li>
              <li><a href="/#about" className="hover:text-primary transition-colors">À Propos</a></li>
              <li><a href="/#testimonials" className="hover:text-primary transition-colors">Avis Clientes</a></li>
              <li><Link to="/cart" className="hover:text-primary transition-colors">Mon Panier</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif italic text-lg mb-6">Service Client</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Livraison & Retours</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Conditions Générales</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Politique de Confidentialité</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif italic text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary flex-shrink-0" />
                <span>Dakar, Sénégal - Plateau, Rue Félix Faure</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span>+221 33 800 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span>contact@rahima-store.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-gray-300 font-bold">
          <p>© {new Date().getFullYear()} Rahima Store. Tous droits réservés.</p>
          <p>Made by SAM Corporate</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
