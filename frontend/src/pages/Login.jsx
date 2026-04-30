import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/ui/Input';
import { ArrowLeft, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';

import logo from '../assets/pictogram-gold.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login(email, password);
      if (user.role === 'admin') navigate('/admin');
      else navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-bg-soft bg-[url('/bg-pattern.png')] bg-cover relative">
      <SEO title="Connexion" description="Connectez-vous à votre compte Rahima Store." url="/login" noIndex />
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-primary transition-all font-bold uppercase tracking-widest text-xs">
        <ArrowLeft size={16} /> Retour boutique
      </Link>

      <div className="bg-[#0a0a0a] p-10 rounded-[60px] shadow-2xl w-full max-w-lg mx-auto transform scale-90 md:scale-100 border border-white/5">
        <div className="text-center mb-8">
          <img src={logo} alt="Rahima Store" className="w-20 h-20 mx-auto mb-4 object-contain" />
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">Bon retour</span>
          <h1 className="text-4xl font-serif mt-1 text-white">Connexion</h1>
        </div>
        
        {error && <p className="bg-red-500/10 text-red-500 p-3 rounded-2xl mb-6 text-center text-xs font-medium border border-red-500/20">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Email"
            type="email" 
            placeholder="votre@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
          <Input 
            label="Mot de passe"
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <div className="flex justify-end px-1">
            <Link to="/forgot-password" size="sm" className="text-xs text-primary hover:underline font-medium">Mot de passe oublié ?</Link>
          </div>
          <Button 
            type="submit" 
            className="w-full mt-4 flex items-center justify-center gap-2 bg-primary text-black hover:bg-primary-dark"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Connexion en cours...
              </>
            ) : (
              'Se connecter'
            )}
          </Button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">Pas encore de compte ?</p>
          <Link to="/register" className="text-primary font-bold hover:underline mt-2 inline-block">Créer un compte Rahima</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
