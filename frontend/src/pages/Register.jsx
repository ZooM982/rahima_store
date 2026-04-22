import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/ui/Input';
import { ArrowLeft, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-bg-soft bg-[url('/bg-pattern.png')] bg-cover relative overflow-hidden">
      <SEO title="Créer un compte" description="Rejoignez Rahima Store et profitez d'une expérience beauté personnalisée." url="/register" noIndex />
      <Link to="/login" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-primary transition-all font-bold uppercase tracking-widest text-xs">
        <ArrowLeft size={16} /> Déjà membre ?
      </Link>

      <div className="bg-white p-10 rounded-[60px] shadow-2xl w-full max-w-lg mx-auto transform scale-90 md:scale-100">
        <div className="text-center mb-6">
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">Bienvenue</span>
          <h1 className="text-4xl font-serif mt-1">S'inscrire</h1>
        </div>
        
        {error && <p className="bg-red-50 text-red-500 p-3 rounded-2xl mb-4 text-center text-xs font-medium">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input 
            label="Nom complet"
            placeholder="Rahima" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <Input 
            label="Email"
            type="email" 
            placeholder="votre@email.com" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <Input 
            label="Mot de passe"
            type="password" 
            placeholder="••••••••" 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <Button 
            type="submit" 
            className="w-full mt-6 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Création du compte...
              </>
            ) : (
              'Rejoindre Rahima'
            )}
          </Button>
        </form>
        
        <div className="mt-8 text-center border-t border-gray-50 pt-8">
          <p className="text-gray-400 text-sm italic">"Révélez votre éclat naturel avec nous."</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
