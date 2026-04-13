import { Link } from "react-router-dom";
import { ShoppingCart, User, Store } from "lucide-react";

const RestaurantTopbar = () => {
  return (
    <header className="h-[76px] border-b border-border bg-card px-8 flex items-center justify-between">
      <Link to="/home" className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          🍔
        </div>
        <h2 className="text-[20px] font-semibold">FoodExpress</h2>
      </Link>

      <div className="flex items-center gap-8 text-[16px] font-medium">
        <Link to="/home" className="hover:text-primary transition">
          Home
        </Link>

        <Link to="/orders" className="hover:text-primary transition">
          Orders
        </Link>

        <div className="relative">
          <ShoppingCart size={24} />
          <span className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">
            3
          </span>
        </div>

        <User size={22} />
      </div>
    </header>
  );
};

export default RestaurantTopbar;