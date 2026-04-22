import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Button from '../../components/common/Button';
import Input from '../../components/ui/Input';
import { Plus, Trash2, Image as ImageIcon, Check, Upload, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import productService from '../../services/productService';

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Soin Visage',
    description: '',
    mainImage: null,
    mainImagePreview: ''
  });

  const [variants, setVariants] = useState([{ color: '', image: null, imagePreview: '', stock: 0 }]);

  const handleFileChange = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(file, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addVariant = () => setVariants([...variants, { color: '', image: null, imagePreview: '', stock: 0 }]);
  const removeVariant = (i) => setVariants(variants.filter((_, idx) => idx !== i));
  
  const handleVariantChange = (i, field, value) => {
    const newVariants = [...variants];
    newVariants[i][field] = value;
    setVariants(newVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Filter out empty variants before sending
      const validVariants = variants
        .filter(v => v.color.trim() !== '' || v.imagePreview !== '')
        .map(v => ({
          color: v.color,
          image: v.imagePreview,
          stock: Number(v.stock) || 0
        }));

      const payload = {
        ...formData,
        mainImage: formData.mainImagePreview, 
        price: Number(formData.price),
        variants: validVariants,
        stock: validVariants.reduce((acc, v) => acc + Number(v.stock), 0)
      };
      await productService.createProduct(payload);
      navigate('/admin/products');
    } catch (err) {
      alert("Erreur : " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <Link to="/admin/products" className="text-xs font-bold text-gray-400 hover:text-primary flex items-center gap-1 mb-2">
            <ArrowLeft size={14} /> Revenir à la liste
          </Link>
          <h1 className="text-3xl font-serif">Nouveau Produit</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8 pb-20 items-start">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
            <h2 className="text-lg font-bold mb-6 italic underline underline-offset-8 decoration-primary/30">Détails de l'article</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Nom" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              <Input label="Prix (FCFA)" type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 px-2">Catégorie</label>
                <select 
                  className="w-full px-5 py-3.5 rounded-2xl bg-bg-soft border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  {['Vêtements Homme', 'Vêtements Femme', 'Montres', 'Parfums', 'Sacs', 'Soin Visage', 'Maquillage', 'Accessoires'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Input label="Description" textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold italic">Variantes (Couleurs)</h2>
              <button type="button" onClick={addVariant} className="text-primary font-bold text-xs flex items-center gap-1"><Plus size={14} /> Ajouter une couleur</button>
            </div>
            <div className="space-y-4">
              {variants.map((v, i) => (
                <div key={i} className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row gap-6 relative group">
                  {variants.length > 1 && (
                    <button type="button" onClick={() => removeVariant(i)} className="absolute -top-2 -right-2 bg-white text-red-500 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                  )}
                  
                  <div className="space-y-4 flex-1">
                    <Input label="Nom de la couleur" value={v.color} onChange={e => handleVariantChange(i, 'color', e.target.value)} />
                    <Input label="Stock disponible" type="number" value={v.stock} onChange={e => handleVariantChange(i, 'stock', e.target.value)} />
                  </div>

                  <div className="w-full sm:w-48">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Photo variante</label>
                    <div className="relative h-28 w-full rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden hover:border-primary transition-colors cursor-pointer">
                      {v.imagePreview ? (
                        <img src={v.imagePreview} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <Upload size={20} className="text-gray-300" />
                      )}
                      <input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={(e) => handleFileChange(e, (file, preview) => {
                          handleVariantChange(i, 'image', file);
                          handleVariantChange(i, 'imagePreview', preview);
                        })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-24 space-y-6">
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
             <h2 className="text-base font-bold mb-4 flex items-center gap-2"><ImageIcon size={18} className="text-primary" /> Image Principale</h2>
             <div className="relative h-60 w-full rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden hover:border-primary transition-colors cursor-pointer">
                {formData.mainImagePreview ? (
                  <img src={formData.mainImagePreview} className="w-full h-full object-cover" alt="Main Preview" />
                ) : (
                  <>
                    <Upload size={32} className="text-gray-300 mb-2" />
                    <span className="text-xs font-bold text-gray-400 uppercase">Choisir le profil</span>
                  </>
                )}
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  onChange={(e) => handleFileChange(e, (file, preview) => {
                    setFormData({...formData, mainImage: file, mainImagePreview: preview});
                  })}
                />
             </div>
          </section>

          <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
            <Button type="submit" disabled={loading} className="w-full shadow-xl shadow-primary/20">
              {loading ? <Loader2 className="animate-spin" /> : <><Check size={20} /> Publier le produit</>}
            </Button>
          </section>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AdminAddProduct;
