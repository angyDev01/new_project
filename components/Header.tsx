
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon, SearchIcon, SparklesIcon } from './icons';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateCart: () => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateHome, onNavigateCart, onSearch }) => {
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-primary/95 text-secondary sticky top-0 z-50 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={onNavigateHome}
          >
            <SparklesIcon className="h-7 w-7 text-accent" />
            <span className="text-2xl font-bold tracking-tight">Pure Store</span>
          </div>

          <div className="flex-1 flex justify-center px-4 lg:px-12">
            <form onSubmit={handleSearchSubmit} className="w-full max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-secondary/10 border border-secondary/20 rounded-full py-2 pl-4 pr-10 text-secondary placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="Search products..."
                />
                <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <SearchIcon className="h-5 w-5 text-secondary/60 hover:text-accent transition-colors" />
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onNavigateCart}
              className="relative p-2 rounded-full hover:bg-secondary/10 transition-colors"
              aria-label="Open shopping cart"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
