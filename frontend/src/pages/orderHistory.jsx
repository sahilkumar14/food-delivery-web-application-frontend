import React from 'react'

const pastOrders = [
  { id: 'H10021', restaurant: 'Tasty Taco', date: '2026-03-26', total: '$24.50', status: 'Delivered' },
  { id: 'H10018', restaurant: 'Noodle Palace', date: '2026-03-22', total: '$18.20', status: 'Delivered' },
  { id: 'H10014', restaurant: 'Green Bowl', date: '2026-03-18', total: '$27.70', status: 'Delivered' },
]

const OrderHistory = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-4 md:p-10">
      <div className="max-w-5xl mx-auto bg-white border border-orange-200 rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-orange-500 mb-4">Order History</h1>
        <p className="text-gray-600 mb-6">Your previous completed deliveries, perfect for reordering favorites.</p>

        <div className="space-y-4">
          {pastOrders.map((order) => (
            <div key={order.id} className="p-4 rounded-2xl border border-orange-100 bg-orange-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-bold text-orange-600">{order.restaurant}</p>
                  <p className="text-gray-600">Order ID: {order.id}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">{order.status}</span>
              </div>
              <div className="mt-3 flex justify-between text-gray-700">
                <span>{order.date}</span>
                <span className="font-semibold">{order.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderHistory