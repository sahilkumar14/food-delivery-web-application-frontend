const categories = [
  { name: "Pizza", icon: "🍕" },
  { name: "Burgers", icon: "🍔" },
  { name: "Noodles", icon: "🍜" },
  { name: "Drinks", icon: "🥤" },
  { name: "Desserts", icon: "🍰" },
  { name: "Salads", icon: "🥗" }
];

const CategorySection = ({ setSelectedCategory }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      <h2 className="text-2xl mb-6 text-gray-800">Browse by Category</h2>

      <div className="flex gap-10">

        {/* ✅ ALL BUTTON */}
        <div
          onClick={() => setSelectedCategory("all")}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <div className="text-3xl">🍽️</div>
          <p>All</p>
        </div>

        {categories.map((cat) => (
          <div
            key={cat.name}
            
            // ✅ CLICK HANDLER ADDED
           onClick={() => setSelectedCategory(cat.name.toLowerCase().slice(0, -1))}
            
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <div className="text-3xl">{cat.icon}</div>
            <p>{cat.name}</p>
          </div>
        ))}

      </div>

    </section>
  );
};

export default CategorySection;