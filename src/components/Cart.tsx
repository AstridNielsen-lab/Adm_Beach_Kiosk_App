import React from 'react';
import { X, Minus, Plus, ShoppingBag, Send, CreditCard, Printer } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, change: number) => void;
  onCheckout: () => void;
}

export function Cart({ items, onClose, onUpdateQuantity, onCheckout }: CartProps) {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePayment = () => {
    window.open('https://link.mercadopago.com.br/likelooksolutions', '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg p-6 transform transition-transform">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <ShoppingBag size={64} className="text-gray-300 mb-4" />
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg p-6 transform transition-transform">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center gap-4 py-4 border-b"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">
                R$ {item.product.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => onUpdateQuantity(item.product.id, -1)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.product.id, 1)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-xl font-bold">R$ {total.toFixed(2)}</span>
        </div>
        <div className="space-y-3">
          <button
            onClick={onCheckout}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Send size={20} />
            Enviar Pedido
          </button>
          <button
            onClick={handlePayment}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard size={20} />
            Pagar com Mercado Pago
          </button>
        </div>
      </div>
    </div>
  );
}