import { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

const SearchBar = () => {
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    price: "All Prices",
    rating: "All Ratings",
    delivery: "Any Time",
  });

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-gray-100 py-6">
      {/* Changed max-w-4xl to max-w-7xl to extend the length */}
      <div className="max-w-7xl mx-auto px-4 relative">

        {/* 🔍 Search Bar - Height remains consistent due to py-3 */}
        <div className="flex items-center bg-white rounded-2xl shadow-md px-5 py-3">
          
          <Search className="text-gray-400 w-5 h-5" />

          <input
            type="text"
            placeholder="Search for food or restaurants..."
            className="flex-1 ml-3 text-gray-600 outline-none bg-transparent"
          />

          {/* ⚙️ Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="ml-3 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
          >
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* 📂 Filter Panel */}
        {showFilters && (
          <div className="absolute left-4 right-4 mt-4 bg-white rounded-2xl shadow-lg p-6 space-y-5 border z-50">
            <h2 className="text-lg font-semibold">Filters</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price */}
                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="flex items-center justify-between bg-gray-100 rounded-xl px-4 py-3">
                    <span>{filters.price}</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {["All Prices", "$", "$$", "$$$"].map((item) => (
                      <button
                        key={item}
                        onClick={() => handleChange("price", item)}
                        className={`px-3 py-1 rounded-lg border text-sm ${
                          filters.price === item ? "bg-black text-white" : "bg-white"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex items-center justify-between bg-gray-100 rounded-xl px-4 py-3">
                    <span>{filters.rating}</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {["All Ratings", "4+", "3+", "2+"].map((item) => (
                      <button
                        key={item}
                        onClick={() => handleChange("rating", item)}
                        className={`px-3 py-1 rounded-lg border text-sm ${
                          filters.rating === item ? "bg-black text-white" : "bg-white"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery Time */}
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Time</label>
                  <div className="flex items-center justify-between bg-gray-100 rounded-xl px-4 py-3">
                    <span>{filters.delivery}</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {["Any Time", "< 30 min", "< 45 min"].map((item) => (
                      <button
                        key={item}
                        onClick={() => handleChange("delivery", item)}
                        className={`px-3 py-1 rounded-lg border text-sm ${
                          filters.delivery === item ? "bg-black text-white" : "bg-white"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;