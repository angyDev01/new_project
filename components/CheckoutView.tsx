import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ChevronLeftIcon, CreditCardIcon } from './icons';

interface CheckoutViewProps {
  onPlaceOrder: () => void;
  onBackToCart: () => void;
}

// Define the form data type
type FormData = {
  name: string;
  address: string;
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
};

// Define FormInput outside of the component to prevent re-creation on re-renders,
// which caused inputs to lose focus on mobile devices.
const FormInput: React.FC<{
    name: keyof FormData;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    error?: string;
}> = ({name, label, value, onChange, placeholder, type = "text", error}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <input 
        type={type} 
        id={name} 
        name={name} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 placeholder:text-gray-400`} />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);


const CheckoutView: React.FC<CheckoutViewProps> = ({ onPlaceOrder, onBackToCart }) => {
  const { cartItems, cartTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: '', address: '', email: '',
    cardNumber: '', expiryDate: '', cvc: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const shippingCost = cartTotal > 50 ? 0 : 5.99;
  const total = cartTotal + shippingCost;

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'A valid email is required';
    if (!formData.cardNumber.replace(/\s/g, '') || !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'A valid 16-digit card number is required';
    if (!formData.expiryDate.trim() || !/^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/.test(formData.expiryDate.trim())) newErrors.expiryDate = 'Expiry date must be in MM/YY format';
    if (!formData.cvc.trim() || !/^\d{3,4}$/.test(formData.cvc.trim())) newErrors.cvc = 'A valid CVC is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);
    setTimeout(() => {
      onPlaceOrder();
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <button onClick={onBackToCart} className="flex items-center text-gray-600 hover:text-accent mb-6 transition-colors">
        <ChevronLeftIcon className="h-5 w-5 mr-1"/> Back to Cart
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-6">Shipping & Payment</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Shipping Information</h3>
              <div className="mt-4 space-y-4">
                <FormInput name="name" label="Full Name" placeholder="John Doe" error={errors.name} value={formData.name} onChange={handleChange} />
                <FormInput name="email" label="Email" placeholder="you@example.com" type="email" error={errors.email} value={formData.email} onChange={handleChange} />
                <FormInput name="address" label="Address" placeholder="123 Main St, Anytown, USA" error={errors.address} value={formData.address} onChange={handleChange} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 flex items-center"><CreditCardIcon className="w-5 h-5 mr-2"/> Payment Details</h3>
              <div className="mt-4 space-y-4">
                <FormInput name="cardNumber" label="Card Number" placeholder="0000 0000 0000 0000" error={errors.cardNumber} value={formData.cardNumber} onChange={handleChange} />
                <div className="grid grid-cols-2 gap-4">
                    <FormInput name="expiryDate" label="Expiry Date" placeholder="MM / YY" error={errors.expiryDate} value={formData.expiryDate} onChange={handleChange} />
                    <FormInput name="cvc" label="CVC" placeholder="123" error={errors.cvc} value={formData.cvc} onChange={handleChange} />
                </div>
              </div>
            </div>

            <button type="submit" disabled={isProcessing} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-accent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:bg-gray-400">
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : `Pay $${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg h-fit">
          <h2 className="text-2xl font-bold text-primary mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md"/>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t my-6"></div>
          <div className="space-y-2">
            <div className="flex justify-between"><p>Subtotal</p><p className="font-medium">${cartTotal.toFixed(2)}</p></div>
            <div className="flex justify-between"><p>Shipping</p><p className="font-medium">${shippingCost.toFixed(2)}</p></div>
          </div>
          <div className="border-t my-6"></div>
          <div className="flex justify-between text-xl font-bold">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;