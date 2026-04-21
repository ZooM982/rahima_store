import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Button from '../../components/common/Button';
import Input from '../../components/ui/Input';
import { Save, Bell, Globe, ShieldCheck } from 'lucide-react';
import api from '../../services/api';

const AdminSettings = () => {
  const [preferences, setPreferences] = useState({
    emailOnSale: true,
    lowStockAlert: true,
    newCustomerAlert: true
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const { data } = await api.get('/notifications/preferences');
        setPreferences(data);
      } catch (error) {
        console.error('Error fetching preferences:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPreferences();
  }, []);

  const handleToggleChange = async (key) => {
    const newPrefs = { ...preferences, [key]: !preferences[key] };
    setPreferences(newPrefs);
    try {
      await api.put('/notifications/preferences', newPrefs);
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  return (
    <AdminLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-serif">Paramètres</h1>
        <p className="text-gray-400 text-sm">Configurez les options de votre boutique.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-3 italic">
              <Globe size={20} className="text-primary" /> Informations Générales
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Nom de la Boutique" defaultValue="Rahima Store" />
              <Input label="Email de contact" defaultValue="contact@rahima.com" />
              <div className="sm:col-span-2">
                <Input label="Description SEO" textarea placeholder="La référence de la cosmétique de luxe..." />
              </div>
            </div>
            <Button className="mt-8">Enregistrer les modifications</Button>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-3 italic">
              <ShieldCheck size={20} className="text-primary" /> Sécurité
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-500 mb-4">Mettez à jour votre mot de passe administrateur.</p>
              <Input label="Mot de passe actuel" type="password" />
              <Input label="Nouveau mot de passe" type="password" />
            </div>
            <Button variant="secondary" className="mt-8 border-primary text-primary hover:bg-primary hover:text-white">Mettre à jour</Button>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
            <h2 className="text-base font-bold mb-4 flex items-center gap-2">
              <Bell size={18} className="text-primary" /> Notifications
            </h2>
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-8 bg-gray-100 rounded-lg"></div>)}
              </div>
            ) : (
              <div className="space-y-4">
                <Toggle 
                  label="Email à chaque vente" 
                  active={preferences.emailOnSale} 
                  onChange={() => handleToggleChange('emailOnSale')}
                />
                <Toggle 
                  label="Alerte stock faible" 
                  active={preferences.lowStockAlert} 
                  onChange={() => handleToggleChange('lowStockAlert')}
                />
                <Toggle 
                  label="Nouveaux clients" 
                  active={preferences.newCustomerAlert} 
                  onChange={() => handleToggleChange('newCustomerAlert')}
                />
              </div>
            )}
          </section>
        </div>
      </div>
    </AdminLayout>
  );
};

const Toggle = ({ label, active = false, onChange }) => (
  <label className="flex items-center justify-between cursor-pointer group" onClick={onChange}>
    <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">{label}</span>
    <div className={`w-10 h-5 rounded-full relative transition-all ${active ? 'bg-primary' : 'bg-gray-200'}`}>
      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${active ? 'right-4' : 'left-1'}`}></div>
    </div>
  </label>
);

export default AdminSettings;
