import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">R$ {product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}