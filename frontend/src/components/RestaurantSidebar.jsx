import { MapPin, Phone, ShoppingBag, UtensilsCrossed, BarChart3, Store } from "lucide-react";

const RestaurantSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: "orders", label: "Orders", icon: <ShoppingBag size={20} /> },
    { id: "menu", label: "Menu Items", icon: <UtensilsCrossed size={20} /> },
    { id: "statistics", label: "Statistics", icon: <BarChart3 size={20} /> },
  ];

  return (
    <aside className="w-[280px] min-h-screen bg-card border-r border-border flex flex-col">
      <div className="px-6 py-6 border-b border-border flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          <Store size={22} />
        </div>
        <h2 className="text-[20px] font-semibold">Restaurant</h2>
      </div>

      <div className="px-5 py-6 border-b border-border bg-accent/40">
        <h3 className="text-[18px] font-semibold mb-4">Pizza Paradise</h3>

        <div className="space-y-3 text-muted-foreground">
          <div className="flex items-center gap-3">
            <MapPin size={18} />
            <span>123 Main Street, Downtown</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={18} />
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3 flex-1">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left font-medium transition ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="border-t border-border p-6 text-center text-muted-foreground font-medium">
        Back to Site
      </div>
    </aside>
  );
};

export default RestaurantSidebar;