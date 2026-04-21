import API from './api';

const getUsers = () => API.get('/users');
const deleteUser = (id) => API.delete(`/users/${id}`);

export default {
  getUsers,
  deleteUser
};
