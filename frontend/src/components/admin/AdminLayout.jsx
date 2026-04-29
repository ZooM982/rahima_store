import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, Search, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo2.png';
import { subscribeToPushNotifications } from '../../services/pushNotification';
import userService from '../../services/userService';
import { CheckCheck, ShoppingBag, AlertTriangle } from 'lucide-react';
// Custom time-ago formatter to avoid dependency issues
const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return "À l'instant";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `Il y a ${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Il y a ${days}j`;
};

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('admin_sidebar_open');
    return saved !== null ? JSON.parse(saved) : window.innerWidth >= 1024;
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Persist sidebar state
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('admin_sidebar_open', JSON.stringify(isSidebarOpen));
    }
  }, [isSidebarOpen, isMobile]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const fetchNotifications = useCallback(async (isMounted = true) => {
    try {
      const { data } = await userService.getNotifications();
      if (isMounted && Array.isArray(data)) {
        setNotifications(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (user && user.role === 'admin') {
      subscribeToPushNotifications();
      // Defer the fetch to the next tick to avoid cascading render warnings
      setTimeout(() => fetchNotifications(isMounted), 0);
      
      const interval = setInterval(() => fetchNotifications(isMounted), 60000);
      return () => {
        isMounted = false;
        clearInterval(interval);
      };
    }
  }, [user, fetchNotifications]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    if ('setAppBadge' in navigator) {
      if (unreadCount > 0) {
        navigator.setAppBadge(unreadCount).catch(console.error);
      } else {
        navigator.clearAppBadge().catch(console.error);
      }
    }
  }, [unreadCount]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        const saved = localStorage.getItem('admin_sidebar_open');
        setSidebarOpen(saved !== null ? JSON.parse(saved) : true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white flex">
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
        <header className="bg-[#080808] border-b border-white/5 h-16 sticky top-0 z-30 px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isMobile && (
              <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 bg-white/5 text-gray-400 rounded-xl hover:text-primary transition-colors"
              >
                <Menu size={18} />
              </button>
            )}
            <div className="flex items-center gap-2 md:hidden">
              <img src={logo} alt="" className="w-8 h-8 rounded-lg object-cover" />
              <div className="text-lg font-serif italic text-primary font-bold">Rahima Admin</div>
            </div>
            <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 focus-within:border-primary/30 transition-colors">
              <Search size={16} className="text-gray-400" />
              <input type="text" placeholder="Rechercher..." className="bg-transparent outline-none text-xs w-48 lg:w-64 text-white placeholder:text-gray-600" />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-xl transition-all ${showNotifications ? 'bg-primary text-black' : 'text-gray-400 hover:text-primary hover:bg-white/5'}`}
                title="Notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-black animate-pulse">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 md:right-[-80px] md:right-0 mt-2 w-80 md:w-96 bg-[#0a0a0a] rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50 animate-fade-in">
                  <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                    <h3 className="font-bold text-sm text-white">Notifications</h3>
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
                      <div className="p-10 text-center text-gray-500">
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
                            
                            // Navigate based on type and relatedId
                            if (n.type === 'ORDER' && n.relatedId && n.relatedId !== 'users') {
                              navigate(`/admin/orders/${n.relatedId}`);
                            } else if (n.type === 'USER' || n.relatedId === 'users') {
                              navigate(`/admin/users`);
                            } else if (n.type === 'SYSTEM') {
                              if (n.message?.includes('produit')) {
                                navigate('/admin/products');
                              } else {
                                navigate('/admin/settings');
                              }
                            }
                          }}
                          className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors flex gap-4 ${!n.isRead ? 'bg-primary/5' : ''}`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            n.type === 'ORDER' ? 'bg-green-500/20 text-green-500' : 
                            n.type === 'SYSTEM' ? 'bg-primary/20 text-primary' : 'bg-blue-500/20 text-blue-500'
                          }`}>
                            {n.type === 'ORDER' ? <ShoppingBag size={18} /> : <AlertTriangle size={18} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-bold truncate ${!n.isRead ? 'text-white' : 'text-gray-300'}`}>{n.title}</p>
                            <p className="text-[11px] text-gray-400 line-clamp-2 mt-0.5 leading-relaxed">{n.message}</p>
                            <p className="text-[10px] text-gray-500 mt-1">
                              {formatTimeAgo(n.createdAt)}
                            </p>
                          </div>
                          {!n.isRead && (
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="p-3 border-t border-white/5 text-center bg-white/5">
                    <button 
                      onClick={() => {
                        subscribeToPushNotifications();
                        alert("Votre navigateur a été réenregistré pour les notifications Push !");
                      }}
                      className="text-[10px] text-gray-500 hover:text-primary transition-colors flex items-center justify-center gap-1 mx-auto"
                    >
                      <CheckCheck size={12} /> Sync Push Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
            
            <div className="relative">
              <div 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-bold uppercase tracking-tighter text-white">{user?.name}</p>
                  <p className="text-[9px] text-gray-400 font-medium">Administrateur</p>
                </div>
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-black font-bold shadow-sm group-hover:scale-105 transition-transform">
                  <User size={16} />
                </div>
              </div>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0a0a0a] rounded-2xl shadow-xl border border-white/10 py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-white/5 mb-1 lg:hidden">
                    <p className="text-xs font-bold truncate text-white">{user?.name}</p>
                    <p className="text-[10px] text-gray-400 capitalize">{user?.role}</p>
                  </div>
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors font-medium"
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
