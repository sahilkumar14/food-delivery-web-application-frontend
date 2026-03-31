import { ShoppingCart, User } from "lucide-react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

const Navbar = () => {
  return (
    <div className="shadow-md bg-white sticky top-0 z-50">

      {/* Top Navbar */}
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 text-white px-3 py-2 rounded-lg font-bold">
            🍔
          </div>
          <h1 className="text-xl font-bold">FoodExpress</h1>
        </div>

        {/* Right: Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <a href="#" className="hover:text-blue-500">Home</a>
          <a href="#" className="hover:text-blue-500">Orders</a>
          
          <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
            <ShoppingCart size={20} />
            Cart
          </div>

          <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
            <User size={20} />
            Profile
          </div>
        </div>
      </div>

      {/* Search Section */}
      <SearchBar />

      {/* Filter Section */}
      <FilterBar />
    </div>
  );
};

export default Navbar;