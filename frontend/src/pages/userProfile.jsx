import React from 'react'
import { Link } from 'react-router-dom'

const UserProfile = () => {
  const user = {
    name: 'Alex Parker',
    email: 'alex.parker@example.com',
    phone: '+1 234 567 890',
    address: '123 Foodie St, Flavor Town, CA',
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-4 md:p-10">
      <div className="max-w-4xl mx-auto bg-white border border-orange-200 rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-orange-500 mb-4">User Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
            <ul className="mt-3 space-y-3 text-gray-700">
              <li><span className="font-medium text-orange-500">Name:</span> {user.name}</li>
              <li><span className="font-medium text-orange-500">Email:</span> {user.email}</li>
              <li><span className="font-medium text-orange-500">Phone:</span> {user.phone}</li>
              <li><span className="font-medium text-orange-500">Address:</span> {user.address}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
            <div className="mt-3 flex flex-col gap-3">
              <Link to="/orders" className="px-4 py-3 rounded-xl bg-orange-500 text-white text-center">View Orders List</Link>
              <Link to="/history" className="px-4 py-3 rounded-xl bg-orange-500 text-white text-center">View Order History</Link>
              <Link to="/" className="px-4 py-3 rounded-xl border border-orange-300 text-orange-700 text-center">Back to home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile