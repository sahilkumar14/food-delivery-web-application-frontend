import React from 'react'
import { LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const DeliveryAgentNavbar = ({ onLogout }) => {
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <h1
          onClick={()=>navigate('/delivery-agent-home')} 
          className="text-xl font-bold text-orange-600 tracking-wide cursor-pointer">
            🚴 UrbanEats • Agent
          </h1>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Online Status */}
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              <span className="text-sm text-gray-600">Online</span>
            </div>

            {/* Profile */}
            <button
              onClick={() => navigate('/delivery-agent-profile')}
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-orange-400 hover:text-white transition"
            >
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Profile</span>
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-red-50 transition"
            >
              <LogOut className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-red-500">Logout</span>
            </button>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default DeliveryAgentNavbar