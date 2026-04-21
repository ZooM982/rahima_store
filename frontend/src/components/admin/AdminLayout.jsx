import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Menu, Search, Bell, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo.jpeg';
import { subscribeToPushNotifications } from '../../services/pushNotification';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { user } = useAuth();

  useEffect(() => {
    // Subscribe to push notifications if the user is an admin
    if (user && user.role === 'admin') {
      subscribeToPushNotifications();
    }
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Overlay for Mobile (Removed as we use BottomNav) */}

      {!isMobile && (
        <Sidebar 
          isOpen={isSidebarOpen} 
          toggle={() => setSidebarOpen(!isSidebarOpen)} 
          isMobile={isMobile} 
        />
      )}

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${!isMobile && (isSidebarOpen ? 'ml-[200px]' : 'ml-16')}`}>
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 h-16 sticky top-0 z-30 px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isMobile && (
              <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 bg-bg-soft text-gray-500 rounded-xl hover:text-primary transition-colors"
              >
                <Menu size={18} />
              </button>
            )}
            <div className="flex items-center gap-2 md:hidden">
              <img src={logo} alt="" className="w-8 h-8 rounded-lg object-cover" />
              <div className="text-lg font-serif italic text-primary font-bold">Rahima Admin</div>
            </div>
            <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-100 focus-within:border-primary/30 transition-colors">
              <Search size={16} className="text-gray-400" />
              <input type="text" placeholder="Rechercher..." className="bg-transparent outline-none text-xs w-48 lg:w-64" />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="relative p-2 text-gray-400 hover:text-primary hover:bg-bg-soft rounded-xl transition-all">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full border-2 border-white"></span>
            </button>
            <div className="h-6 w-px bg-gray-100 hidden sm:block"></div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold uppercase tracking-tighter">{user?.name}</p>
                <p className="text-[9px] text-gray-400 font-medium">Administrateur</p>
              </div>
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-primary font-bold shadow-sm group-hover:scale-105 transition-transform">
                <User size={16} />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className={`p-4 w-full max-w-full overflow-x-hidden ${isMobile ? 'pb-24' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
