import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border-2 border-yellow-400 group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-white">
              R$ {product.price.toFixed(2)}
            </span>
            <button
              onClick={() => onAddToCart(product)}
              className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors transform hover:scale-110 hover:rotate-180 duration-300 shadow-lg"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-r from-yellow-50 to-green-50">
        <h3 className="text-lg font-bold text-green-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
      </div>
    </div>
  );
}