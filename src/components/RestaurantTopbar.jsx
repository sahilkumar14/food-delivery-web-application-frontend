import { Link } from "react-router-dom";
import { ShoppingCart, User, Store, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
const RestaurantTopbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate("/login",{replace:true});
    }
  };

  return (
    <header className="h-[76px] border-b border-border bg-card px-8 flex items-center justify-between">
      <Link to="/home" className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          🍔
        </div>
        <h2 className="text-[20px] font-semibold">UrbanEats</h2>
      </Link>

      <div className="flex items-center gap-8 text-[16px] font-medium">
        <Link to="/orders" className="hover:text-primary transition">
          Orders
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 hover:text-primary transition"
        >
          <LogOut size={18} />
          Logout
        </button>

        <User size={22} />
      </div>
    </header>
  );
};

export default RestaurantTopbar;