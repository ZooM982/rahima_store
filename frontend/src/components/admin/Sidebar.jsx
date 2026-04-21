import React from 'react';
import logo from '../../assets/logo.jpeg';
import { 
  X, LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, toggle, isMobile }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const links = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/admin" },
    { icon: <Package size={20} />, label: "Produits", path: "/admin/products" },
    { icon: <ShoppingCart size={20} />, label: "Commandes", path: "/admin/orders" },
    { icon: <Users size={20} />, label: "Clients", path: "/admin/users" },
    { icon: <Settings size={20} />, label: "Paramètres", path: "/admin/settings" },
  ];

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-100 transition-all duration-300 transform
    ${isMobile ? (isOpen ? 'translate-x-0 w-72' : '-translate-x-full w-[200px]') : (isOpen ? 'w-[200px]' : 'w-16')}
  `;

  return (
    <aside className={sidebarClasses}>
      <div className="p-4 flex items-center justify-between h-16 border-b border-gray-50">
        {(isOpen || isMobile) ? (
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="w-8 h-8 rounded-lg object-cover" />
            <span className="font-serif italic text-primary font-bold text-sm">Rahima Admin</span>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <img src={logo} alt="" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
          </div>
        )}
        {isMobile && (
          <button onClick={toggle} className="p-2 text-gray-400 hover:text-primary"><X size={18} /></button>
        )}
      </div>

      <nav className="p-3 space-y-1 mt-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`
              flex items-center gap-3 p-2.5 rounded-xl transition-all group
              ${location.pathname === link.path ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-bg-soft hover:text-primary'}
            `}
          >
            <div className="flex-shrink-0">{link.icon}</div>
            {(isOpen || isMobile) && <span className="font-bold text-sm">{link.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-6 left-0 w-full px-4">
        <button 
          onClick={logout}
          className="flex items-center gap-4 p-3.5 text-gray-400 hover:text-red-500 hover:bg-red-50 w-full rounded-2xl transition-all"
        >
          <LogOut size={20} />
          {(isOpen || isMobile) && <span className="font-bold text-sm">Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
