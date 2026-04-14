import { useEffect, useState } from "react";
import MenuItemCard from "../components/MenuItemCard";
import authService from "../services/api";
import toast from "react-hot-toast";

const initialFormState = {
  itemName: "",
  category: "",
  price: "",
  description: "",
};

const flattenMenu = (menu = []) =>
  menu.flatMap((section) =>
    (section.items || []).map((item) => ({
      _id: item._id,
      name: item.itemName,
      desc: item.description || "Freshly prepared item",
      time: "15 mins",
      category: section.category || "General",
      price: `Rs. ${item.price}`,
      ingredients: [],
      status: true,
      emoji: "🍽",
    }))
  );

export const RestaurantHomeContent = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const user = authService.getCurrentUser();

  const fetchMenu = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const menuResult = await authService.getRestaurantMenu(user.id);

      if (menuResult.success) {
        setMenuItems(flattenMenu(menuResult.data || []));
      } else {
        toast.error(menuResult.error || "Failed to load menu");
      }
    } catch {
      toast.error("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddItem = async (event) => {
    event.preventDefault();

    if (!user?.id) {
      toast.error("Restaurant session not found");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      restaurantId: user.id,
      category: formData.category.trim(),
      itemName: formData.itemName.trim(),
      price: Number(formData.price),
      description: formData.description.trim(),
    };

    const result = await authService.addMenuItem(payload);

    if (result.success) {
      toast.success("Dish added successfully");
      setFormData(initialFormState);
      setIsFormOpen(false);
      await fetchMenu();
    } else {
      toast.error(result.error || "Failed to add dish");
    }

    setIsSubmitting(false);
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Menu Items</h2>
          <p className="text-gray-500">Manage your menu</p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-orange-500 text-white px-5 py-2 rounded-lg"
        >
          + Add Item
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-8 rounded-2xl border border-orange-200 bg-orange-50 p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Add New Dish</h3>
              <p className="text-sm text-gray-600">Fill in the item details to publish it in your menu.</p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsFormOpen(false);
                setFormData(initialFormState);
              }}
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleAddItem} className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Dish Name</span>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Paneer Tikka Pizza"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Category</span>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Pizza"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Price</span>
              <input
                type="number"
                min="1"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="299"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-1 block text-sm font-medium text-gray-700">Description</span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Describe the dish briefly"
              />
            </label>

            <div className="md:col-span-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  setFormData(initialFormState);
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-orange-500 px-5 py-2 text-white hover:bg-orange-600 disabled:opacity-60"
              >
                {isSubmitting ? "Saving..." : "Save Dish"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <MenuItemCard
              key={item._id}
              item={item}
            />
          ))
        ) : (
          <div className="col-span-3 rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
            No menu items available yet.
          </div>
        )}
      </div>
    </div>
  );
};

const RestaurantHome = () => {
  return (
    <div className="min-h-screen bg-muted/40">
      <RestaurantHomeContent />
    </div>
  );
};

export default RestaurantHome;
