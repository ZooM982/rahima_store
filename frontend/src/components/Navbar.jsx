import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/logo2.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handles anchor-based navigation from any page
  const navigateToSection = (sectionId) => (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Already on home, just scroll
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home, then scroll after the page has rendered
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className={`fixed z-50 transition-all duration-500 ${scrolled ? 'glass-effect py-3 shadow-sm rounded-[30px] top-4 right-0 left-0 w-[80%] mx-auto' : 'py-4 w-full top-0 left-0'}`}>
      <div className="custom-container flex justify-between items-center">
        <Link to="/" onClick={scrollToTop} className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <img src={logo} alt="Rahima Store" className="w-10 h-10 object-cover rounded-full border border-gray-100 shadow-sm" />
          <span className="font-serif italic text-primary">Rahima Store</span>
        </Link>
        
        <div className="hidden md:flex gap-10 text-sm font-medium uppercase tracking-widest mx-auto">
          <Link to="/products" className="hover:text-primary transition-colors">Boutique</Link>
          <a href="/#about" onClick={navigateToSection('about')} className="hover:text-primary transition-colors">À Propos</a>
          <a href="/#testimonials" onClick={navigateToSection('testimonials')} className="hover:text-primary transition-colors">Avis</a>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link to="/cart" className="relative p-2 hover:bg-bg-soft rounded-full transition-colors">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {isAdmin && (
            <Link to="/admin" className="p-2 text-primary hover:bg-primary/5 rounded-full transition-all" title="Tableau de bord">
              <LayoutDashboard size={22} />
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-1 ml-1 pl-2">
              <Link
                to="/dashboard"
                className="flex items-center justify-center w-9 h-9 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 hover:scale-105 transition-all shadow-md shadow-primary/20"
                title="Mon Compte"
              >
                {user.name?.charAt(0)?.toUpperCase()}
              </Link>
              <div className="hidden sm:flex flex-col items-end mr-1">
                <span className="text-[10px] font-bold uppercase tracking-tighter">{user.name}</span>
                <span className="text-[9px] text-gray-400 capitalize">{user.role}</span>
              </div>
              <button 
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                title="Déconnexion"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="p-2 text-gray-400 hover:text-primary hover:bg-bg-soft rounded-full transition-all">
              <User size={22} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
