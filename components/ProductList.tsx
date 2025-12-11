
import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onProductClick: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onProductClick }) => {
  return (
    <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary mb-6">Discover Our Products</h1>
        {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
                <ProductCard key={product.id} product={product} onClick={onProductClick} />
            ))}
            </div>
        ) : (
            <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-700">No products found</h2>
                <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
            </div>
        )}
    </div>
  );
};

export default ProductList;
