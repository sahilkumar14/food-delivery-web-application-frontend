import React, { useState, useMemo } from "react";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FeaturedRestaurants from "../components/FeaturedRestaurants";
import restaurants from "../data/restaurants";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearch = () => {
    // placeholder: search is live via filteredRestaurants; button just logs
    console.log("Searching for", searchQuery);
  };

  const filteredRestaurants = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase().trim();

    return restaurants.filter((item) => {
      const categoryMatch =
        selectedCategory === "all" ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      const searchMatch =
        lowerQuery === "" ||
        item.name.toLowerCase().includes(lowerQuery) ||
        item.cuisine.toLowerCase().includes(lowerQuery);

      return categoryMatch && searchMatch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div>
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      <CategorySection setSelectedCategory={setSelectedCategory} />

      <FeaturedRestaurants data={filteredRestaurants} />
    </div>
  );
};

export default Home;