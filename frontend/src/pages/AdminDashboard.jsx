import React, { useState, useEffect } from 'react';
import { Package, Users, ShoppingCart, TrendingUp, Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import productService from '../services/productService';
import orderService from '../services/orderService';
import userService from '../services/userService';

const AdminDashboard = () => {
  const [data, setData] = useState({
    products: [],
    orders: [],
    users: [],
    loading: true
  });

  useEffect(() => {
    let ignore = false;
    const fetchDashboardData = async () => {
      try {
        const [prodRes, orderRes, userRes] = await Promise.all([
          productService.getProducts(),
          orderService.getOrders(),
          userService.getUsers()
        ]);
        if (!ignore) {
          setData({
            products: prodRes.data,
            orders: orderRes.data,
            users: userRes.data,
            loading: false
          });
        }
      } catch (err) {
        console.error(err);
        if (!ignore) setData(prev => ({ ...prev, loading: false }));
      }
    };
    fetchDashboardData();
    return () => { ignore = true; };
  }, []);

  const totalSales = data.orders
    .filter(order => order.status === 'Delivered')
    .reduce((acc, order) => acc + (order.totalAmount || 0), 0);
  
  // Calculate unique customers from orders
  const uniqueEmailsFromOrders = new Set(
    data.orders
      .filter(o => o.customer && o.customer.email)
      .map(o => o.customer.email.toLowerCase())
  );
  
  const stats = [
    { label: "Ventes Totales", value: `${totalSales.toLocaleString()} FCFA`, icon: <TrendingUp className="text-green-500" /> },
    { label: "Commandes", value: data.orders.length, icon: <ShoppingCart className="text-blue-500" /> },
    { label: "Produits", value: data.products.length, icon: <Package className="text-primary" /> },
    { label: "Clients", value: uniqueEmailsFromOrders.size, icon: <Users className="text-purple-500" /> }
  ];

  return (
    <AdminLayout>
      {data.loading ? (
        <div className="h-96 flex flex-col items-center justify-center text-gray-400">
          <Loader2 className="animate-spin mb-4" size={32} />
          <p>Analyse de vos données...</p>
        </div>
      ) : (
        <>
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-serif mb-2">Tableau de bord</h1>
              <p className="text-gray-400 text-sm">Vue d'ensemble de l'activité de Rahima Store.</p>
            </div>
            <Link to="/admin/products/add">
              <button className="bg-primary text-white px-6 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:shadow-lg transition-all text-sm">
                <Plus size={16} /> Ajouter un produit
              </button>
            </Link>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stats.map((s, i) => (
              <div key={i} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-50 flex items-center gap-4">
                <div className="p-3 bg-bg-soft rounded-2xl flex-shrink-0">{s.icon}</div>
                <div>
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">{s.label}</p>
                  <h3 className="text-xl font-bold">{s.value}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[24px] shadow-sm border border-gray-50 overflow-hidden">
             <div className="p-5 border-b border-gray-50 bg-gray-50/20">
                <h2 className="text-base font-bold">Produits Récents</h2>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="text-gray-400 text-[9px] uppercase tracking-[0.2em] font-bold">
                    <tr>
                      <th className="px-6 py-4">Nom</th>
                      <th className="px-6 py-4">Prix</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {data.products.slice(0, 5).map(p => (
                      <tr key={p._id} className="hover:bg-bg-soft/30 transition-colors text-sm">
                        <td className="px-6 py-3.5 font-bold text-gray-800">{p.name}</td>
                        <td className="px-6 py-3.5 font-semibold text-primary">{p.price.toLocaleString()} FCFA</td>
                        <td className="px-6 py-3.5">
                           <span className={`text-xs font-bold ${p.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>{p.stock} unités</span>
                        </td>
                        <td className="px-6 py-3.5 text-right flex justify-end gap-2 text-gray-300">
                          <Link to={`/admin/products/edit/${p._id}`} className="p-1.5 hover:bg-bg-soft hover:text-primary rounded-lg transition-all">
                            <Edit size={14} />
                          </Link>
                          <button className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all"><Trash2 size={14} /></button>
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
