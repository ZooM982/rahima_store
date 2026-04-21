import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Button from '../../components/common/Button';
import Input from '../../components/ui/Input';
import { Trash2, Image as ImageIcon, Check, Upload, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import productService from '../../services/productService';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Soin Visage',
    description: '',
    mainImage: null,
    mainImagePreview: ''
  });

  const [variants, setVariants] = useState([{ color: '', image: null, imagePreview: '', stock: 0 }]);

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const { data } = await productService.getProductById(id);
        if (!ignore) {
          setFormData({
            name: data.name,
            price: data.price,
            category: data.category,
            description: data.description,
            mainImage: null,
            mainImagePreview: data.mainImage
          });
          setVariants(data.variants.map(v => ({
            color: v.color,
            image: null,
            imagePreview: v.image,
            stock: v.stock
          })));
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          alert("Erreur lors de la récupération du produit");
          navigate('/admin/products');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      ignore = true;
    };
  }, [id, navigate]);

  const handleFileChange = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => callback(file, reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleVariantChange = (i, field, value) => {
    const newVariants = [...variants];
    newVariants[i][field] = value;
    setVariants(newVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        mainImage: formData.mainImagePreview, // Use preview (base64 or original URL)
        price: Number(formData.price),
        variants: variants.map(v => ({ ...v, image: v.imagePreview, stock: Number(v.stock) })),
        stock: variants.reduce((acc, v) => acc + Number(v.stock), 0)
      };
      await productService.updateProduct(id, payload);
      navigate('/admin/products');
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <AdminLayout>
      <div className="h-96 flex flex-col items-center justify-center text-gray-400">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p>Récupération du produit...</p>
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <Link to="/admin/products" className="text-xs font-bold text-gray-400 hover:text-primary flex items-center gap-1 mb-2">
            <ArrowLeft size={14} /> Revenir à la liste
          </Link>
          <h1 className="text-3xl font-serif">Modifier : {formData.name}</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8 pb-20 items-start">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
            <h2 className="text-lg font-bold mb-6 italic">Détails de l'article</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Nom" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <Input label="Prix" type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              <div className="sm:col-span-2 mt-2">
                <Input label="Description" textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
            <h2 className="text-lg font-bold mb-6 italic">Variantes & Stocks</h2>
            <div className="space-y-4">
              {variants.map((v, i) => (
                <div key={i} className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row gap-6">
                  <div className="space-y-4 flex-1">
                    <Input label="Couleur" value={v.color} onChange={e => handleVariantChange(i, 'color', e.target.value)} />
                    <Input label="Stock" type="number" value={v.stock} onChange={e => handleVariantChange(i, 'stock', e.target.value)} />
                  </div>
                  <div className="w-full sm:w-48">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Changer Photo</label>
                    <div className="relative h-28 w-full rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden hover:border-primary transition-colors cursor-pointer">
                      <img src={v.imagePreview} className="w-full h-full object-cover" alt="" />
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleFileChange(e, (f, p) => handleVariantChange(i, 'imagePreview', p))} />
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
                <img src={formData.mainImagePreview} className="w-full h-full object-cover" alt="" />
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleFileChange(e, (f, p) => setFormData({...formData, mainImagePreview: p}))} />
             </div>
          </section>

          <section className="bg-white p-6 rounded-3xl shadow-sm whitespace-nowrap border border-gray-50">
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? <Loader2 className="animate-spin" /> : <><Check size={20} /> Enregistrer les modifications</>}
            </Button>
          </section>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AdminEditProduct;
