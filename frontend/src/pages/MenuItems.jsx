import { useState } from "react";
import MenuItemCard from "../components/MenuItemCard";

const MenuItems = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Chicken Wings",
      desc: "Crispy wings",
      price: 9.99,
      time: 20,
      category: "Appetizers",
      available: false,
      icon: "🍗",
      ingredients: ["Chicken", "Sauce"],
    },
    {
      id: 2,
      name: "Garlic Bread",
      desc: "Toasted bread",
      price: 4.99,
      time: 10,
      category: "Appetizers",
      available: true,
      icon: "🥖",
      ingredients: ["Bread", "Garlic"],
    },
  ]);

  // ✅ DELETE
  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // ✅ TOGGLE
  const handleToggle = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, available: !item.available }
          : item
      )
    );
  };

  // ✅ EDIT
  const handleEdit = (item) => {
    const newName = prompt("Enter new name:", item.name);
    if (!newName) return;

    setItems(
      items.map((i) =>
        i.id === item.id ? { ...i, name: newName } : i
      )
    );
  };

  // ✅ ADD
  const handleAdd = () => {
    const name = prompt("Enter item name:");
    if (!name) return;

    const newItem = {
      id: Date.now(),
      name,
      desc: "New item",
      price: 10,
      time: 10,
      category: "Other",
      available: true,
      icon: "🍔",
      ingredients: ["Sample"],
    };

    setItems([newItem, ...items]);
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Menu Items</h1>
          <p className="text-muted-foreground">
            Manage your menu
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          + Add Item
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-6">
        {items.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuItems;