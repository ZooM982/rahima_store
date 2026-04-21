import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/logo.jpeg';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-effect py-4 shadow-sm' : 'py-6'}`}>
      <div className="custom-container flex justify-between items-center">
        <Link to="/" onClick={scrollToTop} className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <img src={logo} alt="Rahima Store" className="w-10 h-10 object-cover rounded-full border border-gray-100 shadow-sm" />
          <span className="font-serif italic text-primary">Rahima Store</span>
        </Link>
        
        <div className="hidden md:flex gap-10 text-sm font-medium uppercase tracking-widest mx-auto">
          <Link to="/products" className="hover:text-primary transition-colors">Boutique</Link>
          <a href="/#about" className="hover:text-primary transition-colors">À Propos</a>
          <a href="/#testimonials" className="hover:text-primary transition-colors">Avis</a>
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
