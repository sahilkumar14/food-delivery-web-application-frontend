import { ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <div className="shadow-md bg-white sticky top-0 z-50 border-b border-orange-100">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 text-white px-3 py-2 rounded-lg font-bold">🍔</div>
          <h1 className="text-xl font-bold text-gray-800">FoodExpress</h1>
        </div>

        <div className="hidden md:flex items-center gap-6 font-medium text-gray-800">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="border border-orange-500 text-orange-500 px-4 py-2 rounded-full hover:bg-orange-50 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/home" className="hover:text-orange-600 transition">Home</Link>
              <Link to="/orders" className="hover:text-orange-600 transition">Orders</Link>
              <Link to="/history" className="hover:text-orange-600 transition">History</Link>
              <Link to="/home" className="hover:text-orange-600 transition" onClick={onLogout}>Logout</Link>
              <div className="flex items-center gap-1 cursor-pointer hover:text-orange-600 transition">
                <ShoppingCart size={20} />
                Cart
              </div>
              <Link to="/profile" className="flex items-center gap-1 hover:text-orange-600 transition">
                <User size={20} />
                Profile
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;;