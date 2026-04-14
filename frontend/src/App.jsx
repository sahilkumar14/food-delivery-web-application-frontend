import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import LandingPage from './pages/landingPage'
import Home from './pages/Home'
import Login from './pages/login'
import Signup from './pages/signup'
import UserProfile from './pages/userProfile'
import OrderHistory from './pages/orderHistory'
import OrdersList from './pages/ordersList'
import RestaurantDetail from './pages/RestaurantDetail'
import RestaurantHome from './pages/restaurantHome'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import DeliveryAgentHome from './pages/deliveryAgentHome'
import DeliveryAgentProfile from './pages/deliveryAgentProfile'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

// ✅ Add these
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'
import { Toaster } from 'react-hot-toast'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 to-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-orange-600">404</h1>
        <p className="mt-2">Page not found.</p>
        <a
          href="/"
          className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const location = useLocation();

  // ✅ Login handler
  const handleAuth = (token) => {
    localStorage.setItem("token", token || "dummy")
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  // Wrapper component for OrdersList to pass logout handler
  const OrdersListWithLogout = () => <OrdersList onLogout={handleLogout} />;

  // Wrapper component for DeliveryAgentHome to pass logout handler
  const DeliveryAgentHomeWithLogout = () => <DeliveryAgentHome onLogout={handleLogout} />;

  // Wrapper component for DeliveryAgentProfile to pass logout handler
  const DeliveryAgentProfileWithLogout = () => <DeliveryAgentProfile onLogout={handleLogout} />;

  const isRestaurantDashboard = location.pathname === "/orders";
  const isAgentRoute = location.pathname.startsWith("/delivery-agent");


  
  return (
    <>
      {!isRestaurantDashboard && !isAgentRoute && (
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <Login onAuth={handleAuth} />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <Signup onAuth={handleAuth} />
            </PublicRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="customer">
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="customer">
              <RestaurantDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="customer">
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="customer">
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="customer">
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="customer">
              <OrderHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="restaurant">
              <OrdersListWithLogout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/delivery-agent-home"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="agent">
              <DeliveryAgentHomeWithLogout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/delivery-agent-profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="agent">
              <DeliveryAgentProfileWithLogout />
            </ProtectedRoute>
          }
        />

        {/* ✅ Restaurant Dashboard */}
        <Route
          path="/restaurant"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <RestaurantHome />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer */}
      {!isRestaurantDashboard && !isAgentRoute && <Footer />}

      <Toaster position="top-right" />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
