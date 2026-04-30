import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/common/Button';
import Input from '../components/ui/Input';
import { Loader2, Lock, CheckCircle, AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';
import logo from '../assets/pictogram-gold.svg';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Les mots de passe ne correspondent pas.');
    }
    if (password.length < 6) {
      return setError('Le mot de passe doit contenir au moins 6 caractères.');
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`, { password });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Le lien est invalide ou a expiré.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg-soft bg-[url('/bg-pattern.png')] bg-cover relative px-4">
      <SEO title="Nouveau mot de passe" description="Définissez votre nouveau mot de passe Rahima Store." url="/reset-password" noIndex />

      <div className="bg-[#0a0a0a] p-8 md:p-12 rounded-[60px] shadow-2xl w-full max-w-lg mx-auto border border-white/5">
        <div className="text-center mb-10">
          <img src={logo} alt="Rahima Store" className="w-20 h-20 mx-auto mb-6 object-contain" />
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">Sécurité</span>
          <h1 className="text-4xl font-serif mt-1 text-white">Réinitialisation</h1>
        </div>

        {success ? (
          <div className="bg-green-500/10 border border-green-500/20 rounded-[30px] p-8 text-center animate-fade-up">
            <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
            <h2 className="text-xl font-serif text-white mb-2">Succès !</h2>
            <p className="text-gray-400 text-sm mb-6">Votre mot de passe a été mis à jour.<br/>Redirection vers la connexion...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 text-red-500 p-4 rounded-2xl flex items-center gap-3 text-xs font-medium border border-red-500/20 animate-shake">
                <AlertTriangle size={18} className="flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Nouveau mot de passe</label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock size={18} />}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Confirmer le mot de passe</label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  icon={<Lock size={18} />}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-4 flex items-center justify-center gap-2 bg-primary text-black hover:bg-primary-dark shadow-xl shadow-primary/20"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Mise à jour...
                </>
              ) : (
                'Mettre à jour le mot de passe'
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
