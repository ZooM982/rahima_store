import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Search, User, LayoutDashboard, ShoppingCart, Users, Settings } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const MobileBottomNav = () => {
  const location = useLocation();
  const { user, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const isAdminPage = location.pathname.startsWith('/admin');

  const isActive = (path) => location.pathname === path;

  // Bottom Nav for Admin
  if (isAdminPage) {
    const adminLinks = [
      { icon: LayoutDashboard, label: "Stats", path: "/admin" },
      { icon: ShoppingBag, label: "Produits", path: "/admin/products" },
      { icon: ShoppingCart, label: "Commandes", path: "/admin/orders" },
      { icon: Users, label: "Clients", path: "/admin/users" },
      { icon: Settings, label: "Réglages", path: "/admin/settings" },
    ];

    return (
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-4 py-3 z-50 flex justify-between items-center shadow-[0_-10px_30px_rgba(0,0,0,0.05)] rounded-t-[30px]">
        {adminLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.path);
          return (
            <Link key={link.path} to={link.path} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-primary scale-110' : 'text-gray-400'}`}>
              <Icon size={18} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[9px] font-bold uppercase tracking-tighter">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    );
  }

  // Bottom Nav for Client
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-3 z-50 flex justify-between items-center shadow-[0_-10px_30px_rgba(0,0,0,0.05)] rounded-t-[30px]">
      <Link to="/" className={`flex flex-col items-center gap-1 transition-all ${isActive('/') ? 'text-primary scale-110' : 'text-gray-400'}`}>
        <Home size={20} strokeWidth={isActive('/') ? 2.5 : 2} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Accueil</span>
      </Link>

      <Link to="/products" className={`flex flex-col items-center gap-1 transition-all ${isActive('/products') ? 'text-primary scale-110' : 'text-gray-400'}`}>
        <Search size={20} strokeWidth={isActive('/products') ? 2.5 : 2} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Boutique</span>
      </Link>

      <Link to="/cart" className={`flex flex-col items-center gap-1 relative transition-all ${isActive('/cart') ? 'text-primary scale-110' : 'text-gray-400'}`}>
        <ShoppingBag size={20} strokeWidth={isActive('/cart') ? 2.5 : 2} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-bounce">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] font-bold uppercase tracking-widest">Panier</span>
      </Link>

      {isAdmin ? (
        <Link to="/admin" className={`flex flex-col items-center gap-1 transition-all ${location.pathname.startsWith('/admin') ? 'text-primary scale-110' : 'text-gray-400'}`}>
          <LayoutDashboard size={20} strokeWidth={location.pathname.startsWith('/admin') ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Admin</span>
        </Link>
      ) : (
        <Link to={user ? "/profile" : "/login"} className={`flex flex-col items-center gap-1 transition-all ${isActive('/login') || isActive('/profile') ? 'text-primary scale-110' : 'text-gray-400'}`}>
          <User size={20} strokeWidth={isActive('/login') || isActive('/profile') ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-widest">{user ? 'Compte' : 'Connexion'}</span>
        </Link>
      )}
    </nav>
  );
};

export default MobileBottomNav;
