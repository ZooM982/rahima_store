import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import orderService from '../services/orderService';
import Button from '../components/common/Button';
import Input from '../components/ui/Input';
import { Package, User, MapPin, Phone, LogOut, ChevronRight, Clock, ShoppingBag, FileText } from 'lucide-react';
import { generateInvoice } from '../utils/invoiceGenerator';
import { Link } from 'react-router-dom';
import { productSlug } from '../utils/slug';
import { useQuery } from '@tanstack/react-query';

const UserDashboard = () => {
  const { user, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Fetch user orders with caching
  const { data: orders = [], isLoading: loading } = useQuery({
    queryKey: ['user-orders', user?._id],
    queryFn: async () => {
      const response = await orderService.getMyOrders();
      return response.data;
    },
    enabled: !!user,
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateSuccess(false);
    try {
      await updateProfile(formData);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setUpdateLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500/10 text-green-500';
      case 'Validated': return 'bg-blue-500/10 text-blue-500';
      case 'Cancelled': return 'bg-red-500/10 text-red-500';
      default: return 'bg-yellow-500/10 text-yellow-500';
    }
  };

  return (
    <div className="pt-16 pb-20 md:pt-20 md:pb-14 custom-container">
      <div className="grid lg:grid-cols-4 gap-8">

        {/* Sidebar — desktop only */}
        <div className="hidden lg:block lg:col-span-1 space-y-4">
          <div className="bg-[#0f0f0f] p-6 rounded-[30px] shadow-sm border border-white/5">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-bold text-xl">
                {user?.name?.charAt(0)}
              </div>
              <div>
                <h2 className="font-bold leading-tight">{user?.name}</h2>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-primary text-white' : 'hover:bg-bg-soft text-gray-500'}`}
              >
                <Package size={20} />
                <span className="font-medium text-sm">Mes Commandes</span>
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-primary text-white' : 'hover:bg-bg-soft text-gray-500'}`}
              >
                <User size={20} />
                <span className="font-medium text-sm">Mon Profil</span>
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50/50 transition-all"
              >
                <LogOut size={20} />
                <span className="font-medium text-sm">Déconnexion</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'orders' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-serif text-white">Mes Commandes</h1>
                <span className="text-sm text-gray-500 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                  {orders.length} commande(s)
                </span>
              </div>

              {loading ? (
                <div className="bg-[#0f0f0f] p-20 rounded-[30px] flex flex-col items-center justify-center border border-white/5">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                  <p className="mt-4 text-gray-400">Chargement de vos commandes...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-[#0f0f0f] p-10 sm:p-20 rounded-[30px] text-center border border-white/5">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-700">
                    <Package size={40} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Aucune commande pour le moment</h3>
                  <p className="text-gray-400 mb-8">Vos futures commandes apparaîtront ici.</p>
                  <Button className="mx-auto w-fit" onClick={() => window.location.href = '/products'}>
                    Découvrir nos produits
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {orders.map(order => (
                    <div key={order._id} className="bg-[#0f0f0f] p-6 rounded-[30px] border border-white/5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-gray-50 rounded-2xl text-gray-400">
                            <Clock size={20} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Commande #{order._id.slice(-6).toUpperCase()}</p>
                            <p className="font-bold text-sm">
                              {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 overflow-x-auto pb-4 mb-4 border-b border-gray-50">
                        {order.items.slice(0, 4).map((item, idx) => (
                          <div key={idx} className="w-16 h-16 rounded-xl bg-white/5 overflow-hidden flex-shrink-0 border border-white/5">
                            {item.productId?.mainImage ? (
                              <img src={item.productId.mainImage} alt={item.productId.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">IMG</div>
                            )}
                          </div>
                        ))}
                        {order.items.length > 4 && (
                          <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 font-bold text-sm">
                            +{order.items.length - 4}
                          </div>
                        )}
                        <div className="ml-auto text-right">
                          <p className="text-xs text-gray-400">Total</p>
                          <p className="text-xl font-bold text-primary">{order.totalAmount.toLocaleString()} FCFA</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-50 grid grid-cols-2 gap-3">
                        <div className="text-left">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider">Articles</p>
                          <p className="text-sm font-bold">{order.items.length} produit(s)</p>
                        </div>
                          <div className="flex gap-4">
                            <button
                              onClick={() => generateInvoice(order)}
                              className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
                            >
                              <FileText size={16} /> Facture
                            </button>
                            <Link
                              to={order.items[0]?.productId ? `/products/${productSlug(order.items[0].productId)}` : '/products'}
                              className="flex items-center justify-end gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors group"
                            >
                              Voir produits <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <h1 className="text-3xl font-serif text-white">Mon Profil</h1>

              <div className="bg-[#0f0f0f] p-8 rounded-[30px] border border-white/5 shadow-sm">
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 flex items-center gap-2">
                        <User size={16} /> Nom complet
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Votre nom"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 flex items-center gap-2">
                        <Phone size={16} /> Téléphone
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="Votre numéro de téléphone"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 flex items-center gap-2">
                      <MapPin size={16} /> Adresse de livraison par défaut
                    </label>
                    <Input
                      textarea
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Votre adresse de livraison"
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between gap-4">
                    {updateSuccess && (
                      <span className="text-green-500 text-sm font-medium flex items-center gap-2">
                        ✓ Profil mis à jour avec succès
                      </span>
                    )}
                    <Button type="submit" className="ml-auto" disabled={updateLoading}>
                      {updateLoading ? 'Mise à jour...' : 'Enregistrer les modifications'}
                    </Button>
                  </div>
                </form>
              </div>

              <div className="bg-red-500/10 p-6 rounded-[30px] border border-red-500/20">
                <h3 className="text-red-500 font-bold mb-2">Zone de danger</h3>
                <p className="text-red-500/60 text-sm mb-4">
                  Une fois que vous supprimez votre compte, il n'y a pas de retour en arrière. S'il vous plaît soyez certain.
                </p>
                <button className="text-red-500 font-bold text-sm underline hover:text-red-400 transition-colors">
                  Supprimer mon compte
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation — lg:hidden */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/5 shadow-2xl shadow-black/10">
        <div className="flex items-center justify-around px-2 py-2">

          <Link
            to="/products"
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl text-gray-400 hover:text-primary transition-all"
          >
            <ShoppingBag size={22} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Boutique</span>
          </Link>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
              activeTab === 'orders' ? 'text-primary' : 'text-gray-400 hover:text-primary'
            }`}
          >
            <div className="relative">
              <Package size={22} />
              {orders.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[8px] rounded-full flex items-center justify-center font-bold">
                  {orders.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Commandes</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
              activeTab === 'profile' ? 'text-primary' : 'text-gray-400 hover:text-primary'
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-primary/10' : ''}`}>
              <User size={22} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Profil</span>
          </button>

          <button
            onClick={logout}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl text-red-400 hover:text-red-600 transition-all"
          >
            <LogOut size={22} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Quitter</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
