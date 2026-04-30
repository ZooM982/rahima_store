import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/common/Button';
import Input from '../components/ui/Input';
import { ArrowLeft, Loader2, Mail, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import logo from '../assets/pictogram-gold.svg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg-soft bg-[url('/bg-pattern.png')] bg-cover relative px-4">
      <SEO title="Mot de passe oublié" description="Récupérez l'accès à votre compte Rahima Store." url="/forgot-password" noIndex />
      
      <Link to="/login" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-primary transition-all font-bold uppercase tracking-widest text-xs">
        <ArrowLeft size={16} /> Retour connexion
      </Link>

      <div className="bg-[#0a0a0a] p-8 md:p-12 rounded-[60px] shadow-2xl w-full max-w-lg mx-auto border border-white/5">
        <div className="text-center mb-10">
          <img src={logo} alt="Rahima Store" className="w-20 h-20 mx-auto mb-6 object-contain" />
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">Sécurité</span>
          <h1 className="text-4xl font-serif mt-1 text-white">Mot de passe oublié</h1>
          <p className="text-gray-500 text-sm mt-4">
            Entrez votre adresse email pour recevoir un lien de réinitialisation.
          </p>
        </div>

        {message ? (
          <div className="bg-green-500/10 border border-green-500/20 rounded-[30px] p-8 text-center animate-fade-up">
            <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
            <p className="text-white font-medium mb-4">{message}</p>
            <p className="text-gray-400 text-sm mb-8">Pensez à vérifier vos spams si vous ne recevez rien d'ici quelques minutes.</p>
            <Link to="/login" className="text-primary font-bold hover:underline">Retourner à la connexion</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="bg-red-500/10 text-red-500 p-4 rounded-2xl text-center text-xs font-medium border border-red-500/20">{error}</p>}
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email du compte</label>
              <Input 
                type="email" 
                placeholder="votre@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={18} />}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full py-4 flex items-center justify-center gap-2 bg-primary text-black hover:bg-primary-dark shadow-xl shadow-primary/20"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                'Envoyer le lien'
              )}
            </Button>
            
            <div className="text-center pt-4">
               <p className="text-gray-500 text-xs italic">"Besoin d'aide ? Contactez notre support à contact@rahima.store"</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
