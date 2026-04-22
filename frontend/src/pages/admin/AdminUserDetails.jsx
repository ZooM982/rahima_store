import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import userService from '../../services/userService';
import { 
  Mail, Phone, MapPin, Calendar, Loader2, ArrowLeft, 
  ShoppingBag, CreditCard, Clock, CheckCircle, Package
} from 'lucide-react';

const AdminUserDetails = () => {
  const { email } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: customerData } = await userService.getCustomerDetails(email);
        setData(customerData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [email]);

  if (loading) return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center p-20 text-gray-400">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p>Chargement du profil client...</p>
      </div>
    </AdminLayout>
  );

  if (!data) return (
    <AdminLayout>
      <div className="p-20 text-center">
        <h2 className="text-2xl font-serif mb-4">Client introuvable</h2>
        <Link to="/admin/users" className="text-primary hover:underline">Retour à la liste</Link>
      </div>
    </AdminLayout>
  );

  const { customer, orders, stats } = data;

  return (
    <AdminLayout>
      <header className="mb-8">
        <Link to="/admin/users" className="text-xs font-bold text-gray-400 hover:text-primary flex items-center gap-1 mb-2">
          <ArrowLeft size={14} /> Retour à la liste
        </Link>
        <h1 className="text-3xl font-serif">Détails Client</h1>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Customer Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-24 h-24 rounded-3xl bg-bg-soft text-primary flex items-center justify-center text-3xl font-bold mb-4 shadow-sm border border-gray-100">
                {customer.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-gray-800">{customer.name}</h2>
              {customer.isGuest && (
                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full mt-2 font-bold uppercase tracking-widest">Compte Invité</span>
              )}
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <Mail size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Email</p>
                  <p className="text-sm font-medium truncate">{customer.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Téléphone</p>
                  <p className="text-sm font-medium">{customer.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Adresse</p>
                  <p className="text-sm font-medium leading-relaxed">{customer.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary p-8 rounded-3xl text-white shadow-xl shadow-primary/20">
            <h3 className="text-sm font-bold opacity-70 uppercase tracking-widest mb-6">Résumé de l'activité</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-2xl">
                <ShoppingBag className="mb-2 opacity-70" size={20} />
                <p className="text-2xl font-bold">{stats.orderCount}</p>
                <p className="text-[10px] opacity-70 uppercase">Commandes</p>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl">
                <CreditCard className="mb-2 opacity-70" size={20} />
                <p className="text-xl font-bold">{stats.totalSpent.toLocaleString()} <span className='text-[10px]'>F</span></p>
                <p className="text-[10px] opacity-70 uppercase">Dépensé</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="font-bold text-lg">Historique des Commandes</h2>
              <span className="text-xs text-gray-400">{orders.length} commandes trouvées</span>
            </div>
            
            <div className="divide-y divide-gray-50">
              {orders.map((order) => (
                <Link 
                  key={order._id} 
                  to={`/admin/orders/${order._id}`}
                  className="block p-6 hover:bg-gray-50/80 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-bg-soft flex items-center justify-center text-primary group-hover:bg-white transition-colors shadow-sm">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Commande #{order._id.slice(-6).toUpperCase()}</p>
                        <p className="text-[10px] text-gray-400 flex items-center gap-1 uppercase tracking-widest font-bold">
                          <Calendar size={10} /> {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      order.status === 'DELIVERED' ? 'bg-green-50 text-green-600 border-green-100' : 
                      order.status === 'CANCELLED' ? 'bg-red-50 text-red-600 border-red-100' : 
                      'bg-orange-50 text-orange-600 border-orange-100'
                    }`}>
                      {order.status === 'PENDING' ? 'En attente' : 
                       order.status === 'PROCESSING' ? 'Préparation' :
                       order.status === 'SHIPPED' ? 'Expédié' :
                       order.status === 'DELIVERED' ? 'Livré' : 'Annulé'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="w-8 h-8 rounded-lg border-2 border-white overflow-hidden shadow-sm bg-gray-100">
                          <img 
                            src={item.productId?.mainImage || item.image} 
                            alt="" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-8 h-8 rounded-lg border-2 border-white bg-bg-soft flex items-center justify-center text-[10px] font-bold text-primary shadow-sm">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                    <p className="font-bold text-primary">{order.totalAmount.toLocaleString()} FCFA</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUserDetails;
