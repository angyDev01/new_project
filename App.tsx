import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import { CartProvider, useCart } from './context/CartContext';
import { products } from './data/products';
import type { Product } from './types';

type View = 
  | { name: 'home' }
  | { name: 'product'; productId: number }
  | { name: 'cart' }
  | { name: 'checkout' }
  | { name: 'orderSuccess' };

const AppContent: React.FC = () => {
  const [view, setView] = useState<View>({ name: 'home' });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const { clearCart } = useCart();

  const navigateToProduct = useCallback((productId: number) => {
    setView({ name: 'product', productId });
    window.scrollTo(0, 0);
  }, []);

  const navigateToHome = useCallback(() => {
    setView({ name: 'home' });
  }, []);

  const navigateToCart = useCallback(() => {
    setView({ name: 'cart' });
    window.scrollTo(0, 0);
  }, []);
  
  const navigateToCheckout = useCallback(() => {
    setView({ name: 'checkout' });
    window.scrollTo(0, 0);
  }, []);

  const handlePlaceOrder = useCallback(() => {
    clearCart();
    setView({ name: 'orderSuccess' });
    window.scrollTo(0, 0);
  }, [clearCart]);

  const handleSearch = useCallback((query: string) => {
    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      const lowercasedQuery = query.toLowerCase();
      const results = products.filter(product => 
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.category.toLowerCase().includes(lowercasedQuery) ||
        product.description.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(results);
    }
    navigateToHome();
  }, [navigateToHome]);

  const renderContent = () => {
    switch (view.name) {
      case 'home':
        return <ProductList products={filteredProducts} onProductClick={navigateToProduct} />;
      case 'product':
        const product = products.find(p => p.id === view.productId);
        if (product) {
          return <ProductDetail product={product} onBack={navigateToHome} />;
        }
        return <div>Product not found</div>;
      case 'cart':
        return <CartView onContinueShopping={navigateToHome} onNavigateToCheckout={navigateToCheckout} />;
      case 'checkout':
        return <CheckoutView onPlaceOrder={handlePlaceOrder} onBackToCart={navigateToCart} />;
      case 'orderSuccess':
        return (
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-green-600 mb-4">Thank You for Your Order!</h2>
                <p className="text-gray-600 mb-6">Your order has been placed successfully. A confirmation email will be sent to you shortly.</p>
                <button
                    onClick={navigateToHome}
                    className="bg-accent text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                    Continue Shopping
                </button>
            </div>
        );
      default:
        return <ProductList products={filteredProducts} onProductClick={navigateToProduct} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        onNavigateHome={navigateToHome} 
        onNavigateCart={navigateToCart} 
        onSearch={handleSearch}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
