import API from './api';

const getProducts = () => API.get('/products');
const getProductById = (id) => API.get(`/products/${id}`);
const createProduct = (productData) => API.post('/products', productData);
const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
const deleteProduct = (id) => API.delete(`/products/${id}`);

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
