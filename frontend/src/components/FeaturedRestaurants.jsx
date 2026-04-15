import { useState } from "react";
import RestaurantCard from "./RestaurantCard";

const FeaturedRestaurants = ({ data = [] }) => {

  const [showAll, setShowAll] = useState(false);

  // ✅ CONTROL DISPLAY
  const displayedData = showAll ? data : data.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-medium text-gray-800">
          Featured Restaurants
        </h2>

        {/* ✅ BUTTON */}
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-orange-600 hover:text-orange-500 font-medium transition"
        >
          {showAll ? "Show Less" : "View All"}
        </button>

      </div>

      <div className="grid md:grid-cols-4 gap-6">

        {/* ✅ FIRST CHECK IF ANY DATA EXISTS */}
        {data.length > 0 ? (

          displayedData.map((res) => (
            <RestaurantCard
              key={res.id}
              restaurant={res}
            />
          ))

        ) : (

          <p className="col-span-4 text-center text-gray-600 text-lg">
            No food found 😢
          </p>

        )}

      </div>

    </section>
  );
};

export default FeaturedRestaurants;