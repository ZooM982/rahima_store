import React, { useState } from 'react';
import API from '../services/api';

import { AuthContext } from '../hooks/useAuth';


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('rahima_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const loading = false;

  // No useEffect needed for initial sync from localStorage anymore


  const login = async (email, password) => {
    const response = await API.post('/auth/login', { email, password });
    const { token, user: userData } = response.data;
    
    localStorage.setItem('rahima_token', token);
    localStorage.setItem('rahima_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password) => {
    await API.post('/auth/register', { name, email, password });
  };

  const logout = () => {
    localStorage.removeItem('rahima_token');
    localStorage.removeItem('rahima_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isAdmin: user?.role === 'admin' }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
