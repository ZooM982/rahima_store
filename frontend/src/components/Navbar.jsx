/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, LogOut, LayoutDashboard, LayoutGrid, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/pictogram-gold.svg';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navigateToSection = (sectionId) => (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navLinks = [
    { name: 'Boutique', path: '/products' },
    { name: 'À Propos', path: '/#about', section: 'about' },
    { name: 'Avis', path: '/#testimonials', section: 'testimonials' },
  ];

  return (
    <nav className={`fixed z-50 transition-all duration-500 ${scrolled ? 'glass-effect py-3 shadow-sm rounded-[30px] top-4 right-0 left-0 w-[92%] md:w-[80%] mx-auto' : 'py-4 w-full top-0 left-0'}`}>
      <div className="custom-container flex justify-between items-center">
        <Link to="/" onClick={scrollToTop} className="text-2xl font-bold flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gold-gradient p-[1px]">
            <img src={logo} alt="Rahima Store" className="w-full h-full object-contain p-2 rounded-full bg-black shadow-sm group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="font-serif italic text-gold-gradient whitespace-nowrap pr-1">Rahima Store</span>
        </Link>
        
        <div className="hidden md:flex gap-10 text-sm font-medium uppercase tracking-widest mx-auto">
          {navLinks.map((link) => (
            link.section ? (
              <a key={link.name} href={link.path} onClick={navigateToSection(link.section)} className="hover:text-primary transition-colors text-white/80">{link.name}</a>
            ) : (
              <Link key={link.name} to={link.path} className="hover:text-primary transition-colors text-white/80">{link.name}</Link>
            )
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Link to="/cart" className="relative p-2 hover:bg-white/5 rounded-full transition-colors group">
            <ShoppingBag size={22} className={cartCount > 0 ? "text-primary" : "text-white/70 group-hover:text-primary"} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-black font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center gap-1">
            {isAdmin && (
              <Link to="/admin" className="p-2 text-primary hover:bg-primary/5 rounded-full transition-all" title="Tableau de bord">
                <LayoutDashboard size={22} />
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-2 ml-1">
                <Link to="/dashboard" className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center font-bold shadow-lg shadow-primary/20">
                  {user.name?.charAt(0)?.toUpperCase()}
                </Link>
                <button onClick={logout} className="p-2 text-gray-400 hover:text-red-500 rounded-full">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="p-2 text-white/70 hover:text-primary rounded-full">
                <User size={22} />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-effect mt-4 mx-4 rounded-[30px] overflow-hidden border border-white/5"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                link.section ? (
                  <a key={link.name} href={link.path} onClick={navigateToSection(link.section)} className="text-lg font-serif italic text-white/90 border-b border-white/5 pb-2">{link.name}</a>
                ) : (
                  <Link key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)} className="text-lg font-serif italic text-white/90 border-b border-white/5 pb-2">{link.name}</Link>
                )
              ))}
              
              <div className="pt-2 flex flex-col gap-4">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-primary font-bold">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </div>
                      Mon Compte
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-white/80">
                        <LayoutDashboard size={20} /> Admin Dashboard
                      </Link>
                    )}
                    <button onClick={logout} className="flex items-center gap-3 text-red-400">
                      <LogOut size={20} /> Se déconnecter
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-primary font-bold">
                    <User size={20} /> Connexion / S'inscrire
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
