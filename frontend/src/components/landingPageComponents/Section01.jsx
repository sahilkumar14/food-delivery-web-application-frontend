import React from "react";
import { Search } from "lucide-react";

const Section01 = () => {
  return (
    <div className="w-full min-h-[100vh]">
      <div className="bg-gradient-to-b from-orange-50 to-white min-h-[100vh] flex items-center py-8">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

          {/* GRID LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* LEFT SIDE */}
            <div className="max-w-xl">

              <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
                Delicious Food
              </h2>

              <h2 className="text-orange-600 font-extrabold text-4xl md:text-5xl mt-2">
                Delivered Fast
              </h2>

              <p className="text-gray-600 text-lg mt-6 leading-relaxed">
                Order your favorite meals from the best restaurants in town.
                Fast delivery, fresh food, and great prices.
              </p>

              {/* SEARCH BAR */}
              <div className="bg-white rounded-full shadow-lg p-2 w-full mt-8 flex items-center gap-2 hover:shadow-xl transition duration-300 border border-orange-200">

                <Search className="w-5 h-5 text-orange-500 ml-4" />

                <input
                  type="text"
                  placeholder="Search for food or restaurants..."
                  className="flex-1 px-2 py-3 outline-none bg-transparent text-gray-800 placeholder-gray-400"
                />

                <button className="bg-orange-500 text-white px-5 py-2 rounded-full mr-2 hover:bg-orange-600 transition">
                  Search
                </button>
              </div>

              {/* STATS */}
              <div className="flex items-center gap-8 text-sm mt-6">
                <div>
                  <div className="text-2xl text-orange-600 font-bold">2000+</div>
                  <div className="text-gray-600">Restaurants</div>
                </div>
                <div>
                  <div className="text-2xl text-orange-600 font-bold">50K+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-2xl text-orange-600 font-bold">24/7</div>
                  <div className="text-gray-600">Service</div>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE - FLOATING IMAGE CARD (hidden on mobile) */}
            <div className="hidden md:flex justify-center md:justify-end">
              <div className="relative w-[380px] h-[420px] group">

                {/* LEFT BACK CARD */}
                <div className="absolute top-4 -left-10 w-[300px] h-[380px] rounded-3xl overflow-hidden shadow-xl transform -rotate-12 group-hover:-rotate-3 group-hover:-translate-y-2 transition duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                    alt="Food 1"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* RIGHT BACK CARD */}
                <div className="absolute top-4 -right-10 w-[300px] h-[380px] rounded-3xl overflow-hidden shadow-xl transform rotate-12 group-hover:rotate-3 group-hover:-translate-y-2 transition duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d"
                    alt="Food 2"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* MAIN FRONT CARD */}
                <div className="absolute inset-0 z-10 rounded-3xl overflow-hidden shadow-2xl transform transition duration-500 group-hover:-translate-y-4 group-hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                    alt="Main Food"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-4">
                    <h3 className="text-lg font-semibold">Hot & Fresh Meals</h3>
                    <p className="text-sm">Delivered to your doorstep</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Section01;