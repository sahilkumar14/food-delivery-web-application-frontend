import { useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { getItemCount } = useCart();

  const cartCount = getItemCount();

  const handleLogout = () => {
    onLogout();
    navigate("/login",{replace:true});
  };

  const navLink = "hover:text-orange-600 transition duration-200";

  return (
    <nav className="shadow-md bg-white sticky top-0 z-50 border-b border-orange-100">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">

        {/* 🔶 Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-orange-500 text-white px-3 py-2 rounded-lg font-bold">
            🍔
          </div>
          <h1 className="text-xl font-bold text-gray-800">UrbanEats</h1>
        </Link>

        {/* 🔷 Desktop Menu */}
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
              <Link to="/home" className={navLink}>Home</Link>
              {/* <Link to="/orders" className={navLink}>Orders</Link> */}
              <Link to="/history" className={navLink}>History</Link>

              {/* 🛒 Cart with Badge */}
              <Link
                to="/cart"
                className="relative flex items-center gap-1 hover:text-orange-600 transition"
              >
                <ShoppingCart size={20} />
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link to="/profile" className="flex items-center gap-1 hover:text-orange-600 transition">
                <User size={20} />
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="hover:text-orange-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* 📱 Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-orange-100 px-6 py-4 space-y-4 font-medium text-gray-800">
          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>Signup</Link>
            </>
          ) : (
            <>
              <Link to="/home" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/orders" onClick={() => setIsOpen(false)}>Orders</Link>
              <Link to="/history" onClick={() => setIsOpen(false)}>History</Link>

              <Link to="/cart" onClick={() => setIsOpen(false)}>
                Cart ({cartCount})
              </Link>

              <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>

              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-left w-full"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;