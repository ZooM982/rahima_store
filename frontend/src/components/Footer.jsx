import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Globe, Send, Share2, Mail, MapPin, Phone } from 'lucide-react';
import logo from '../assets/pictogram-gold.svg';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToSection = (sectionId) => (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10">
      <div className="custom-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-gold-gradient p-[1px] overflow-hidden">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center p-1.5">
                  <img src={logo} alt="Rahima Store" className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>
              <span className="font-serif italic text-gold-gradient">Rahima Store</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              L'excellence de la beauté africaine et internationale. Nous sélectionnons le meilleur pour votre éclat naturel.
            </p>
            <div className="flex gap-4">
              {[Globe, Send, Share2].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-gold-gradient hover:text-black transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif italic text-lg mb-6 text-white">Navigation</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><Link to="/products" className="hover:text-primary transition-colors">Boutique</Link></li>
              <li>
                <a href="/#about" onClick={navigateToSection('about')} className="hover:text-primary transition-colors">
                  À Propos
                </a>
              </li>
              <li>
                <a href="/#testimonials" onClick={navigateToSection('testimonials')} className="hover:text-primary transition-colors">
                  Avis Clientes
                </a>
              </li>
              <li><Link to="/cart" className="hover:text-primary transition-colors">Mon Panier</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif italic text-lg mb-6 text-white">Service Client</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><Link to="/livraison-retours" className="hover:text-primary transition-colors">Livraison <span className="ampersand">&</span> Retours</Link></li>
              <li><Link to="/conditions-generales" className="hover:text-primary transition-colors">Conditions Générales</Link></li>
              <li><Link to="/politique-confidentialite" className="hover:text-primary transition-colors">Politique de Confidentialité</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif italic text-lg mb-6 text-white">Contact</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary flex-shrink-0" />
                <span>Dakar, Sénégal - Plateau, Rue Félix Faure</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span>+221 78 820 12 12 / 78 820 18 18</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span>contact@rahima.store</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/30 font-bold">
          <p>© {new Date().getFullYear()} Rahima Store. Tous droits réservés.</p>
          {/* <div className="flex gap-6">
            <Link to="/conditions-generales" className="hover:text-gray-500 transition-colors">CGV</Link>
            <Link to="/politique-confidentialite" className="hover:text-gray-500 transition-colors">Confidentialité</Link>
            <Link to="/livraison-retours" className="hover:text-gray-500 transition-colors">Livraison</Link>
          </div> */}
          <p>Made by SAM Corporate</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
