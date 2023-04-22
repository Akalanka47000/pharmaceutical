import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks';
import Products from '../pages/product/product.jsx';
import ProductForm from '../pages/product/productAdd.jsx';
import ProductDetail from '../pages/product/productDetail.jsx';
import Order from '../pages/order/order.jsx';
import { Home, Login, Register, Verify, ForgotPassword, ResetPassword, Users, Contact, Profile, NotFound } from '../pages';

const AnimatedRoutes = () => {
  useAuth();

  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productAdd" element={<ProductForm />} />
        <Route path="productDetail/:productId" element={<ProductDetail />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
