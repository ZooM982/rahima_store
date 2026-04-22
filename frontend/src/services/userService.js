import API from './api';

const getUsers = () => API.get('/users');
const deleteUser = (id) => API.delete(`/users/${id}`);

// Notifications
const getNotifications = () => API.get('/notifications');
const markAllAsRead = () => API.put('/notifications/read-all');
const markAsRead = (id) => API.put(`/notifications/${id}/read`);

const getCustomerDetails = (email) => API.get(`/users/customer/${email}`);

export default {
  getUsers,
  deleteUser,
  getCustomerDetails,
  getNotifications,
  markAllAsRead,
  markAsRead
};
