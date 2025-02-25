import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { AdminPanel } from './components/AdminPanel';
import { AdminAuth } from './components/AdminAuth';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import { products } from './data/products';
import type { CartItem, Order, Product } from './types';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentTable, setCurrentTable] = useState<number>(0);
  const [currentWaiter, setCurrentWaiter] = useState<string>('');

  const addToCart = (product: Product) => {
    if (currentTable === 0) {
      const tableNumber = prompt('Por favor, insira o número da mesa (1-100):');
      const waiterName = prompt('Nome do Garçom:');
      
      if (!tableNumber || isNaN(Number(tableNumber)) || Number(tableNumber) < 1 || Number(tableNumber) > 100) {
        alert('Por favor, insira um número de mesa válido (1-100)');
        return;
      }
      
      setCurrentTable(Number(tableNumber));
      setCurrentWaiter(waiterName || '');
    }

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
    setShowCart(true);
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
    if (currentTable === 0) {
      alert('Por favor, selecione uma mesa antes de fazer o pedido');
      return;
    }

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
      table: currentTable,
      waiter: currentWaiter
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

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  const categories = {
    destilados: 'Destilados',
    cervejas: 'Cervejas',
    vinhos: 'Vinhos',
    nao_alcoolicas: 'Bebidas Não Alcoólicas',
    pratos_principais: 'Pratos Principais',
    porcoes: 'Porções',
    saladas: 'Saladas',
    molhos: 'Molhos Extras'
  } as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-50 flex flex-col">
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
        onAdminClick={handleAdminClick}
      />

      <main className="container mx-auto p-6 flex-1">
        {currentTable > 0 && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <p className="text-lg font-semibold">
              Mesa atual: {currentTable} | Garçom: {currentWaiter}
            </p>
          </div>
        )}

        <h1 className="text-4xl font-bold mb-8 text-green-800 text-center">
          Cardápio
        </h1>
        
        {Object.entries(categories).map(([category, title]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-green-800 flex items-center gap-2 before:content-[''] before:h-1 before:flex-1 before:bg-gradient-to-r before:from-yellow-400 before:to-green-400 after:content-[''] after:h-1 after:flex-1 after:bg-gradient-to-r after:from-green-400 after:to-yellow-400">
              <span className="px-4">{title}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter((product) => product.category === category)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
            </div>
          </div>
        ))}
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