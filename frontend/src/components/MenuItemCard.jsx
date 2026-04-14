import { Clock, Pencil, Trash2, CheckCircle } from "lucide-react";

const MenuItemCard = ({ item }) => {
  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition">

      {/* Top */}
      <div className="flex justify-between items-start">
        <div className="text-3xl">{item.emoji}</div>

        {item.status && (
          <div className="bg-green-100 text-green-600 p-1 rounded-full">
            <CheckCircle size={18} />
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mt-3">{item.name}</h3>

      <p className="text-sm text-gray-500">{item.desc}</p>

      {/* Time */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
        <Clock size={16} />
        {item.time}
      </div>

      {/* Category */}
      <div className="mt-3">
        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
          {item.category}
        </span>
      </div>

      {/* Ingredients */}
      <div className="flex flex-wrap gap-2 mt-3">
        {item.ingredients.map((ing, i) => (
          <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-md">
            {ing}
          </span>
        ))}
      </div>

      {/* Bottom */}
      <div className="flex justify-between items-center mt-5">
        <h4 className="text-lg font-semibold">{item.price}</h4>

        <div className="flex gap-3 text-orange-500">
          <Pencil size={18} className="cursor-pointer" />
          <Trash2 size={18} className="cursor-pointer text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;