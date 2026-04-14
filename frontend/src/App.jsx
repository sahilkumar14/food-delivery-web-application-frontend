import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import LandingPage from './pages/landingPage'
import Home from './pages/Home'
import Login from './pages/login'
import Signup from './pages/signup'
import UserProfile from './pages/userProfile'
import OrderHistory from './pages/orderHistory'
import OrdersList from './pages/ordersList'
import RestaurantDetail from './pages/RestaurantDetail'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

// ✅ Add these
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'
import { Toaster } from 'react-hot-toast'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100 text-gray-800">
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
    setIsLoggedIn(false);
  };

  const isRestaurantDashboard = location.pathname === "/orders";


  
  return (
    <>
      {/* Navbar */}
      {!isRestaurantDashboard && (
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
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <RestaurantDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <OrderHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <OrdersList />
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
      {!isRestaurantDashboard && <Footer />}

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