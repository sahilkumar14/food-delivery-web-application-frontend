import React from 'react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious food to get started!</p>
          <Button
            onClick={() => navigate('/home')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-lg"
          >
            Browse Restaurants
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Cart</h1>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-6 last:border-b-0 last:pb-0">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <p className="text-orange-600 font-semibold mt-1">Rs. {item.price}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-center min-w-[3rem]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    🗑️
                  </button>
                  <div className="text-right min-w-[4rem]">
                    <p className="text-lg font-semibold text-gray-800">Rs. {item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center text-xl font-bold mb-6">
            <span>Total Amount:</span>
            <span className="text-orange-600">Rs. {getTotal()}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex-1"
            >
              Clear Cart
            </Button>
            <Button
              onClick={() => navigate('/checkout')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex-1"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;