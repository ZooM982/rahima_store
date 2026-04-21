import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Edit, Trash2, Search, Filter, Loader2 } from 'lucide-react';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import productService from '../../services/productService';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let ignore = false;
    const fetchProducts = async () => {
      try {
        const { data } = await productService.getProducts();
        if (!ignore) setProducts(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des produits", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchProducts();
    return () => { ignore = true; };
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce produit définitivement ?")) {
      try {
        await productService.deleteProduct(id);
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la suppression");
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif">Gestion des Produits</h1>
          <p className="text-gray-400 text-sm">Contrôlez votre inventaire en temps réel.</p>
        </div>
        <Link to="/admin/products/add" className="w-full sm:w-auto">
          <Button className="w-full flex items-center justify-center gap-2">
            <Plus size={18} /> Nouveau Produit
          </Button>
        </Link>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden min-h-[400px] w-full">
        <div className="p-5 border-b border-gray-50 flex flex-wrap gap-4 items-center justify-between bg-gray-50/10">
          <div className="relative flex-1 min-w-[200px] w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Rechercher par nom ou catégorie..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-sm focus:ring-1 focus:ring-primary/30 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {filteredProducts.length} articles trouvés
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 text-gray-400">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p>Chargement des produits...</p>
            </div>
          ) : (
            <table className="w-full text-left min-w-[800px] whitespace-nowrap">
              <thead className="bg-gray-50/30 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                <tr>
                  <th className="px-6 py-4">Produit</th>
                  <th className="px-6 py-4">Catégorie</th>
                  <th className="px-6 py-4">Prix</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProducts.map(p => (
                  <tr key={p._id} className="hover:bg-bg-soft/30 transition-colors text-sm">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.mainImage || '/default-product.png'} className="w-10 h-10 rounded-lg object-cover bg-gray-50" alt="" />
                        <span className="font-bold text-gray-800">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{p.category}</td>
                    <td className="px-6 py-4 font-semibold text-primary">{p.price.toLocaleString()} FCFA</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${p.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                        {p.stock} unités
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 text-gray-300">
                        <Link to={`/admin/products/edit/${p._id}`} className="p-2 hover:bg-bg-soft hover:text-primary rounded-lg transition-all">
                          <Edit size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(p._id)}
                          className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
