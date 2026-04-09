import React from "react";

const Hero = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

      {/* LEFT SIDE */}
      <div className="space-y-6">

        <h1 className="text-5xl font-semibold leading-tight text-gray-800">
          Delicious Food <br />
          <span className="text-orange-600">Delivered Fast</span>
        </h1>

        <p className="text-gray-600 text-lg">
          Order your favorite meals from the best restaurants in town.
          Fast delivery, fresh food, great prices.
        </p>

        {/* 🔍 Search Box */}
        <div className="flex bg-white border border-orange-200 rounded-xl p-2 shadow-sm">

          <input
            type="text"
            placeholder="Search for food or restaurants..."
            className="flex-1 bg-transparent outline-none px-3 text-gray-800 placeholder:text-gray-400"
            
            // ✅ CONNECTED TO STATE
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button
            onClick={handleSearch} // ✅ BUTTON WORKS NOW
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Search
          </button>

        </div>

      </div>

      {/* RIGHT SIDE IMAGES */}
      <div className="grid grid-cols-2 gap-4">

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg"
          className="rounded-xl"
        />

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Lg9UbCvL27kx1af7kUYUJE1udSOp9JWNsg&s"
          className="rounded-xl"
        />

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg6IGhMCeiMSBuKF4akDtCzxgJfSe0yajvCw&s"
          className="rounded-xl"
        />

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx7Cod9_0Typ2BSInavvPMTOtOn8EDCuyv1g&s"
          className="rounded-xl"
        />

      </div>

    </section>
  );
};

export default Hero;