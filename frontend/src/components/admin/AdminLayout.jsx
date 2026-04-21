import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Menu, Search, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo.jpeg';
import { subscribeToPushNotifications } from '../../services/pushNotification';
import userService from '../../services/userService';
import { CheckCheck, Package, ShoppingBag, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale/fr';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user, logout } = useAuth();

  const fetchNotifications = async () => {
    try {
      const { data } = await userService.getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Subscribe to push notifications if the user is an admin
    if (user && user.role === 'admin') {
      subscribeToPushNotifications();
      fetchNotifications();
      // Poll for new notifications every minute
      const interval = setInterval(fetchNotifications, 60000);
      return () => clearInterval(interval);
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
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-xl transition-all ${showNotifications ? 'bg-primary text-white' : 'text-gray-400 hover:text-primary hover:bg-bg-soft'}`}
                title="Notifications"
              >
                <Bell size={18} />
                {notifications.some(n => !n.isRead) && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-[-80px] md:right-0 mt-2 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                  <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                    <h3 className="font-bold text-sm">Notifications</h3>
                    <button 
                      onClick={async () => {
                        await userService.markAllAsRead();
                        fetchNotifications();
                      }}
                      className="text-[10px] text-primary font-bold uppercase tracking-wider hover:underline"
                    >
                      Tout lire
                    </button>
                  </div>
                  
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-10 text-center text-gray-400">
                        <Bell size={32} className="mx-auto mb-2 opacity-20" />
                        <p className="text-xs">Aucune notification pour le moment</p>
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div 
                          key={n._id}
                          onClick={async () => {
                            if (!n.isRead) {
                              await userService.markAsRead(n._id);
                              fetchNotifications();
                            }
                            setShowNotifications(false);
                          }}
                          className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors flex gap-4 ${!n.isRead ? 'bg-primary/5' : ''}`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            n.type === 'ORDER' ? 'bg-green-100 text-green-600' : 
                            n.type === 'SYSTEM' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {n.type === 'ORDER' ? <ShoppingBag size={18} /> : <AlertTriangle size={18} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-bold truncate ${!n.isRead ? 'text-gray-900' : 'text-gray-600'}`}>{n.title}</p>
                            <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">{n.message}</p>
                            <p className="text-[10px] text-gray-400 mt-1">
                              {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true, locale: fr })}
                            </p>
                          </div>
                          {!n.isRead && (
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="p-3 border-t border-gray-50 text-center bg-gray-50/50">
                    <button 
                      onClick={() => {
                        subscribeToPushNotifications();
                        alert("Votre navigateur a été réenregistré pour les notifications Push !");
                      }}
                      className="text-[10px] text-gray-400 hover:text-primary transition-colors flex items-center justify-center gap-1 mx-auto"
                    >
                      <CheckCheck size={12} /> Sync Push Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="h-6 w-px bg-gray-100 hidden sm:block"></div>
            
            <div className="relative">
              <div 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-bold uppercase tracking-tighter">{user?.name}</p>
                  <p className="text-[9px] text-gray-400 font-medium">Administrateur</p>
                </div>
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-primary font-bold shadow-sm group-hover:scale-105 transition-transform">
                  <User size={16} />
                </div>
              </div>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1 lg:hidden">
                    <p className="text-xs font-bold truncate">{user?.name}</p>
                    <p className="text-[10px] text-gray-400 capitalize">{user?.role}</p>
                  </div>
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
                  >
                    <LogOut size={16} /> Déconnexion
                  </button>
                </div>
              )}
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
