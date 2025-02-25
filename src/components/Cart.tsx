import React from 'react';
import { X, Minus, Plus, ShoppingBag, Send, CreditCard } from 'lucide-react';
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
      <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-50 shadow-lg p-6 transform transition-transform">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-green-800">Seu Carrinho</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-100 rounded-full transition-colors text-red-500"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <ShoppingBag size={64} className="text-yellow-400 mb-4" />
          <p className="text-green-800">Seu carrinho está vazio</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-50 shadow-lg flex flex-col h-full">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-800">Seu Carrinho</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-100 rounded-full transition-colors text-red-500"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-green-800">Total:</span>
          <span className="text-xl font-bold text-green-800">R$ {total.toFixed(2)}</span>
        </div>

        <div className="space-y-3 mb-6">
          <button
            onClick={onCheckout}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 font-bold"
          >
            <Send size={20} />
            Enviar Pedido
          </button>
          <button
            onClick={handlePayment}
            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 font-bold"
          >
            <CreditCard size={20} />
            Pagar com Mercado Pago
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center gap-4 py-4 border-b border-green-200 group hover:bg-white/50 rounded-lg transition-colors"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="flex-1">
              <h3 className="font-bold text-green-800">{item.product.name}</h3>
              <p className="text-green-700">
                R$ {item.product.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => onUpdateQuantity(item.product.id, -1)}
                  className="p-1 bg-red-500 text-white hover:bg-red-600 rounded-full transition-colors shadow-md hover:shadow-lg"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-bold text-green-800">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.product.id, 1)}
                  className="p-1 bg-green-500 text-white hover:bg-green-600 rounded-full transition-colors shadow-md hover:shadow-lg"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}