import React, { useState, useEffect } from "react";
import RestaurantSidebar from "../components/RestaurantSidebar";
import RestaurantTopbar from "../components/RestaurantTopbar";
import StatsCard from "../components/StatsCard";
import OrderCard from "../components/OrderCard";
import OrderDetailPlaceholder from "../components/OrderDetailPlaceholder";
import { authService } from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RestaurantHomeContent } from "./restaurantHome";
import { getCurrentCoordinates } from "../utils/location";

const OrdersList = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [orders, setOrders] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [stats, setStats] = useState({
    todayRevenue: 0,
    todayOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });

  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    onLogout(); // Update global state
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const user = authService.getCurrentUser();
      if (user && user.role === 'restaurant' && user.id) {
        setRestaurant({
          id: user.id,
          name: user.name,
          email: user.email,
          location: user.location,
        });

        const [ordersResult, profileResult] = await Promise.all([
          authService.getRestaurantOrders(user.id),
          authService.getRestaurantProfile(user.id),
        ]);

        if (profileResult.success) {
          setRestaurant(profileResult.data);

          if (!profileResult.data?.locationCoordinates && navigator.geolocation) {
            try {
              const coords = await getCurrentCoordinates();
              const locationResult = await authService.updateRestaurantLocation(user.id, {
                location: profileResult.data.location,
                locationCoordinates: coords,
              });

              if (locationResult.success) {
                setRestaurant(locationResult.data);
                authService.saveUser({
                  ...user,
                  location: locationResult.data.location,
                  locationCoordinates: locationResult.data.locationCoordinates,
                });
              }
            } catch {
              // Ignore geolocation sync failures silently.
            }
          }
        }

        if (ordersResult.success) {
          setOrders(ordersResult.data);
          
          // Calculate stats
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          const todayOrders = ordersResult.data.filter(order => 
            new Date(order.createdAt) >= today
          );
          
          const pendingOrders = ordersResult.data.filter(order => 
            order.status === 'Pending'
          );
          
          const completedOrders = ordersResult.data.filter(order => 
            order.status === 'Delivered'
          );
          
          const todayRevenue = todayOrders.reduce((sum, order) => sum + order.totalPrice, 0);
          
          setStats({
            todayRevenue,
            todayOrders: todayOrders.length,
            pendingOrders: pendingOrders.length,
            completedOrders: completedOrders.length,
          });
        } else {
          toast.error(ordersResult.error || 'Failed to fetch orders');
        }

        if (!profileResult.success) {
          toast.error(profileResult.error || 'Failed to fetch restaurant profile');
        }
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handleOrderAction = async (order) => {
    if (!restaurant?._id && !restaurant?.id) {
      toast.error('Restaurant session not found');
      return;
    }

    const action = order.status === 'pending' ? 'accept' : order.status === 'confirmed' ? 'ready' : null;

    if (!action) {
      return;
    }

    setActionLoadingId(order.id);

    const result = await authService.updateRestaurantOrderStatus(
      order.id,
      restaurant._id || restaurant.id,
      action
    );

    if (!result.success) {
      toast.error(result.error || 'Failed to update order');
      setActionLoadingId(null);
      return;
    }

    setOrders((currentOrders) =>
      currentOrders.map((currentOrder) =>
        currentOrder._id === order.id ? result.data : currentOrder
      )
    );

    toast.success(
      action === 'accept'
        ? 'Order accepted. Start preparing it now.'
        : 'Order marked ready for pickup. Delivery agent can see it now.'
    );
    setActionLoadingId(null);
  };

  // Transform orders to match the expected format
  const transformOrders = (orders) => {
    return orders.map(order => ({
      id: order._id,
      time: new Date(order.createdAt).toLocaleString(),
      customer: order.userId?.name || 'Unknown',
      phone: order.userId?.mob || 'N/A',
      address: order.address,
      status: order.status.toLowerCase().replace(/\s+/g, '_'),
      rawStatus: order.status,
      total: `$${order.totalPrice.toFixed(2)}`,
      items: order.items.map(item => ({
        name: `${item.quantity}x ${item.name}`,
        price: `$${(item.price * item.quantity).toFixed(2)}`
      })),
      action: order.status === 'Pending' ? 'Accept Order' : 
              order.status === 'Confirmed' ? 'Mark Ready' : '',
      actionClass: order.status === 'Pending' ? 'bg-primary hover:opacity-90' :
                   order.status === 'Confirmed' ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500' : '',
    }));
  };

  const activeOrders = transformOrders(orders.filter(order => 
    ['Pending', 'Confirmed', 'Ready for Pickup', 'Assigned to Agent', 'Picked from Restaurant', 'Out for Delivery'].includes(order.status)
  ));

  const recentDelivered = orders.find(order => order.status === 'Delivered');

  const statsData = [
    {
      id: 1,
      title: "Today's Revenue",
      value: `$${stats.todayRevenue.toFixed(2)}`,
      growth: "",
      icon: "$",
      iconBg: "bg-green-500",
    },
    {
      id: 2,
      title: "Today's Orders",
      value: stats.todayOrders.toString(),
      growth: "",
      icon: "👜",
      iconBg: "bg-primary",
    },
    {
      id: 3,
      title: "Pending Orders",
      value: stats.pendingOrders.toString(),
      growth: "",
      icon: "🕒",
      iconBg: "bg-orange-500",
    },
    {
      id: 4,
      title: "Completed",
      value: stats.completedOrders.toString(),
      growth: "",
      icon: "✓",
      iconBg: "bg-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <RestaurantSidebar activeTab={activeTab} setActiveTab={setActiveTab} restaurant={restaurant} />

      <div className="flex-1">
        <RestaurantTopbar onLogout={handleLogout} />

        <div className="p-8">
          <div className="border border-border bg-card rounded-sm">
            <div className="border-b border-border px-8 py-6 flex items-center justify-between">
              <h1 className="text-[28px] font-semibold">
                {activeTab === "home" && "Home"}
                {activeTab === "orders" && "Orders"}
                {activeTab === "menu" && "Menu Items"}
                {activeTab === "statistics" && "Statistics"}
              </h1>

              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                🏪
              </div>
            </div>

            <div className="p-8">
              {activeTab === "home" && <RestaurantHomeContent />}

              {activeTab === "orders" && (
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-7 space-y-6">
                    {loading ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Loading orders...</p>
                      </div>
                    ) : activeOrders.length > 0 ? (
                      activeOrders.map((order) => (
                        <OrderCard
                          key={order.id}
                          order={order}
                          onAction={handleOrderAction}
                          isUpdating={actionLoadingId === order.id}
                        />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No active orders</p>
                      </div>
                    )}

                    {recentDelivered && (
                      <div className="bg-card border border-border rounded-[24px] p-7 shadow-sm">
                        <h2 className="text-[18px] font-semibold mb-5">
                          Recently Delivered
                        </h2>

                        <div className="rounded-2xl bg-accent/40 p-5 flex items-center justify-between">
                          <div>
                            <h3 className="text-[18px] font-medium">{recentDelivered._id}</h3>
                            <p className="text-muted-foreground">
                              {recentDelivered.userId?.name || 'Unknown'} • {new Date(recentDelivered.createdAt).toLocaleString()}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-[18px] font-semibold">${recentDelivered.totalPrice.toFixed(2)}</p>
                            <span className="inline-block mt-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm">
                              ✓ Delivered
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-span-5">
                    <OrderDetailPlaceholder />
                  </div>
                </div>
              )}

              {activeTab === "statistics" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-4 gap-6">
                    {statsData.map((item) => (
                      <StatsCard
                        key={item.id}
                        icon={item.icon}
                        title={item.title}
                        value={item.value}
                        growth={item.growth}
                        iconBg={item.iconBg}
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-6">
                      <h2 className="text-[18px] font-semibold mb-5">Active Orders</h2>
                      {activeOrders.length > 0 ? (
                        <OrderCard order={activeOrders[0]} />
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No active orders</p>
                        </div>
                      )}
                    </div>

                    <div className="col-span-6">
                      <OrderDetailPlaceholder />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "menu" && (
                <div className="bg-card border border-border rounded-[24px] p-8 shadow-sm">
                  <h2 className="text-[20px] font-semibold mb-3">Menu Items</h2>
                  <p className="text-muted-foreground">
                    This section will contain your restaurant menu list, prices,
                    availability and edit actions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
