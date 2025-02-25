import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { AdminPanel } from './components/AdminPanel';
import { AdminAuth } from './components/AdminAuth';
import { Footer } from './components/Footer';
import { products } from './data/products';
import type { CartItem, Order, Product } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);
      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  };

  const updateCartItemQuantity = (productId: string, change: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckout = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cartItems],
      status: 'pending',
      total,
      timestamp: new Date(),
      table: 'Table 1', // In a real app, this would be selected by the user
    };

    setOrders((prev) => [...prev, newOrder]);
    setCartItems([]);
    setShowCart(false);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((orders) =>
      orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const handleAdminClick = () => {
    setShowAdminAuth(true);
  };

  const handleAdminAuthSuccess = () => {
    setShowAdminAuth(false);
    setShowAdmin(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
        onAdminClick={handleAdminClick}
      />

      <main className="container mx-auto p-6 flex-1">
        <h1 className="text-3xl font-bold mb-8">Menu</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Drinks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter((product) => product.category === 'drink')
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Food</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter((product) => product.category === 'food')
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
          </div>
        </div>
      </main>

      <Footer />

      {showCart && (
        <Cart
          items={cartItems}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateCartItemQuantity}
          onCheckout={handleCheckout}
        />
      )}

      {showAdminAuth && (
        <AdminAuth
          onSuccess={handleAdminAuthSuccess}
          onClose={() => setShowAdminAuth(false)}
        />
      )}

      {showAdmin && (
        <AdminPanel
          orders={orders}
          onUpdateStatus={updateOrderStatus}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </div>
  );
}

export default App;