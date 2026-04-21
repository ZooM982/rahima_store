import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminAddProduct from './pages/admin/AdminAddProduct';
import AdminEditProduct from './pages/admin/AdminEditProduct';
import AdminOrders from './pages/admin/AdminOrders';
import AdminOrderDetails from './pages/admin/AdminOrderDetails';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import ScrollToTop from './components/common/ScrollToTop';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;
  return children;
};

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen ${isAuthPage ? 'h-screen overflow-hidden' : 'bg-bg-soft font-sans'}`}>
      {!isAuthPage && !isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Routes */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute adminOnly>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/products" element={<AdminProducts />} />
                <Route path="/products/add" element={<AdminAddProduct />} />
                <Route path="/products/edit/:id" element={<AdminEditProduct />} />
                <Route path="/orders" element={<AdminOrders />} />
                <Route path="/orders/:id" element={<AdminOrderDetails />} />
                <Route path="/users" element={<AdminUsers />} />
                <Route path="/settings" element={<AdminSettings />} />
              </Routes>
            </ProtectedRoute>
          } 
        />
      </Routes>
      {!isAuthPage && !isAdminPage && <Footer />}
      {!isAuthPage && isAdminPage && <MobileBottomNav />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ScrollToTop />
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
