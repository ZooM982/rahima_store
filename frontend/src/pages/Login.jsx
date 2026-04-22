import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/ui/Input';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.role === 'admin') navigate('/admin');
      else navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la connexion');
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-bg-soft bg-[url('/bg-pattern.png')] bg-cover relative">
      <SEO title="Connexion" description="Connectez-vous à votre compte Rahima Store." url="/login" noIndex />
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-primary transition-all font-bold uppercase tracking-widest text-xs">
        <ArrowLeft size={16} /> Retour boutique
      </Link>

      <div className="bg-white p-10 rounded-[60px] shadow-2xl w-full max-w-lg mx-auto transform scale-90 md:scale-100">
        <div className="text-center mb-8">
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">Bon retour</span>
          <h1 className="text-4xl font-serif mt-1">Connexion</h1>
        </div>
        
        {error && <p className="bg-red-50 text-red-500 p-3 rounded-2xl mb-6 text-center text-xs font-medium">{error}</p>}
        
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
          <Button type="submit" className="w-full mt-4">Se connecter</Button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">Pas encore de compte ?</p>
          <Link to="/register" className="text-primary font-bold hover:underline mt-2 inline-block">Créer un compte Rahima</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
