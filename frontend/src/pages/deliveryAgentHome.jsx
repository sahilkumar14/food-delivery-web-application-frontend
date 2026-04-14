
import React from 'react'

const AgentHome = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">Delivery Agent Dashboard</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Welcome to your delivery agent dashboard. Here you can manage your deliveries and view assigned orders.</p>
          {/* Add more content as needed */}
        </div>
      </div>
    </div>
  )
}

export default AgentHome