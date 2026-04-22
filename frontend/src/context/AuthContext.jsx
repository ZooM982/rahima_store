import React, { useState, useEffect } from 'react';
import API from '../services/api';

import { AuthContext } from '../hooks/useAuth';


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('rahima_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('rahima_token');
    localStorage.removeItem('rahima_user');
    setUser(null);
  };

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

  const updateProfile = async (data) => {
    const response = await API.put('/auth/profile', data);
    setUser(response.data);
    localStorage.setItem('rahima_user', JSON.stringify(response.data));
    return response.data;
  };

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem('rahima_token');
      if (token) {
        try {
          const response = await API.get('/auth/me');
          setUser(response.data);
          localStorage.setItem('rahima_user', JSON.stringify(response.data));
        } catch (error) {
          console.error("Failed to fetch user", error);
          logout();
        }
      }
      setLoading(false);
    };
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading, isAdmin: user?.role === 'admin' }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
