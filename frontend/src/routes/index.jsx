import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks';
import { Home, Login, Register, Verify, ForgotPassword, ResetPassword, Users, Contact, Profile, Cart, ProductForm, ProductDetail, NotFound } from '../pages';

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
        <Route path="/product-add" element={<ProductForm />} />
        <Route path="/product-edit/:product_id" element={<ProductForm />} />
        <Route path="/product-detail/:product_id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
