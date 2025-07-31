import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AdminProductForm from "./pages/AdminProductForm";
import AdminCategoryForm from "./pages/AdminCategoryForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProductList from "./pages/AdminProductList";
import AdminCategoryList from "./pages/AdminCategoryList";
import AdminRoute from "./components/AdminRoute";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import OrderHistory from "./pages/OrderHistory";
import OrderDetail from "./pages/OrderDetail";
import Payment from "./pages/Payment";
import OrderSuccess from './pages/OrderSuccess';
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUsers';
import AdminCoupons from './pages/AdminCoupons';
import AdminBanners from './pages/AdminBanners';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminReviews from './pages/AdminReviews';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/order-detail/:id" element={<OrderDetail />} />
            <Route path="/payment/:orderId" element={<Payment />} />
            <Route path="/order-success/:orderId" element={<OrderSuccess />} />
            <Route path="/admin/reviews" element={<AdminRoute><AdminReviews /></AdminRoute>} />

            {/* Protected User Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
            <Route path="/admin/coupons" element={<AdminRoute><AdminCoupons /></AdminRoute>} />
            <Route path="/admin/banners" element={<AdminRoute><AdminBanners /></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><AdminProductList /></AdminRoute>} />
            <Route path="/admin/products/new" element={<AdminRoute><AdminProductForm /></AdminRoute>} />
            <Route path="/admin/products/:id/edit" element={<AdminRoute><AdminProductForm /></AdminRoute>} />
            <Route path="/admin/categories" element={<AdminRoute><AdminCategoryList /></AdminRoute>} />
            <Route path="/admin/categories/new" element={<AdminRoute><AdminCategoryForm /></AdminRoute>} />
            <Route path="/admin/categories/:id/edit" element={<AdminRoute><AdminCategoryForm /></AdminRoute>} />

            {/* Optional: 404 Route */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
};

export default App;