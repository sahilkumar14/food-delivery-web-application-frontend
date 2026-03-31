import { useState, useEffect } from "react";
import restaurantsData from "./data/restaurants";

// components
import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import FeaturedRestaurants from "./components/FeaturedRestaurants";

function App() {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredData, setFilteredData] = useState(restaurantsData);

  // ✅ ADD HERE (INSIDE App, BEFORE return)
  const handleSearch = () => {
    const result = restaurantsData.filter((item) => {

      const matchesSearch =  item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.cuisine.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        item.category.toLowerCase().includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });

    setFilteredData(result);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedCategory]);

  return (
    <div>

      {/* 🔍 HERO (SEARCH BAR) */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {/* 🍔 CATEGORY */}
      <CategorySection setSelectedCategory={setSelectedCategory} />

      {/* 🍽️ RESTAURANTS */}
      <FeaturedRestaurants data={filteredData} />

    </div>
  );
}

export default App;