/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import {
	Trash2,
	Plus,
	Minus,
	CreditCard,
	ChevronLeft,
	ShoppingBag,
	FileText,
	Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/common/Button";
import Input from "../components/ui/Input";
import { useInitiatePaymentMutation } from "../store/paymentApi";
import { useCreateOrderMutation } from "../store/orderApi";

const Cart = () => {
	const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } =
		useCart();
	const { user } = useAuth();
	const [isProcessing, setIsProcessing] = useState(false);
	const [autoCreateAccount, setAutoCreateAccount] = useState(false);
	const [isEditingInfo, setIsEditingInfo] = useState(false);
	const [formData, setFormData] = useState({
		name: user?.name || "",
		email: user?.email || "",
		phone: user?.phone || "",
		address: user?.address || "",
	});

	const [createOrder] = useCreateOrderMutation();
	const [initiatePayment] = useInitiatePaymentMutation();

	const handleCheckout = async (e) => {
		e.preventDefault();
		if (cart.length === 0) return;

		setIsProcessing(true);

		try {
			const orderData = {
				items: cart.map((item) => ({
					productId: item._id.split("-")[0],
					quantity: item.quantity,
					price: item.price,
				})),
				totalAmount: cartTotal,
				customer: formData,
				userId: user?.id || user?._id,
				autoCreateAccount: !user && autoCreateAccount,
			};

			const response = await createOrder(orderData).unwrap();
			const orderId = response?._id;

			if (orderId) {
				// Initier le paiement PayTech
				const paymentResponse = await initiatePayment(orderId).unwrap();
				
				if (paymentResponse.success && paymentResponse.redirect_url) {
					// Vider le panier avant de partir pour éviter les doublons au retour
					clearCart();
					// Rediriger vers PayTech
					window.location.href = paymentResponse.redirect_url;
				} else {
					throw new Error(paymentResponse.message || "Erreur PayTech");
				}
			} else {
				throw new Error("Impossible de créer la commande");
			}
		} catch (err) {
			console.error(err);
			setIsProcessing(false);
			alert("Erreur lors de la validation ou du paiement : " + (err.message || err.data?.message));
		}
	};


	return (
		<div className="pt-16 pb-10 md:pt-20 md:pb-14 custom-container relative overflow-hidden">
			<AnimatePresence mode="wait">
				{isProcessing ?
					<motion.div
						key="processing"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 1.1 }}
						className="fixed inset-0 z-[100] bg-white/10 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
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
						<h2 className="text-3xl font-serif mb-4">
							Validation de votre commande...
						</h2>
						<p className="text-gray-400 font-medium tracking-widest uppercase text-[10px]">
							Paiement sécurisé Rahima Store
						</p>
					</motion.div>
				:	<motion.div
						key="cart"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, x: -100 }}
					>
						<Link
							to="/"
							className="flex items-center gap-2 text-gray-400 hover:text-primary mb-8 transition-colors"
						>
							<ChevronLeft size={20} /> Retour aux produits
						</Link>

						<h1
							className={`text-5xl font-serif mb-10 ${cart.length === 0 ? "text-center" : ""}`}
						>
							Votre Panier
						</h1>

						<div
							className={
								cart.length === 0 ?
									"max-w-2xl mx-auto"
								:	"grid lg:grid-cols-3 gap-10"
							}
						>
							<div
								className={cart.length === 0 ? "" : "lg:col-span-2 space-y-8"}
							>
								{cart.length === 0 ?
									<div className="bg-[#0f0f0f] p-16 rounded-[40px] text-center shadow-sm border border-white/5">
										<p className="text-xl text-white mb-8">
											Votre panier est désolément vide.
										</p>
										<Link to="/" className="inline-block">
											<Button>Continuer mes achats</Button>
										</Link>
									</div>
								:	cart.map((item) => (
										<div
											key={item._id}
											className="bg-white/10 p-3 rounded-[20px] flex flex-wrap md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow"
										>
											<div className="flex space-x-2">
												<div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
													<img
														src={item.img}
														alt={item.name}
														className="w-full h-full object-cover"
													/>
												</div>

												<div className="flex-1">
													<h3 className="font-bold text-lg leading-tight">
														{item.name}
													</h3>
													<p className="text-primary text-2xl mt-3 font-bold">
														{item.price.toLocaleString()} FCFA
													</p>
												</div>
											</div>
											<div className="flex w-2/3 items-center gap-4 bg-bg-soft px-4 py-2 rounded-full sm:ml-12 ml-3">
												<button
													onClick={() =>
														updateQuantity(item._id, item.quantity - 1)
													}
													className="mx-auto hover:text-primary"
												>
													<Minus size={16} />
												</button>
												<span className="mx-auto font-bold w-4 text-center">
													{item.quantity}
												</span>
												<button
													onClick={() =>
														updateQuantity(item._id, item.quantity + 1)
													}
													className="mx-auto hover:text-primary"
												>
													<Plus size={16} />
												</button>
											</div>
											<button
												onClick={() => removeFromCart(item._id)}
												className="text-gray-300 hover:text-red-500 transition-colors ml-5"
											>
												<Trash2 size={24} />
											</button>
										</div>
									))
								}
							</div>

							{cart.length > 0 && (
								<div className="bg-white/10 p-6 rounded-[20px] shadow-xl h-fit sticky top-32">
									<h2 className="text-2xl font-serif mb-8 border-b border-gray-100 pb-4">
										Résumé
									</h2>
									<div className="space-y-4 mb-8">
										<div className="flex justify-between text-white">
											<span>Sous-total</span>
											<span>{cartTotal.toLocaleString()} FCFA</span>
										</div>
										<div className="flex justify-between text-white">
											<span>Livraison</span>
											<span className="text-green-500 font-medium">
												À la charge du client
											</span>
										</div>
										<div className="flex justify-between font-bold text-xl pt-4 border-t border-white/5">
											<span>Total</span>
											<span className="text-primary">
												{cartTotal.toLocaleString()} FCFA
											</span>
										</div>
									</div>

									<form
										key={user?.id || user?._id || "guest"}
										onSubmit={handleCheckout}
										className="space-y-4"
									>
										{user && !isEditingInfo ? (
											<div className="p-5 bg-white/5 rounded-3xl border border-white/10 space-y-3 relative group">
												<div className="flex items-center justify-between">
													<h3 className="text-[10px] font-bold uppercase tracking-widest text-primary">Informations de livraison</h3>
													<button 
														type="button"
														onClick={() => setIsEditingInfo(true)}
														className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-primary transition-colors"
													>
														Modifier
													</button>
												</div>
												<div className="space-y-1">
													<p className="font-bold text-white text-sm">{formData.name}</p>
													<p className="text-gray-400 text-xs">{formData.phone}</p>
													<p className="text-gray-400 text-xs leading-relaxed">{formData.address}</p>
												</div>
												<div className="pt-2 flex items-center gap-2 text-[9px] text-green-500/60 font-bold uppercase tracking-tighter">
													<Check size={12} /> Prêt pour expédition
												</div>
											</div>
										) : (
											<div className="space-y-4 animate-fade-in">
												<div className="flex items-center justify-between mb-2">
													<h3 className="text-[10px] font-bold uppercase tracking-widest text-primary px-2">Vos Coordonnées</h3>
													{user && (
														<button 
															type="button"
															onClick={() => setIsEditingInfo(false)}
															className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
														>
															Annuler
														</button>
													)}
												</div>
												<Input
													required
													placeholder="Nom complet"
													value={formData.name}
													onChange={(e) =>
														setFormData({ ...formData, name: e.target.value })
													}
												/>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<Input
														required
														type="email"
														placeholder="Email"
														value={formData.email}
														onChange={(e) =>
															setFormData({ ...formData, email: e.target.value })
														}
													/>
													<Input
														required
														type="tel"
														placeholder="Téléphone"
														value={formData.phone}
														onChange={(e) =>
															setFormData({ ...formData, phone: e.target.value })
														}
													/>
												</div>
												<Input
													required
													textarea
													placeholder="Adresse de livraison"
													value={formData.address}
													onChange={(e) =>
														setFormData({ ...formData, address: e.target.value })
													}
												/>

												{!user && (
													<div
														className="flex items-center gap-4 py-4 px-6 bg-white/1 backdrop-blur-xl rounded-[24px] border border-white/10 hover:border-primary/50 transition-all cursor-pointer group shadow-xl shadow-black/20"
														onClick={() => setAutoCreateAccount(!autoCreateAccount)}
													>
														<div className="relative flex items-center justify-center shrink-0">
															<input
																type="checkbox"
																id="autoCreate"
																className="peer appearance-none w-6 h-6 rounded-[8px] border-2 border-white/20 checked:bg-gold-gradient checked:border-transparent transition-all cursor-pointer shadow-inner"
																checked={autoCreateAccount}
																onChange={(e) => {
																	e.stopPropagation();
																	setAutoCreateAccount(e.target.checked);
																}}
															/>
															<Check
																size={14}
																className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-all scale-50 peer-checked:scale-100"
															/>
														</div>
														<div className="flex flex-col">
															<label
																htmlFor="autoCreate"
																className="text-sm font-bold text-white group-hover:text-primary transition-colors cursor-pointer select-none"
																onClick={(e) => e.preventDefault()}
															>
																Créer mon compte
															</label>
															<p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">
																Pour un suivi privilégié
															</p>
														</div>
													</div>
												)}
											</div>
										)}

										<Button
											type="submit"
											className="w-full mt-4"
											disabled={isProcessing}
										>
											{isProcessing ?
												"Traitement..."
											:	<>
													<CreditCard size={20} /> Valider et Payer
												</>
											}
										</Button>
									</form>
								</div>
							)}
						</div>
					</motion.div>
				}
			</AnimatePresence>
		</div>
	);
};

export default Cart;
