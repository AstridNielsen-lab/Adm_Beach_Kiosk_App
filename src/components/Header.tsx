import { ShoppingCart, UmbrellaIcon } from 'lucide-react';
import React from 'react';
import { AnimatedText } from './AnimatedText';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onAdminClick: () => void;
}

export function Header({ cartItemCount, onCartClick, onAdminClick }: HeaderProps) {
  return (
    <header className="bg-blue-500 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <UmbrellaIcon size={32} className="animate-[bounce_2s_ease-in-out_infinite]" />
          <AnimatedText
            text="Beach Kiosk"
            className="text-2xl font-bold"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onAdminClick}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Admin Panel
          </button>
          <button
            onClick={onCartClick}
            className="relative p-2 hover:bg-blue-600 rounded-full transition-colors"
          >
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}