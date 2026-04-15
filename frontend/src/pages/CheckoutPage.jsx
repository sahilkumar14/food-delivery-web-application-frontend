import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../services/api';
import { getCurrentCoordinates } from '../utils/location';

const CheckoutPage = () => {
  const { items, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'card'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryCoordinates, setDeliveryCoordinates] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (!user) return;

    setFormData((prev) => ({
      ...prev,
      name: user.name || prev.name,
      email: user.email || prev.email,
      phone: user.mob || user.phone || prev.phone,
      address: user.address || prev.address,
    }));

    if (user.addressCoordinates) {
      setDeliveryCoordinates(user.addressCoordinates);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const user = authService.getCurrentUser();
      const userId = user?.id || user?._id;

      if (!userId) {
        throw new Error("User not logged in");
      }

      if (!items[0]?.restaurantId) {
        throw new Error("Restaurant info missing");
      }

      let resolvedCoordinates = deliveryCoordinates;

      if (!resolvedCoordinates) {
        resolvedCoordinates = await getCurrentCoordinates();
        setDeliveryCoordinates(resolvedCoordinates);
      }

      const orderPayload = {
        userId,
        restaurantId: items[0].restaurantId,
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalPrice: getTotal(),
        address: formData.address,
        deliveryCoordinates: resolvedCoordinates
      };

      console.log("Sending order:", orderPayload);

      const result = await authService.placeOrder(orderPayload);

      if (!result.success) {
        throw new Error(result.error || "Order failed");
      }

      clearCart();
      toast.success("Order placed successfully!");
      navigate("/home");

    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCaptureDeliveryLocation = async () => {
    setLocationLoading(true);

    try {
      const coordinates = await getCurrentCoordinates();
      setDeliveryCoordinates(coordinates);
      toast.success('Delivery location captured successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLocationLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">Rs. {item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span className="text-orange-600">Rs. {getTotal()}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Delivery Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Delivery Coordinates</p>
                    <p className="text-xs text-gray-600">Needed for rider map and route handoff.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCaptureDeliveryLocation}
                    disabled={isProcessing || locationLoading}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    {locationLoading ? 'Capturing...' : 'Use Current Location'}
                  </button>
                </div>
                <p className="mt-3 text-sm text-gray-700">
                  {deliveryCoordinates
                    ? `Lat ${deliveryCoordinates.lat}, Lng ${deliveryCoordinates.lng}`
                    : 'Current delivery coordinates not captured yet.'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Credit/Debit Card
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Cash on Delivery
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    UPI
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : `Place Order - Rs. ${getTotal()}`}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button
            type="button"
            onClick={() => navigate('/cart')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
          >
            Back to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
