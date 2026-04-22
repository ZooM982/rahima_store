import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { Loader2 } from 'lucide-react';

// Core pages (could be lazy too, but keeping them for now)
import Home from './pages/Home';
import Products from './pages/Products';

// Lazy loaded pages
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminAddProduct = lazy(() => import('./pages/admin/AdminAddProduct'));
const AdminEditProduct = lazy(() => import('./pages/admin/AdminEditProduct'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));
const AdminOrderDetails = lazy(() => import('./pages/admin/AdminOrderDetails'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminUserDetails = lazy(() => import('./pages/admin/AdminUserDetails'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const ConditionsGenerales = lazy(() => import('./pages/legal/ConditionsGenerales'));
const PolitiqueConfidentialite = lazy(() => import('./pages/legal/PolitiqueConfidentialite'));
const LivraisonRetours = lazy(() => import('./pages/legal/LivraisonRetours'));
const FAQ = lazy(() => import('./pages/legal/FAQ'));

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import ScrollToTop from './components/common/ScrollToTop';

const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-bg-soft">
    <Loader2 className="animate-spin text-primary" size={32} />
  </div>
);

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
  const isDashboardPage = location.pathname === '/dashboard';

  return (
    <div className={`min-h-screen ${isAuthPage ? 'h-screen overflow-hidden' : 'bg-bg-soft font-sans'}`}>
      {!isAuthPage && !isAdminPage && <Navbar />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" 
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/conditions-generales" element={<ConditionsGenerales />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/livraison-retours" element={<LivraisonRetours />} />
          <Route path="/faq" element={<FAQ />} />
          
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
                  <Route path="/users/:email" element={<AdminUserDetails />} />
                  <Route path="/settings" element={<AdminSettings />} />
                </Routes>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Suspense>
      {!isAuthPage && !isAdminPage && !isDashboardPage && <Footer />}
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
