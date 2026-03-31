import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/landingPage'
import Login from './pages/login'
import Signup from './pages/signup'
import UserProfile from './pages/userProfile'
import OrderHistory from './pages/orderHistory'
import OrdersList from './pages/ordersList'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 text-gray-700">
      <div className="text-center">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="mt-2">Page not found.</p>
        <a href="/" className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded-lg">Go Home</a>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/history" element={<OrderHistory />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
>>>>>>> dev
