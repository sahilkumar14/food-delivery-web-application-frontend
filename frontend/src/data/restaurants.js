const restaurants = [
  {
    id: 1,
    name: "Pizza Paradise",
    cuisine: "Pizza, Italian",
    rating: 4.8,
    time: "20-30 min",
    price: "Rs.299",
    image: "https://www.schwartz.co.uk/-/media/project/oneweb/schwartz/recipes/recipe_image_update/march_18_2025/easy_pizza_recipe_800x800.webp?rev=217b39d7488a4aa7947174d6e475219f&vd=20250325T174436Z&extension=webp&hash=36F310B7BA2EA4491AADEC213844DF8B" ,
    category: "pizza",
    menu: [
      { id: 1, name: "Margherita Pizza", price: 299, description: "Classic cheese pizza" },
      { id: 2, name: "Pepperoni Pizza", price: 399, description: "Spicy pepperoni pizza" },
      { id: 3, name: "Veggie Pizza", price: 349, description: "Loaded with vegetables" }
    ]
  },
  {
    id: 2,
    name: "Burger House",
    cuisine: "Burgers, Fast Food",
    rating: 4.6,
    time: "15-25 min",
    price: "Rs.79",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Lg9UbCvL27kx1af7kUYUJE1udSOp9JWNsg&s" ,
    category: "burger",
    menu: [
      { id: 4, name: "Classic Burger", price: 79, description: "Beef patty with lettuce and tomato" },
      { id: 5, name: "Cheese Burger", price: 99, description: "With extra cheese" },
      { id: 6, name: "Chicken Burger", price: 89, description: "Grilled chicken patty" }
    ]
  },
  {
    id: 3,
    name: "Asian Delights",
    cuisine: "Asian, Noodles",
    rating: 4.9,
    time: "25-35 min",
    price: "Rs.159",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFXR-WBBjWC9MBUXX-VYCa1YsiO1zFSRvp6A&s",
    category: "noodles",
    menu: [
      { id: 7, name: "Chicken Noodles", price: 159, description: "Stir-fried noodles with chicken" },
      { id: 8, name: "Veg Noodles", price: 139, description: "Vegetable noodles" },
      { id: 9, name: "Beef Noodles", price: 179, description: "Spicy beef noodles" }
    ]
  },
  {
    id: 4,
    name: "Gourmet Kitchen",
    cuisine: "International",
    rating: 4.7,
    time: "30-40 min",
    price: "Rs.300",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTamj4qfIdE9OrQ6dKgnU1d5-ZFm55_CNgmTQ&s",
    category: "international",
    menu: [
      { id: 10, name: "Grilled Salmon", price: 300, description: "Fresh salmon with herbs" },
      { id: 11, name: "Pasta Alfredo", price: 250, description: "Creamy pasta dish" },
      { id: 12, name: "Steak", price: 400, description: "Juicy steak" }
    ]
  },
  {
    id: 5,
    name: "Cake house",
    cuisine: "Cakes,Pastries",
    rating: 4.0,
    time: "25-30 min",
    price: "Rs.500",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS0SNCZRWC_b_HX4pTmNq6SmdH16Yg_uNSxA&s",
    category: "desserts",
    menu: [
      { id: 13, name: "Chocolate Cake", price: 500, description: "Rich chocolate cake" },
      { id: 14, name: "Vanilla Pastry", price: 150, description: "Flaky vanilla pastry" },
      { id: 15, name: "Fruit Tart", price: 200, description: "Fresh fruit tart" }
    ]
  }
];

export default restaurants;