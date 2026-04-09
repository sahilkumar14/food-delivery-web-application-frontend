import React from 'react'

const activeOrders = [
  { id: 'O20265', restaurant: 'Spice Paradise', ordered: '5 min ago', eta: '12 min', status: 'Preparing' },
  { id: 'O20261', restaurant: 'Sushi Corner', ordered: '10 min ago', eta: '15 min', status: 'On the way' },
  { id: 'O20258', restaurant: 'Pasta Fiesta', ordered: '22 min ago', eta: '7 min', status: 'Delivered' },
]

const OrdersList = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 p-4 md:p-10">
      <div className="max-w-5xl mx-auto bg-white border border-orange-100 rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-orange-600 mb-4">Active Orders</h1>
        <p className="text-gray-600 mb-6">Track current orders and delivery status in real time.</p>

        <div className="space-y-4">
          {activeOrders.map((order) => (
            <div key={order.id} className="p-4 rounded-2xl border border-orange-100 flex flex-col md:flex-row md:items-center md:justify-between bg-orange-50">
              <div>
                <p className="text-md font-semibold text-orange-600">{order.restaurant}</p>
                <p className="text-sm text-gray-600">Order ID: {order.id}</p>
              </div>
              <div className="mt-2 md:mt-0 flex gap-3 items-center text-sm">
                <span className="rounded-full bg-white border border-orange-200 text-gray-600 px-3 py-1">Ordered {order.ordered}</span>
                <span className="rounded-full bg-white border border-orange-200 text-gray-600 px-3 py-1">ETA {order.eta}</span>
                <span className={`rounded-full px-3 py-1 ${order.status === 'On the way' ? 'bg-blue-100 text-blue-700' : order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrdersList