import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { authService } from '../services/api'
import DeliveryAgentNavbar from '../components/DeliveryAgentNavbar'
import DeliveryRouteMap from '../components/DeliveryRouteMap'

const formatCurrency = (amount) => `Rs. ${amount}`
const getAgentOrderStage = (status) => {
  if (status === 'Assigned to Agent') return 'Accepted'
  if (status === 'Picked from Restaurant') return 'Picked from Restaurant'
  if (status === 'Out for Delivery') return 'On the way'
  if (status === 'Delivered') return 'Delivered'
  return status || 'Accepted'
}

const AgentHome = ({ onLogout }) => {
  const user = authService.getCurrentUser()
  const riderName = user?.name || 'Rider'

  const [availableOrders, setAvailableOrders] = useState([])
  const [activeOrders, setActiveOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoadingId, setActionLoadingId] = useState(null)
  const [recentAction, setRecentAction] = useState(null)
  const [routeOrderId, setRouteOrderId] = useState(null)

  // 🔥 NEW: track previous orders count
  const [, setPrevOrderCount] = useState(0)

  const fetchOrders = async () => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    const [availableResult, activeResult] = await Promise.all([
      authService.getAvailableAgentOrders(user.id),
      authService.getAgentActiveOrders(user.id),
    ])

    if (availableResult.success) {
      const newOrders = availableResult.data || []

      // 🚀 NEW: detect new orders
      setPrevOrderCount((currentCount) => {
        if (newOrders.length > currentCount) {
          toast.success('🚀 New Order Received!')
        }

        return newOrders.length
      })
      setAvailableOrders(newOrders)
    } else {
      toast.error(availableResult.error || 'Failed to fetch available orders')
    }

    if (activeResult.success) {
      setActiveOrders(activeResult.data || [])
    } else {
      toast.error(activeResult.error || 'Failed to fetch active orders')
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()

    // 🔥 NEW: Auto refresh every 10 sec
    const interval = setInterval(() => {
      fetchOrders()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleOrderAction = async (orderId, action, restaurantName) => {
    if (!user?.id) {
      toast.error('Delivery agent not found')
      return
    }

    setActionLoadingId(orderId)

    const result = await authService.updateAgentOrderDecision(orderId, user.id, action)

    if (!result.success) {
      toast.error(result.error || `Failed to ${action} order`)
      setActionLoadingId(null)
      return
    }

    setAvailableOrders((currentOrders) =>
      currentOrders.filter((order) => order._id !== orderId)
    )

    if (action === 'accept') {
      setActiveOrders((currentOrders) => [result.data, ...currentOrders])
      setRecentAction(`${restaurantName} assigned to you`)
      toast.success(`Order from ${restaurantName} accepted`)
    } else {
      setRecentAction(`${restaurantName} rejected`)
      toast.success(`Order from ${restaurantName} rejected`)
    }

    setActionLoadingId(null)
  }

  const handleAgentStatusUpdate = async (orderId, status, restaurantName) => {
    if (!user?.id) {
      toast.error('Delivery agent not found')
      return
    }

    setActionLoadingId(orderId)

    const result = await authService.updateAgentOrderStatus(orderId, user.id, status)

    if (!result.success) {
      toast.error(result.error || 'Failed to update order status')
      setActionLoadingId(null)
      return
    }

    if (status === 'delivered') {
      setActiveOrders((currentOrders) =>
        currentOrders.filter((order) => order._id !== orderId)
      )
      setRecentAction(`${restaurantName} delivered successfully`)
      toast.success(`Order from ${restaurantName} marked delivered`)
    } else {
      setActiveOrders((currentOrders) =>
        currentOrders.map((order) => (order._id === orderId ? result.data : order))
      )
      setRecentAction(`${restaurantName} picked from restaurant`)
      toast.success(`Order from ${restaurantName} picked from restaurant`)
    }

    setActionLoadingId(null)
  }

  const todayEarnings = activeOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0)
  const completedOrders = 12
  const nextPickup = activeOrders[0] || availableOrders[0] || null

  return (
    <div className="min-h-screen bg-orange-50">
      <DeliveryAgentNavbar onLogout={onLogout} />

      <div className="py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 rounded-4xl bg-white p-8 shadow-xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Hello, {riderName} <span aria-label="waving hand">Hi</span>
                </p>
                <h1 className="mt-3 text-4xl font-bold text-slate-900">Delivery dashboard</h1>
                <p className="mt-2 max-w-2xl text-gray-600">
                  Track your current delivery activity, review available orders, and stay online to accept new pickups.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3 rounded-3xl border border-green-200 bg-green-50 px-4 py-3">
                  <span className="inline-flex h-3.5 w-3.5 rounded-full bg-green-500" />
                  <div>
                    <p className="text-sm text-green-700">Online</p>
                    <p className="text-xs text-green-600">Accepting orders</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-orange-100 bg-orange-50 p-6">
                <p className="text-sm text-gray-500">Today</p>
                <p className="mt-3 text-3xl font-bold text-slate-900">{formatCurrency(todayEarnings)}</p>
              </div>
              <div className="rounded-[1.75rem] border border-orange-100 bg-white p-6">
                <p className="text-sm text-gray-500">Active</p>
                <p className="mt-3 text-3xl font-bold text-slate-900">{activeOrders.length}</p>
              </div>
              <div className="rounded-[1.75rem] border border-orange-100 bg-white p-6">
                <p className="text-sm text-gray-500">Completed</p>
                <p className="mt-3 text-3xl font-bold text-slate-900">{completedOrders}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="rounded-4xl bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4">
                  <div>
                    <p className="text-sm font-semibold text-orange-500">Available Orders</p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">New pickups nearby</h2>
                  </div>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                    {availableOrders.length} new
                  </span>
                </div>

                <div className="mt-6 space-y-5">
                  {loading ? (
                    <div className="rounded-3xl border border-dashed border-orange-200 bg-orange-50 p-6 text-center text-sm text-gray-600">
                      Loading delivery orders...
                    </div>
                  ) : availableOrders.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-orange-200 bg-orange-50 p-6 text-center text-sm text-gray-600">
                      No available orders right now.
                    </div>
                  ) : (
                    availableOrders.map((order) => {
                      const restaurantName = order.restaurantId?.name || 'Restaurant'
                      const isUpdating = actionLoadingId === order._id

                      return (
                        <div key={order._id} className="rounded-3xl border border-gray-200 p-5 shadow-sm">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-semibold text-slate-900">{restaurantName}</h3>
                              <p className="mt-1 text-sm text-gray-500">Order #{order._id.slice(-6)}</p>
                            </div>

                            <div className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                              {formatCurrency(order.totalPrice || 0)}
                            </div>
                          </div>

                          <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-3xl bg-orange-50 p-4">
                              <p className="text-xs uppercase tracking-[0.2em] text-orange-500">Pickup</p>
                              <p className="mt-2 text-sm text-slate-700">
                                {order.restaurantId?.location || 'Restaurant location not available'}
                              </p>
                            </div>
                            <div className="rounded-3xl bg-slate-50 p-4">
                              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Drop</p>
                              <p className="mt-2 text-sm text-slate-700">{order.address}</p>
                            </div>
                          </div>

                          <div className="mt-4 rounded-3xl bg-gray-50 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Items</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {order.items?.map((item, index) => (
                                <span
                                  key={`${order._id}-${item.name}-${index}`}
                                  className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700"
                                >
                                  {item.quantity}x {item.name}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-5 flex flex-wrap gap-3">
                            <button
                              onClick={() => handleOrderAction(order._id, 'reject', restaurantName)}
                              disabled={isUpdating}
                              className={`rounded-3xl border px-4 py-2 text-sm font-semibold transition ${
                                isUpdating
                                  ? 'cursor-not-allowed border-gray-200 text-gray-400'
                                  : 'border-red-200 text-red-600 hover:bg-red-50'
                              }`}
                            >
                              {isUpdating ? 'Updating...' : 'Reject'}
                            </button>
                            <button
                              onClick={() => handleOrderAction(order._id, 'accept', restaurantName)}
                              disabled={isUpdating}
                              className={`rounded-3xl px-4 py-2 text-sm font-semibold text-white transition ${
                                isUpdating
                                  ? 'cursor-not-allowed bg-gray-300'
                                  : 'bg-orange-500 hover:bg-orange-600'
                              }`}
                            >
                              {isUpdating ? 'Updating...' : 'Accept'}
                            </button>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

              <div className="rounded-4xl bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4">
                  <div>
                    <p className="text-sm font-semibold text-orange-500">Accepted Orders</p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">Manage active deliveries</h2>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                    {activeOrders.length} active
                  </span>
                </div>

                <div className="mt-6 space-y-5">
                  {loading ? (
                    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-gray-600">
                      Loading accepted orders...
                    </div>
                  ) : activeOrders.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-gray-600">
                      Accepted orders will appear here after you pick one up.
                    </div>
                  ) : (
                    activeOrders.map((order) => {
                      const restaurantName = order.restaurantId?.name || 'Restaurant'
                      const isUpdating = actionLoadingId === order._id
                      const isRouteOpen = routeOrderId === order._id
                      const canMarkPicked = ['Assigned to Agent', 'Out for Delivery'].includes(order.status)

                      return (
                      <div key={`active-${order._id}`} className="rounded-3xl border border-gray-200 p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold text-slate-900">{restaurantName}</h3>
                            <p className="mt-1 text-sm text-gray-500">Order #{order._id.slice(-6)}</p>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <div className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                              {formatCurrency(order.totalPrice || 0)}
                            </div>
                            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                              {getAgentOrderStage(order.status)}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-3xl bg-orange-50 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-orange-500">Pickup</p>
                            <p className="mt-2 text-sm text-slate-700">
                              {order.restaurantId?.location || 'Restaurant location not available'}
                            </p>
                          </div>
                          <div className="rounded-3xl bg-slate-50 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Drop</p>
                            <p className="mt-2 text-sm text-slate-700">{order.address}</p>
                          </div>
                        </div>

                        <div className="mt-4 rounded-3xl bg-gray-50 p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Items</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {order.items?.map((item, index) => (
                              <span
                                key={`active-${order._id}-${item.name}-${index}`}
                                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700"
                              >
                                {item.quantity}x {item.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">
                          <button
                            onClick={() => handleAgentStatusUpdate(order._id, 'picked', restaurantName)}
                            disabled={isUpdating || !canMarkPicked}
                            className={`rounded-3xl px-4 py-2 text-sm font-semibold text-white transition ${
                              isUpdating || !canMarkPicked
                                ? 'cursor-not-allowed bg-slate-400'
                                : 'bg-slate-900 hover:bg-slate-800'
                            }`}
                          >
                            {isUpdating && canMarkPicked ? 'Updating...' : 'Picked from Restaurant'}
                          </button>
                          <button
                            onClick={() => handleAgentStatusUpdate(order._id, 'delivered', restaurantName)}
                            disabled={isUpdating}
                            className={`rounded-3xl px-4 py-2 text-sm font-semibold text-white transition ${
                              isUpdating
                                ? 'cursor-not-allowed bg-green-300'
                                : 'bg-green-600 hover:bg-green-700'
                            }`}
                          >
                            {isUpdating && !canMarkPicked ? 'Updating...' : 'Delivered'}
                          </button>
                          <button
                            onClick={() => setRouteOrderId((current) => (current === order._id ? null : order._id))}
                            className="rounded-3xl border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                          >
                            {isRouteOpen ? 'Hide Direction' : 'Show Direction'}
                          </button>
                        </div>

                        {isRouteOpen && (
                          <DeliveryRouteMap
                            pickupLocation={order.pickupLocation}
                            deliveryLocation={order.deliveryLocation}
                          />
                        )}
                      </div>
                    )})
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-4xl bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div>
                  <p className="text-sm font-semibold text-orange-500">Status</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">Live overview</h2>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div className="rounded-[1.75rem] border border-gray-200 p-5">
                  <p className="text-sm text-gray-500">Next pickup</p>
                  {nextPickup ? (
                    <>
                      <p className="mt-3 text-lg font-semibold text-slate-900">
                        {nextPickup.restaurantId?.name || 'Restaurant'}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        Pickup at {nextPickup.restaurantId?.location || 'Restaurant location not available'}
                      </p>
                    </>
                  ) : (
                    <p className="mt-3 text-sm text-gray-600">No pickup assigned right now.</p>
                  )}
                </div>

                <div className="rounded-[1.75rem] border border-gray-200 p-5">
                  <p className="text-sm text-gray-500">Current load</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">
                    {activeOrders.length} order{activeOrders.length === 1 ? '' : 's'} in progress
                  </p>
                  <p className="mt-2 text-sm text-gray-600">Keep delivery times under 30 minutes.</p>
                </div>

                <div className="rounded-[1.75rem] bg-orange-50 p-5">
                  <p className="text-sm text-orange-600">Recent action</p>
                  <p className="mt-3 text-sm text-slate-900">
                    {recentAction || 'Accept or reject an order to update your activity feed.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentHome
