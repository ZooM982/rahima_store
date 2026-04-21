import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Printer, Truck, CheckCircle, Package, Loader2, Phone } from 'lucide-react';
import Button from '../../components/common/Button';
import orderService from '../../services/orderService';

const AdminOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetchOrder = async () => {
      try {
        const { data } = await orderService.getOrderById(id);
        if (!ignore) setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchOrder();
    return () => { ignore = true; };
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      await orderService.updateOrderStatus(id, newStatus);
      setOrder({ ...order, status: newStatus });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <AdminLayout>
      <div className="h-96 flex flex-col items-center justify-center text-gray-400">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p>Récupération des détails de la commande...</p>
      </div>
    </AdminLayout>
  );

  if (!order) return (
    <AdminLayout>
      <div className="text-center py-20">
        <h2 className="text-2xl font-serif mb-4">Commande introuvable</h2>
        <Link to="/admin/orders" className="text-primary font-bold">Retour aux commandes</Link>
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/admin/orders" className="p-2 hover:bg-bg-soft rounded-full text-gray-400 hover:text-primary transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-serif">Commande #{id.substring(0, 8)}</h1>
            <p className="text-gray-400 text-sm">Passée le {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="secondary" className="flex-1 sm:flex-none py-2 px-4 text-xs"><Printer size={16} /> Facture PDF</Button>
          <Button 
            className="flex-1 sm:flex-none py-2 px-4 text-xs"
            onClick={() => handleStatusChange('Validated')}
          >
            <CheckCircle size={16} /> Valider l'envoi
          </Button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 pb-20">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">Articles commandés</h2>
            <div className="divide-y divide-gray-50">
              {order.items.map((item, i) => (
                <div key={i} className="py-4 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    {item.productId?.mainImage ? (
                      <img 
                        src={item.productId.mainImage} 
                        className="w-16 h-16 rounded-2xl object-cover bg-bg-soft shadow-sm" 
                        alt="" 
                      />
                    ) : (
                      <div className="w-16 h-16 bg-bg-soft rounded-2xl flex items-center justify-center text-primary">
                        <Package size={24} />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-gray-800 line-clamp-1">{item.productId?.name || 'Produit supprimé'}</h4>
                      <p className="text-xs text-secondary font-medium">{item.price.toLocaleString()} FCFA</p>
                      <p className="text-[10px] text-gray-400">Quantité: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{(item.price * item.quantity).toLocaleString()} FCFA</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-50 space-y-3">
              <div className="flex justify-between text-2xl font-serif text-primary border-t border-gray-50 pt-4 mt-4">
                <span>Total</span>
                <span>{order.totalAmount.toLocaleString()} FCFA</span>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
            <h2 className="text-base font-bold mb-6 italic">Informations Client</h2>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Nom</p>
                <p className="text-sm font-bold text-gray-800">{order.customer.name}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Email</p>
                <p className="text-sm font-medium text-primary underline">{order.customer.email}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Téléphone</p>
                <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <Phone size={14} className="text-primary" /> {order.customer.phone}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Adresse de livraison</p>
                <p className="text-sm text-gray-500 leading-relaxed italic">{order.customer.address}</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
            <h2 className="text-base font-bold mb-6 italic">Statut & Expédition</h2>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center"><Truck size={20} /></div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold">Actuel</p>
                <p className="text-sm font-bold uppercase">{order.status}</p>
              </div>
            </div>
            <select 
              className="w-full px-4 py-2 bg-bg-soft rounded-xl text-xs font-bold outline-none border border-gray-100"
              value={order.status}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
               <option value="Pending">En attente</option>
               <option value="Validated">Validée</option>
               <option value="Delivered">Livrée</option>
               <option value="Cancelled">Annulée</option>
            </select>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrderDetails;
