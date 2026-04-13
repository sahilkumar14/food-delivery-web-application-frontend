import React, { useState } from "react";
import RestaurantSidebar from "../components/RestaurantSidebar";
import RestaurantTopbar from "../components/RestaurantTopbar";
import StatsCard from "../components/StatsCard";
import OrderCard from "../components/OrderCard";
import OrderDetailPlaceholder from "../components/OrderDetailPlaceholder";

const statsData = [
  {
    id: 1,
    title: "Today's Revenue",
    value: "$1,245",
    growth: "+18.2%",
    icon: "$",
    iconBg: "bg-green-500",
  },
  {
    id: 2,
    title: "Today's Orders",
    value: "32",
    growth: "+12.5%",
    icon: "👜",
    iconBg: "bg-primary",
  },
  {
    id: 3,
    title: "Pending Orders",
    value: "8",
    growth: "",
    icon: "🕒",
    iconBg: "bg-orange-500",
  },
  {
    id: 4,
    title: "Completed",
    value: "24",
    growth: "+15%",
    icon: "✓",
    iconBg: "bg-blue-500",
  },
];

const activeOrders = [
  {
    id: "ORD-1001",
    time: "2 min ago",
    customer: "John Doe",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Avenue, Apt 3B",
    status: "pending",
    total: "$35.97",
    items: [
      { name: "2x Margherita Pizza", price: "$25.98" },
      { name: "1x Garlic Bread", price: "$4.99" },
      { name: "2x Coke", price: "$5.00" },
    ],
    action: "Accept Order",
    actionClass: "bg-primary hover:opacity-90",
  },
  {
    id: "ORD-1002",
    time: "8 min ago",
    customer: "Jane Smith",
    phone: "+1 (555) 345-6789",
    address: "789 Elm Street, Suite 12",
    status: "preparing",
    total: "$32.86",
    items: [
      { name: "1x Pepperoni Pizza", price: "$14.99" },
      { name: "1x Caesar Salad", price: "$8.99" },
      { name: "1x Sprite", price: "$2.50" },
    ],
    action: "Mark Ready",
    actionClass: "bg-gradient-to-r from-purple-500 to-fuchsia-500",
  },
  {
    id: "ORD-1004",
    time: "18 min ago",
    customer: "Sarah Williams",
    phone: "+1 (555) 567-8901",
    address: "654 Maple Drive, Floor 2",
    status: "out_for_delivery",
    total: "$29.05",
    items: [
      { name: "1x BBQ Chicken Pizza", price: "$15.99" },
      { name: "1x Mozzarella Sticks", price: "$6.99" },
    ],
    action: "",
    actionClass: "",
  },
];

const recentDelivered = {
  id: "ORD-1005",
  customer: "David Brown",
  time: "35 min ago",
  total: "$46.38",
};

const OrdersList = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <RestaurantSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1">
        <RestaurantTopbar />

        <div className="p-8">
          <div className="border border-border bg-card rounded-sm">
            <div className="border-b border-border px-8 py-6 flex items-center justify-between">
              <h1 className="text-[28px] font-semibold">
                {activeTab === "orders" && "Orders"}
                {activeTab === "menu" && "Menu Items"}
                {activeTab === "statistics" && "Statistics"}
              </h1>

              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                🏪
              </div>
            </div>

            <div className="p-8">
              {activeTab === "orders" && (
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-7 space-y-6">
                    {activeOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}

                    <div className="bg-card border border-border rounded-[24px] p-7 shadow-sm">
                      <h2 className="text-[18px] font-semibold mb-5">
                        Recently Delivered
                      </h2>

                      <div className="rounded-2xl bg-accent/40 p-5 flex items-center justify-between">
                        <div>
                          <h3 className="text-[18px] font-medium">{recentDelivered.id}</h3>
                          <p className="text-muted-foreground">
                            {recentDelivered.customer} • {recentDelivered.time}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-[18px] font-semibold">{recentDelivered.total}</p>
                          <span className="inline-block mt-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm">
                            ✓ Delivered
                          </span>
                        </div>
                      </div>
                    </div>
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
                      <OrderCard order={activeOrders[0]} />
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