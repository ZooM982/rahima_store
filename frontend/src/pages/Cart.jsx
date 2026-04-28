/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { Trash2, Plus, Minus, CreditCard, ChevronLeft, ShoppingBag, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import Input from '../components/ui/Input';
import orderService from '../services/orderService';
import { generateInvoice } from '../utils/invoiceGenerator';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [orderComplete, setOrderComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
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
    
    setIsProcessing(true);
    
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
      
      const response = await orderService.createOrder(orderData);
      const orderId = response.data?._id;
      
      setTimeout(() => {
        setLastOrder({ items: [...cart], totalAmount: cartTotal, _id: orderId });
        setOrderComplete(true);
        setIsProcessing(false);
        clearCart();
        window.scrollTo(0, 0);
      }, 2500);
      
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      alert("Erreur lors de la validation de la commande");
    }
  };

  if (orderComplete && lastOrder) {
    return (
      <div className="pt-16 pb-10 md:pt-20 md:pb-14 custom-container">
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
                  <span className="text-primary">{lastOrder.totalAmount.toLocaleString()} FCFA</span>
                </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="secondary">Retour à la boutique</Button>
            </Link>
            <Button 
              onClick={() => generateInvoice({ ...lastOrder, customer: formData, _id: 'SUCCESS' })}
              className="flex items-center gap-2"
            >
              <FileText size={20} /> Télécharger la facture
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-10 md:pt-20 md:pb-14 custom-container relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isProcessing ? (
          <motion.div 
            key="processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="relative w-32 h-32 mb-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-primary/20 border-t-primary rounded-full"
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center text-primary"
              >
                <ShoppingBag size={48} />
              </motion.div>
            </div>
            <h2 className="text-3xl font-serif mb-4">Validation de votre commande...</h2>
            <p className="text-gray-400 font-medium tracking-widest uppercase text-[10px]">Paiement sécurisé Rahima Store</p>
          </motion.div>
        ) : orderComplete && lastOrder ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-12 rounded-[40px] shadow-2xl max-w-2xl mx-auto text-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.2 }}
              className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl"
            >
              ✓
            </motion.div>
            <h1 className="text-4xl font-serif mb-4">Merci pour votre commande !</h1>
            <p className="text-gray-500 mb-12">Une facture détaillée a été générée pour vous.</p>
            
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
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="secondary">Retour à la boutique</Button>
              </Link>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Button 
                  onClick={() => generateInvoice(lastOrder)}
                  className="flex items-center gap-2 shadow-xl shadow-primary/20"
                >
                  <FileText size={20} /> Télécharger la facture
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-primary mb-8 transition-colors">
              <ChevronLeft size={20} /> Retour aux produits
            </Link>
            
            <h1 className={`text-5xl font-serif mb-10 ${cart.length === 0 ? 'text-center' : ''}`}>Votre Panier</h1>
            
            <div className={cart.length === 0 ? 'max-w-2xl mx-auto' : 'grid lg:grid-cols-3 gap-10'}>
              <div className={cart.length === 0 ? '' : 'lg:col-span-2 space-y-8'}>
                {cart.length === 0 ? (
                  <div className="bg-white p-16 rounded-[40px] text-center shadow-sm border border-gray-50">
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
                      <span className="text-green-500 font-medium">À la charge du client</span>
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
      
                    <Button type="submit" className="w-full mt-4" disabled={isProcessing}>
                      {isProcessing ? 'Traitement...' : <><CreditCard size={20} /> Valider et Payer</>}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
