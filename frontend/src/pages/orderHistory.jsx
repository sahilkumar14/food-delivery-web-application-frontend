import React, { useEffect, useState } from 'react'
import { authService } from '../services/api'

const statusFlow = [
  'Pending',
  'Confirmed',
  'Preparing',
  'Ready for Pickup',
  'Assigned to Agent',
  'Picked from Restaurant',
  'Out for Delivery',
  'Delivered',
]

const formatOrderDate = (dateString) => {
  if (!dateString) return 'Unknown date'
  return new Date(dateString).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      const user = authService.getCurrentUser()
      if (!user?.id) {
        setError('Please log in to view your order history.')
        setLoading(false)
        return
      }

      const response = await authService.getUserOrders(user.id)
      if (response.success) {
        setOrders(response.data || [])
        setSelectedOrder(response.data?.[0] || null)
      } else {
        setError(response.error || 'Unable to load order history.')
      }
      setLoading(false)
    }

    fetchOrders()
  }, [])

  const getStatusIndex = (status) => {
    const index = statusFlow.indexOf(status)
    return index >= 0 ? index : statusFlow.length - 1
  }

  const renderTimeline = (order) => {
    const activeIndex = getStatusIndex(order?.status)
    return (
      <div className="space-y-3">
        {statusFlow.map((status, index) => {
          const completed = index <= activeIndex
          return (
            <div key={status} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={`h-4 w-4 rounded-full border-2 ${completed ? 'bg-orange-500 border-orange-500' : 'border-gray-300'} `}
                />
                {index < statusFlow.length - 1 && <span className={`block h-8 w-px ${completed ? 'bg-orange-300' : 'bg-gray-200'}`} />}
              </div>
              <div>
                <p className={`font-semibold ${completed ? 'text-orange-700' : 'text-gray-500'}`}>{status}</p>
                {completed && index === activeIndex && (
                  <p className="text-sm text-gray-500">Current status</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-orange-600 font-semibold">Loading order history...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 p-4 md:p-10">
      <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="bg-white border border-orange-100 rounded-3xl shadow-lg p-6">
          <h1 className="text-3xl font-extrabold text-orange-600 mb-2">Order History</h1>
          <p className="text-gray-600 mb-6">Tap any order to see its full lifecycle and delivery details.</p>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 text-gray-700">
              No past orders found.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <button
                  key={order._id}
                  type="button"
                  onClick={() => setSelectedOrder(order)}
                  className={`w-full text-left rounded-3xl border px-4 py-4 transition ${selectedOrder?._id === order._id ? 'border-orange-300 bg-orange-50 shadow-sm' : 'border-orange-100 bg-white hover:border-orange-300'}`}
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-orange-600">{order.restaurantId?.name || 'Restaurant'}</p>
                      <p className="text-gray-500 text-sm">Order ID: {order._id}</p>
                    </div>
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                    <span>{formatOrderDate(order.createdAt)}</span>
                    <span className="font-semibold">₹{order.totalPrice ?? '0.00'}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-orange-100 rounded-3xl shadow-lg p-6">
          {selectedOrder ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-orange-700">Order #{selectedOrder._id}</h2>
                <p className="text-gray-600">{selectedOrder.restaurantId?.name || 'Restaurant details unavailable'}</p>
                <p className="mt-2 text-sm text-gray-500">Placed on {formatOrderDate(selectedOrder.createdAt)}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <div className="rounded-3xl border border-orange-100 bg-orange-50 p-4">
                  <p className="text-sm text-gray-500">Delivery Address</p>
                  <p className="mt-2 text-gray-800">{selectedOrder.deliveryLocation?.address || selectedOrder.address || 'Not available'}</p>
                </div>
                <div className="rounded-3xl border border-orange-100 bg-orange-50 p-4">
                  <p className="text-sm text-gray-500">Order Total</p>
                  <p className="mt-2 text-gray-800">₹{selectedOrder.totalPrice ?? '0.00'}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items?.length > 0 ? (
                    selectedOrder.items.map((item, index) => (
                      <div key={index} className="rounded-2xl border border-orange-100 p-4 bg-white">
                        <div className="flex justify-between gap-4">
                          <div>
                            <p className="font-semibold text-gray-700">{item.name || item.foodName || 'Item'}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity ?? item.qty ?? 1}</p>
                          </div>
                          <p className="font-semibold text-gray-800">₹{item.price ?? item.unitPrice ?? 0}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No items available for this order.</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Lifecycle</h3>
                {renderTimeline(selectedOrder)}
              </div>
            </>
          ) : (
            <div className="flex h-full min-h-[320px] items-center justify-center rounded-3xl border border-dashed border-orange-200 bg-orange-50 p-8 text-center text-gray-600">
              Select an order to view the full lifecycle and status details.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderHistory