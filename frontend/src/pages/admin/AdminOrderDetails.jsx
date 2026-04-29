import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Printer, Truck, CheckCircle, Package, Loader2, Phone } from 'lucide-react';
import Button from '../../components/common/Button';
import orderService from '../../services/orderService';
import { generateInvoice } from '../../utils/invoiceGenerator';
import { FileText } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const AdminOrderDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Fetch order with caching
  const { data: order, isLoading: loading } = useQuery({
    queryKey: ['admin-order', id],
    queryFn: async () => {
      const { data } = await orderService.getOrderById(id);
      return data;
    },
  });

  // Mutation for status change
  const statusMutation = useMutation({
    mutationFn: (newStatus) => orderService.updateOrderStatus(id, newStatus),
    onSuccess: () => {
      // Invalidate both the single order and the full list
      queryClient.invalidateQueries({ queryKey: ['admin-order', id] });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    },
    onError: (error) => {
      console.error("Erreur de mise à jour du statut:", error);
      alert("Impossible de mettre à jour le statut.");
    }
  });

  const handleStatusChange = (newStatus) => {
    statusMutation.mutate(newStatus);
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
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/admin/orders" className="p-2 hover:bg-bg-soft rounded-full text-gray-400 hover:text-primary transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-serif text-white">Commande #{id.substring(0, 8)}</h1>
            <p className="text-gray-400 text-sm">Passée le {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2 w-full md:w-auto">
          <Button 
            variant="secondary" 
            className="flex-1 md:flex-none py-2 px-4 text-xs"
            onClick={() => generateInvoice(order)}
          >
            <FileText size={16} /> Facture PDF
          </Button>
          <Button 
            className={`flex-1 md:flex-none py-2 px-4 text-xs ${statusMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleStatusChange('Validated')}
            disabled={statusMutation.isPending || order.status === 'Validated'}
          >
            {statusMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />} 
            {order.status === 'Validated' ? 'Déjà validé' : "Valider l'envoi"}
          </Button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 pb-20">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-[#0f0f0f] p-8 rounded-3xl shadow-sm border border-white/5">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">Articles commandés</h2>
            <div className="divide-y divide-white/5">
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
                      <h4 className="font-bold text-white line-clamp-1">{item.productId?.name || 'Produit supprimé'}</h4>
                      <p className="text-xs text-secondary font-medium">{item.price.toLocaleString()} FCFA</p>
                      <p className="text-[10px] text-gray-400">Quantité: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">{(item.price * item.quantity).toLocaleString()} FCFA</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
              <div className="flex justify-between text-2xl font-serif text-primary border-t border-white/5 pt-4 mt-4">
                <span>Total</span>
                <span>{order.totalAmount.toLocaleString()} FCFA</span>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-[#0f0f0f] p-6 rounded-3xl shadow-sm border border-white/5">
            <h2 className="text-base font-bold mb-6 italic text-white">Informations Client</h2>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Nom</p>
                <p className="text-sm font-bold text-white">{order.customer.name}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Email</p>
                <p className="text-sm font-medium text-primary underline">{order.customer.email}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Téléphone</p>
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  <Phone size={14} className="text-primary" /> {order.customer.phone}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Adresse de livraison</p>
                <p className="text-sm text-gray-500 leading-relaxed italic">{order.customer.address}</p>
              </div>
            </div>
          </section>

          <section className="bg-[#0f0f0f] p-6 rounded-3xl shadow-sm border border-white/5">
            <h2 className="text-base font-bold mb-6 italic text-white">Statut & Expédition</h2>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center"><Truck size={20} /></div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold">Actuel</p>
                <p className="text-sm font-bold uppercase">{order.status}</p>
              </div>
            </div>
            <select 
              className={`w-full px-4 py-2 bg-black rounded-xl text-xs font-bold outline-none border border-white/10 text-primary ${statusMutation.isPending ? 'opacity-50' : ''}`}
              value={order.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={statusMutation.isPending}
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
