import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import orderService from '../../services/orderService';
import { Mail, Phone, MapPin, Calendar, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const AdminUsers = () => {
  const { data: users = [], isLoading: loading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data: orders } = await orderService.getOrders();
      
      // Extract unique customers based on email
      const customerMap = new Map();
      orders.forEach(order => {
        if (order.customer && order.customer.email) {
          // Store/Update with the latest order info
          customerMap.set(order.customer.email.toLowerCase(), {
            ...order.customer,
            lastOrder: order.createdAt
          });
        }
      });
      
      return Array.from(customerMap.values())
        .sort((a, b) => new Date(b.lastOrder) - new Date(a.lastOrder));
    },
  });

  return (
    <AdminLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-serif text-white">Gestion des Clients</h1>
        <p className="text-gray-400 text-sm">Liste des clients ayant passé commande sur la boutique.</p>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 text-gray-400">
           <Loader2 className="animate-spin mb-4" size={32} />
           <p>Analyse des commandes...</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((u, i) => (
            <Link to={`/admin/users/${u.email}`} key={i} className="bg-[#0f0f0f] p-6 rounded-3xl shadow-sm border border-white/5 hover:shadow-md transition-shadow relative overflow-hidden group block">
              <div className='flex items-center gap-2 mb-2'>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-bg-soft text-primary">
                <span className="font-bold uppercase text-lg">{u.name.charAt(0)}</span>
              </div>
              <h3 className="font-bold text-lg text-white">{u.name}</h3>
              </div>
              
              <div className="space-y-2 mt-4">
                <p className="text-gray-500 text-[11px] flex items-center gap-2">
                  <Mail size={14} className="text-primary/50" /> {u.email}
                </p>
                <p className="text-gray-500 text-[11px] flex items-center gap-2">
                  <Phone size={14} className="text-primary/50" /> {u.phone}
                </p>
                <p className="text-gray-400 text-[11px] flex items-center gap-2 italic">
                  <MapPin size={14} className="text-primary/50" /> {u.address}
                </p>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                  <Calendar size={12} /> Dernier achat: {new Date(u.lastOrder).toLocaleDateString()}
                </div>
              </div>
            </Link>
          ))}
          {users.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-400 italic">
              Aucun client n'a encore passé de commande.
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUsers;
