import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { Trash2, Plus, Minus, CreditCard, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/ui/Input';
import orderService from '../services/orderService';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [orderComplete, setOrderComplete] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [autoCreateAccount, setAutoCreateAccount] = useState(false);
  const [formData, setFormData] = useState({ 
    name: user?.name || '', 
    email: user?.email || '', 
    phone: user?.phone || '', 
    address: user?.address || '' 
  });

  // Instead of useEffect, we'll use a 'key' on the form to reset it 
  // when the user identity changes. This is the recommended React pattern.


  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    try {
      const orderData = {
        items: cart.map(item => ({
          productId: item._id.split('-')[0],
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: cartTotal,
        customer: formData,
        userId: user?.id || user?._id,
        autoCreateAccount: !user && autoCreateAccount
      };
      await orderService.createOrder(orderData);
      setLastOrder({ items: [...cart], total: cartTotal });
      setOrderComplete(true);
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la validation de la commande");
    }
  };

  if (orderComplete && lastOrder) {
    return (
      <div className="pt-24 pb-14 md:pt-32 md:pb-20 custom-container">
        <div className="bg-white p-12 rounded-[40px] shadow-2xl max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl">✓</div>
          <h1 className="text-4xl font-serif mb-4">Merci pour votre commande !</h1>
          <p className="text-gray-500 mb-12">Une facture détaillée a été envoyée à {formData.email}.</p>
          
          <div className="border-t border-b border-gray-100 py-8 mb-12 text-left">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-widest text-[10px]">Détails de la facturation</h2>
            <p className="font-bold mb-1">{formData.name}</p>
            <p className="text-gray-500 text-sm mb-6">{formData.address}</p>
            
            <div className="space-y-4">
              {lastOrder.items.map(item => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>{(item.price * item.quantity).toLocaleString()} FCFA</span>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-100 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">{lastOrder.total.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>
          
          <Link to="/">
            <Button className="mx-auto">Retour à la boutique</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-14 md:pt-32 md:pb-20 custom-container">
      <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-primary mb-12 transition-colors">
        <ChevronLeft size={20} /> Retour aux produits
      </Link>
      
      <h1 className="text-5xl font-serif mb-16">Votre Panier</h1>
      
      <div className="grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          {cart.length === 0 ? (
            <div className="bg-white p-16 rounded-[40px] text-center">
              <p className="text-xl text-gray-500 mb-8">Votre panier est désolément vide.</p>
              <Link to="/" className="inline-block"><Button>Continuer mes achats</Button></Link>
            </div>
          ) : (
            cart.map(item => (
              <div key={item._id} className="bg-white p-3 rounded-[20px] flex flex-wrap md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
               <div className="sm:flex gap-2">
                 <div className="flex-1">
                  <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                  <p className="text-primary font-bold">{item.price.toLocaleString()} FCFA</p>
                </div>
                <div className="flex items-center gap-4 bg-bg-soft px-4 py-2 rounded-full sm:ml-12 ml-3">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="mx-auto hover:text-primary"><Minus size={16} /></button>
                  <span className="mx-auto font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="mx-auto hover:text-primary"><Plus size={16} /></button>
                </div>
               </div>
                <button onClick={() => removeFromCart(item._id)} className="text-gray-300 hover:text-red-500 transition-colors ml-auto">
                  <Trash2 size={24} />
                </button>
              </div>
            ))
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="bg-white p-6 rounded-[20px] shadow-xl h-fit sticky top-32">
            <h2 className="text-2xl font-serif mb-8 border-b border-gray-100 pb-4">Résumé</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500">
                <span>Sous-total</span>
                <span>{cartTotal.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Livraison</span>
                <span className="text-green-500 font-medium">Offerte</span>
              </div>
              <div className="flex justify-between font-bold text-xl pt-4 border-t border-gray-100">
                <span>Total</span>
                <span className="text-primary">{cartTotal.toLocaleString()} FCFA</span>
              </div>
            </div>
            
            <form 
              key={user?.id || user?._id || 'guest'} 
              onSubmit={handleCheckout} 
              className="space-y-4"
            >
              <Input 
                required
                placeholder="Nom complet" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  required
                  type="email" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <Input 
                  required
                  type="tel" 
                  placeholder="Téléphone" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <Input 
                required
                textarea
                placeholder="Adresse de livraison" 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />

              {!user && (
                <div className="flex items-center gap-3 py-2 px-4 bg-primary/5 rounded-xl border border-primary/10">
                  <input 
                    type="checkbox" 
                    id="autoCreate" 
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                    checked={autoCreateAccount}
                    onChange={(e) => setAutoCreateAccount(e.target.checked)}
                  />
                  <label htmlFor="autoCreate" className="text-sm text-gray-600 cursor-pointer">
                    Créer un compte automatiquement
                  </label>
                </div>
              )}

              <Button type="submit" className="w-full mt-4">
                <CreditCard size={20} /> Valider et Payer
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
