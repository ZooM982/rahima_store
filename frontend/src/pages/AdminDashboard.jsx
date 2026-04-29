import React from 'react';
import { Package, Users, ShoppingCart, TrendingUp, Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import productService from '../services/productService';
import orderService from '../services/orderService';
import userService from '../services/userService';
import { useQuery } from '@tanstack/react-query';

const AdminDashboard = () => {
  // Reuse the same query keys to share data with specific list pages
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data } = await productService.getProducts();
      return data;
    },
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data } = await orderService.getOrders();
      return data;
    },
  });

  const loading = productsLoading || ordersLoading;

  const totalSales = orders
    .filter(order => order.status === 'Delivered')
    .reduce((acc, order) => acc + (order.totalAmount || 0), 0);
  
  // Calculate unique customers from orders
  const uniqueEmailsFromOrders = new Set(
    orders
      .filter(o => o.customer && o.customer.email)
      .map(o => o.customer.email.toLowerCase())
  );
  
  const stats = [
    { label: "Ventes Totales", value: `${totalSales.toLocaleString()} FCFA`, icon: <TrendingUp className="text-green-500" /> },
    { label: "Commandes", value: orders.length, icon: <ShoppingCart className="text-blue-500" /> },
    { label: "Produits", value: products.length, icon: <Package className="text-primary" /> },
    { label: "Clients", value: uniqueEmailsFromOrders.size, icon: <Users className="text-purple-500" /> }
  ];

  return (
    <AdminLayout>
      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center text-gray-400">
          <Loader2 className="animate-spin mb-4" size={32} />
          <p>Analyse de vos données...</p>
        </div>
      ) : (
        <>
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-serif mb-2 text-white">Tableau de bord</h1>
              <p className="text-gray-400 text-sm">Vue d&rsquo;ensemble de l&rsquo;activité de Rahima Store.</p>
            </div>
            <Link to="/admin/products/add">
              <button className="bg-primary text-black px-6 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:shadow-lg transition-all text-sm">
                <Plus size={16} /> Ajouter un produit
              </button>
            </Link>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stats.map((s, i) => (
              <div key={i} className="bg-[#0f0f0f] p-5 rounded-3xl shadow-sm border border-white/10 flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-2xl flex-shrink-0">{s.icon}</div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">{s.label}</p>
                  <h3 className="text-xl font-bold text-white">{s.value}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0f0f0f] rounded-[24px] shadow-sm border border-white/10 overflow-hidden">
             <div className="p-5 border-b border-white/10 bg-white/5 flex justify-between items-center">
                <h2 className="text-base font-bold text-white">Produits Récents</h2>
                <Link to="/admin/products">
                    <button className="bg-primary text-black px-6 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:shadow-lg transition-all text-sm">
                        <Plus size={16} /> Gérer les produits
                    </button>
                </Link>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="text-gray-500 text-[9px] uppercase tracking-[0.2em] font-bold">
                    <tr>
                      <th className="px-6 py-4">Image</th>
                      <th className="px-6 py-4">Nom</th>
                      <th className="px-6 py-4">Prix</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.slice(0, 5).map(p => (
                      <tr key={p._id} className="hover:bg-white/5 transition-colors text-sm">
                        <td className="px-6 py-3.5"><img src={p.mainImage} alt={p.name} className="w-10 h-10 object-cover rounded-lg" /></td>
                        <td className="px-6 py-3.5 font-bold text-gray-200">{p.name}</td>
                        <td className="px-6 py-3.5 font-semibold text-primary">{p.price.toLocaleString()} FCFA</td>
                        <td className="px-6 py-3.5">
                           <span className={`text-xs font-bold ${p.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>{p.stock} unités</span>
                        </td>
                        <td className="px-6 py-3.5 text-right flex justify-end gap-2 text-gray-500">
                          <Link to={`/admin/products/edit/${p._id}`} className="p-1.5 hover:bg-white/5 hover:text-primary rounded-lg transition-all">
                            <Edit size={14} />
                          </Link>
                          <button className="p-1.5 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all"><Trash2 size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
