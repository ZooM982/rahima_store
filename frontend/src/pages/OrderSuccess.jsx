import { useSearchParams, Link } from 'react-router-dom';
import { Check, FileText, ShoppingBag, Loader2 } from 'lucide-react';
import Button from '../components/common/Button';
import { generateInvoice } from '../utils/invoiceGenerator';
import { useGetOrderQuery } from '../store/orderApi';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  
  // Fetch the order to show details and confirm status
  const { data: order, isLoading, error } = useGetOrderQuery(orderId, {
    skip: !orderId,
    // Refetch to see if IPN has updated status to "Paid"
    pollingInterval: 3000, 
  });

  if (isLoading) {
    return (
      <div className="pt-40 pb-20 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-primary mb-4" size={48} />
        <h2 className="text-xl font-serif text-white">Confirmation de votre commande...</h2>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-2xl font-serif mb-4 text-white">Oups ! Commande introuvable</h2>
        <Link to="/products" className="text-primary font-bold">Retour à la boutique</Link>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-10 md:pt-20 md:pb-14 custom-container">
      <div className="bg-[#0a0a0a] p-12 rounded-[40px] shadow-2xl max-w-2xl mx-auto text-center border border-white/5">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl">
          ✓
        </div>
        <h1 className="text-4xl font-serif mb-4">
          Paiement Réussi !
        </h1>
        <p className="text-white/60 mb-12">
          Votre commande <strong>#{order._id.slice(-6)}</strong> a bien été enregistrée et est en cours de préparation.
        </p>

        <div className="border-t border-b border-white/5 py-8 mb-12 text-left">
          <h2 className="text-xs font-bold mb-6 uppercase tracking-[0.2em] text-primary">
            Récapitulatif
          </h2>
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-white/80">
                  {item.productId?.name || 'Produit'} (x{item.quantity})
                </span>
                <span className="text-white">
                  {(item.price * item.quantity).toLocaleString()} FCFA
                </span>
              </div>
            ))}
            <div className="pt-4 border-t border-white/5 flex justify-between font-bold text-lg">
              <span className="text-white">Total payé</span>
              <span className="text-primary">
                {order.totalAmount.toLocaleString()} FCFA
              </span>
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest mt-2">
              <span className="text-white/40">Statut du paiement</span>
              <span className={order.paymentStatus === 'Paid' ? 'text-green-500' : 'text-yellow-500'}>
                {order.paymentStatus === 'Paid' ? 'Confirmé' : 'En attente de validation'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products">
            <Button variant="secondary">Continuer mes achats</Button>
          </Link>
          <Button
            onClick={() => generateInvoice(order)}
            className="flex items-center gap-2"
          >
            <FileText size={20} /> Télécharger la facture
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
