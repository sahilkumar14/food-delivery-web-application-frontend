import { useState } from "react";
import RestaurantSidebar from "../components/RestaurantSidebar";
import RestaurantTopbar from "../components/RestaurantTopbar";
import MenuItemCard from "../components/MenuItemCard";

const menuItems = [
  {
    name: "Margherita Pizza",
    desc: "Classic pizza with fresh mozzarella, tomato sauce, and basil",
    time: "15 mins",
    category: "Pizza",
    price: "$12.99",
    ingredients: ["Dough", "Tomato Sauce", "Mozzarella", "Basil", "Olive Oil"],
    status: true,
    emoji: "🍕"
  },
  {
    name: "Pepperoni Pizza",
    desc: "Traditional pepperoni with mozzarella and tomato sauce",
    time: "15 mins",
    category: "Pizza",
    price: "$14.99",
    ingredients: ["Dough", "Tomato Sauce", "Mozzarella", "Pepperoni"],
    status: true,
    emoji: "🍕"
  },
  {
    name: "Caesar Salad",
    desc: "Crisp romaine lettuce with Caesar dressing and croutons",
    time: "5 mins",
    category: "Salads",
    price: "$8.99",
    ingredients: ["Romaine Lettuce", "Caesar Dressing", "Croutons", "Parmesan"],
    status: true,
    emoji: "🥗"
  }
];

const RestaurantHome = () => {
  const [activeTab, setActiveTab] = useState("menu");

  return (
    <div className="flex">
      
      {/* Sidebar */}
      <RestaurantSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 bg-muted/40 min-h-screen">

        <RestaurantTopbar />

        <div className="p-8">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Menu Items</h2>
              <p className="text-muted-foreground">
                Manage your restaurant menu items
              </p>
            </div>

            <button className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:opacity-90">
              + Add Item
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <MenuItemCard key={index} item={item} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default RestaurantHome;