import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import restaurants from '../data/restaurants';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, getItemCount } = useCart();

  const restaurant = restaurants.find(r => r.id === parseInt(id));

  if (!restaurant) {
    return <div className="text-center py-10">Restaurant not found</div>;
  }

  const handleAddToCart = (item) => {
    addItem(item);
    toast.success(`${item.name} added to cart!`);
  };

  const cartCount = getItemCount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Floating Cart Button */}
        {cartCount > 0 && (
          <Link
            to="/cart"
            className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition z-50"
          >
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cartCount}
            </span>
          </Link>
        )}

        {/* Restaurant Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{restaurant.name}</h1>
          <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>⭐ {restaurant.rating}</span>
            <span>{restaurant.time}</span>
            <span>{restaurant.price}</span>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Menu</h2>
          <div className="space-y-4">
            {restaurant.menu.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4 last:border-b-0">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <p className="text-orange-600 font-semibold mt-1">Rs. {item.price}</p>
                </div>
                <Button
                  onClick={() => handleAddToCart(item)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg ml-4"
                >
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <Button
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;