import React, { useState } from 'react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import StarRating from './StarRating';
import GeminiProductChat from './GeminiProductChat';
import { ChevronLeftIcon } from './icons';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <button onClick={onBack} className="flex items-center text-gray-600 hover:text-accent mb-6 transition-colors">
        <ChevronLeftIcon className="h-5 w-5 mr-1"/> Back to products
      </button>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
          <img src={product.image} alt={product.name} className="max-w-full h-auto max-h-[500px] object-contain rounded-lg" />
        </div>
        
        <div>
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{product.category}</span>
          <h1 className="text-4xl font-extrabold text-primary mt-2">{product.name}</h1>
          
          <div className="flex items-center my-4">
            <StarRating rating={product.rating} className="h-6 w-6"/>
            <span className="text-gray-500 ml-3">{product.rating.toFixed(1)} stars | {product.reviewCount} reviews</span>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">{product.longDescription}</p>

          <p className="text-5xl font-bold text-primary my-6">${product.price.toFixed(2)}</p>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md"
              >
                -
              </button>
              <span className="px-4 py-2 font-semibold">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 px-6 rounded-md font-semibold text-white transition-all duration-300 ${isAdded ? 'bg-green-500' : 'bg-accent hover:bg-blue-700'}`}
            >
              {isAdded ? 'Added to Cart!' : `Add ${quantity} to Cart`}
            </button>
          </div>
        </div>
      </div>
      
      <GeminiProductChat product={product} />
    </div>
  );
};

export default ProductDetail;