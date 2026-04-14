import React from 'react'
import { authService } from '../services/api'
import DeliveryAgentNavbar from '../components/DeliveryAgentNavbar'

const DeliveryAgentProfile = ({ onLogout }) => {
  const user = authService.getCurrentUser()

  // Mock data for demonstration - in real app, fetch from API
  const agentDetails = {
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1234567890',
    vehicleType: user?.vehicleType || 'Bike',
    vehicleNo: user?.vehicleNo || 'ABC123',
    rating: user?.rating || 4.8,
    isOnline: user?.isOnline || true,
    totalDeliveries: 156, // Mock data
    earnings: 12500, // Mock data
    joinDate: '2023-01-15' // Mock data
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <DeliveryAgentNavbar onLogout={onLogout} />

      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white rounded-4xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl text-orange-600 font-bold">
                {agentDetails.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">{agentDetails.name}</h1>
            <p className="text-gray-600 mt-2">Delivery Agent</p>
            <div className="flex items-center justify-center mt-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                agentDetails.isOnline
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <span className={`w-2 h-2 rounded-full mr-2 ${
                  agentDetails.isOnline ? 'bg-green-500' : 'bg-gray-500'
                }`}></span>
                {agentDetails.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Personal Information */}
            <div className="bg-gray-50 rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Personal Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-slate-900">{agentDetails.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-slate-900">{agentDetails.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Join Date</label>
                  <p className="text-slate-900">{new Date(agentDetails.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="bg-gray-50 rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Vehicle Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Vehicle Type</label>
                  <p className="text-slate-900">{agentDetails.vehicleType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Vehicle Number</label>
                  <p className="text-slate-900">{agentDetails.vehicleNo}</p>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="bg-orange-50 rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Performance</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Rating</label>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-slate-900 mr-2">{agentDetails.rating}</span>
                    <span className="text-yellow-500">⭐</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Deliveries</label>
                  <p className="text-2xl font-bold text-slate-900">{agentDetails.totalDeliveries}</p>
                </div>
              </div>
            </div>

            {/* Earnings */}
            <div className="bg-green-50 rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Earnings</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Earnings</label>
                  <p className="text-3xl font-bold text-green-600">₹{agentDetails.earnings.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">This Month</label>
                  <p className="text-xl font-semibold text-slate-900">₹3,250</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryAgentProfile