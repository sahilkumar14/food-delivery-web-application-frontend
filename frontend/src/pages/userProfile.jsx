import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const UserProfile = () => {
  const user = {
    name: 'Alex Parker',
    email: 'alex.parker@example.com',
    phone: '+1 234 567 890',
    address: '123 Foodie St, Flavor Town, CA',
    totalOrders: 24
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 flex items-center justify-center p-4 md:p-10">
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        
        {/* LEFT - PROFILE INFO */}
        <div>
          {/* Avatar + Name */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-500 text-sm">Food Lover 🍔</p>
              </div>
            </div>

            {/* Edit Button */}
            <button className="text-sm px-3 py-1 border border-orange-400 text-orange-500 rounded-lg hover:bg-orange-50 transition">
              ✏️ Edit
            </button>
          </div>

          {/* Orders Badge */}
          <div className="mb-4">
            <span className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-medium">
              📊 Total Orders: {user.totalOrders}
            </span>
          </div>

          {/* Info */}
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Personal Information
          </h2>

          <div className="space-y-3 text-gray-600">
            <p>
              <span className="font-medium text-gray-800">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium text-gray-800">Phone:</span> {user.phone}
            </p>
            <p>
              <span className="font-medium text-gray-800">Address:</span> {user.address}
            </p>
          </div>
        </div>

        {/* RIGHT - ACTIONS */}
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-col gap-4">
            
            <motion.div whileHover={{ scale: 1.03 }}>
              <Link 
                to="/orders" 
                className="block bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-center font-medium transition shadow-md"
              >
                View Orders List
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }}>
              <Link 
                to="/history" 
                className="block bg-orange-100 hover:bg-orange-200 text-orange-600 py-3 rounded-xl text-center font-medium transition"
              >
                View Order History
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }}>
              <Link 
                to="/home" 
                className="block border border-gray-300 hover:bg-gray-100 text-gray-700 py-3 rounded-xl text-center font-medium transition"
              >
                Back to Home
              </Link>
            </motion.div>

          </div>
        </div>

      </motion.div>
    </div>
  )
}

export default UserProfile