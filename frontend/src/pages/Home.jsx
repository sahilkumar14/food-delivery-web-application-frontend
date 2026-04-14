import React, { useEffect, useMemo, useState } from "react";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FeaturedRestaurants from "../components/FeaturedRestaurants";
import { authService } from "../services/api";
import { adaptRestaurant } from "../utils/restaurantAdapter";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const result = await authService.getRestaurants();

      if (result.success) {
        setRestaurants((result.data || []).map(adaptRestaurant));
      }
    };

    fetchRestaurants();
  }, []);

  const handleSearch = () => {
    console.log("Searching for", searchQuery);
  };

  const filteredRestaurants = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase().trim();

    return restaurants.filter((item) => {
      const categoryMatch =
        selectedCategory === "all" ||
        (item.category || "all").toLowerCase() === selectedCategory.toLowerCase();

      const searchMatch =
        lowerQuery === "" ||
        item.name.toLowerCase().includes(lowerQuery) ||
        (item.cuisine || "").toLowerCase().includes(lowerQuery);

      return categoryMatch && searchMatch;
    });
  }, [restaurants, searchQuery, selectedCategory]);

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
