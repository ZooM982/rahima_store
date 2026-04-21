import API from './api';

const getOrders = () => API.get('/orders');
const getOrderById = (id) => API.get(`/orders/${id}`);
const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { status });

const createOrder = (orderData) => API.post('/orders', orderData);

export default {
  getOrders,
  getOrderById,
  updateOrderStatus,
  createOrder
};
