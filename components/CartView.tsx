import React from 'react';
import { useCart } from '../context/CartContext';
import { PlusIcon, MinusIcon, XIcon } from './icons';

interface CartViewProps {
  onContinueShopping: () => void;
  onNavigateToCheckout: () => void;
}

const CartView: React.FC<CartViewProps> = ({ onContinueShopping, onNavigateToCheckout }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <button
          onClick={onContinueShopping}
          className="bg-accent text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-primary mb-6">Your Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-lg">
        <ul className="divide-y divide-gray-200">
          {cartItems.map(item => (
            <li key={item.id} className="p-4 sm:p-6 flex items-center space-x-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md" />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-primary">{item.name}</h3>
                <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 border rounded-full hover:bg-gray-100"><MinusIcon className="w-4 h-4" /></button>
                  <span className="mx-3 font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 border rounded-full hover:bg-gray-100"><PlusIcon className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <p className="text-lg font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                  <XIcon className="w-5 h-5"/>
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-xl font-medium text-gray-600">Subtotal</span>
            <span className="text-2xl font-bold text-primary">${cartTotal.toFixed(2)}</span>
          </div>
          <p className="text-gray-500 text-sm mt-1">Shipping and taxes calculated at checkout.</p>
          <button 
            onClick={onNavigateToCheckout}
            className="w-full mt-6 bg-accent text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors text-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartView;
