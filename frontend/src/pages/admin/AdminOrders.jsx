import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { ShoppingCart, Eye, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import orderService from '../../services/orderService';
import { useQuery } from '@tanstack/react-query';

const AdminOrders = () => {
  const { data: orders = [], isLoading: loading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data } = await orderService.getOrders();
      return data;
    },
  });

  return (
    <AdminLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-serif text-white">Commandes Clients</h1>
        <p className="text-gray-400 text-sm">Suivez l'activité commerciale en temps réel.</p>
      </header>

      <div className="bg-[#0f0f0f] rounded-3xl shadow-sm border border-white/10 overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 text-gray-500">
            <Loader2 className="animate-spin mb-4" size={32} />
            <p className='text-center whitespace-nowrap w-fit'>Chargement des commandes...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px] whitespace-nowrap">
              <thead className="bg-white/5 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                <tr>
                  <th className="px-6 py-4">ID Commande</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map(order => (
                  <tr key={order._id} className="hover:bg-white/5 transition-colors text-sm">
                    <td className="px-6 py-4 font-bold uppercase text-[10px] tracking-tighter text-gray-500">
                      #{order._id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-200">{order.customer?.name || 'Client invité'}</td>
                    <td className="px-6 py-4 font-bold text-primary">{(order.totalAmount || 0).toLocaleString()} FCFA</td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-2 w-fit px-3 py-1 rounded-full text-[10px] font-bold ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                        {order.status === 'Delivered' ? <CheckCircle size={12} /> : <Clock size={12} />}
                        {order.status === 'Pending' ? 'En attente' : order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/admin/orders/${order._id}`} className="p-2 hover:bg-white/5 text-gray-500 hover:text-primary rounded-lg transition-all inline-block" title="Voir détails">
                        <Eye size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && (
              <div className="p-20 text-center text-gray-500 italic font-serif">
                Aucune commande pour le moment.
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
