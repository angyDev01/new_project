
import React from 'react';
import type { Product } from '../types';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
  onClick: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      onClick={() => onClick(product.id)}
      className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
          <div className="flex items-center">
            <StarRating rating={product.rating} />
            <span className="text-gray-400 text-xs ml-2">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
