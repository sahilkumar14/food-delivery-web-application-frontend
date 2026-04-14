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

  const deliveryFee = 5.5;
  const taxes = Math.max(0, getTotal() * 0.085);
  const grandTotal = getTotal() + deliveryFee + taxes;

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900">Your Selection</h1>
          <p className="mt-3 text-slate-500">Curating your next exceptional dining experience.</p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.8fr_0.85fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] border border-slate-200">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Your selection</p>
                  <h2 className="text-3xl font-semibold text-slate-900">Review your meal</h2>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-600">
                  {items.length} item{items.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] border border-slate-200 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col gap-5 rounded-[1.75rem] border border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-20 w-20 rounded-3xl bg-slate-100 flex items-center justify-center text-2xl text-slate-400">
                      🍽️
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{item.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
                      <p className="mt-3 text-orange-600 font-semibold">Rs. {item.price}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:items-end">
                    <div className="flex items-center rounded-full border border-slate-200 bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-4 py-3 text-slate-600 hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="min-w-[3rem] text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-4 py-3 text-slate-600 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                    >
                      <span>Remove</span>
                    </button>
                    <div className="text-right text-lg font-semibold text-slate-900">
                      Rs. {item.price * item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[1.75rem] bg-orange-100/80 p-6 shadow-sm border border-orange-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-orange-700">Chef’s Pairing</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">2018 Reserve Chardonnay</h3>
                <p className="mt-2 text-sm text-slate-600">Elevate your seafood and risotto dishes with this premium pairing.</p>
              </div>
              <button className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                Add +Rs. 45.00
              </button>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] border border-slate-200">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Summary</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Order Summary</h2>
            </div>

            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                <span>Subtotal</span>
                <span>Rs. {getTotal().toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                <span>Delivery Fee</span>
                <span>Rs. {deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                <span>Estimated Taxes</span>
                <span>Rs. {taxes.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <label className="block text-sm font-medium text-slate-700">Voucher Code</label>
              <div className="mt-3 flex gap-3">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="min-w-0 flex-1 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
                <button className="rounded-3xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600">
                  Apply
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-xl font-semibold text-slate-900">
              <span>Total Order</span>
              <span>Rs. {grandTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="mt-6 w-full rounded-3xl bg-orange-500 px-6 py-4 text-base font-semibold text-white transition hover:bg-orange-600"
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;