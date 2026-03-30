import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState('customer')

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-white flex items-center justify-center px-4 py-12"
         style={{ backgroundImage: 'radial-gradient(circle at 25% 20%, rgba(251, 146, 60, 0.15) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(249, 115, 22, 0.16) 0, transparent 30%)' }}>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-orange-200 overflow-hidden relative">
        <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-orange-300/40 blur-2xl" />
        <div className="absolute bottom-[-22px] left-[-12px] w-20 h-20 rounded-full bg-orange-300/30 blur-2xl" />
        <h1 className="text-4xl font-extrabold text-orange-500 text-center">Welcome Back!</h1>
        <p className="text-center text-gray-600 mt-2">Login as Customer, Restaurant, or Delivery Agent.</p>

        <div className="mt-6 flex gap-2 justify-center flex-wrap">
          {['customer', 'restaurant', 'agent'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRole(item)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                role === item
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white text-orange-500 border border-orange-300 hover:bg-orange-50'
              }`}
            >
              {item === 'agent' ? 'Delivery Agent' : item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        <form className="mt-8 space-y-5">
          <label className="block">
            <span className="text-orange-600">Email</span>
            <input type="email" required className="mt-1 block w-full rounded-xl border border-orange-200 px-4 py-2 focus:border-orange-400 focus:ring-orange-400 outline-none" placeholder="you@example.com" />
          </label>

          <label className="block">
            <span className="text-orange-600">Password</span>
            <input type="password" required className="mt-1 block w-full rounded-xl border border-orange-200 px-4 py-2 focus:border-orange-400 focus:ring-orange-400 outline-none" placeholder="********" />
          </label>

          <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition">Login as {role === 'agent' ? 'Delivery Agent' : role.charAt(0).toUpperCase() + role.slice(1)}</button>
        </form>

        <div className="text-center mt-5">
          <button onClick={() => navigate('/')} className="text-orange-600 hover:text-orange-700 font-medium">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login