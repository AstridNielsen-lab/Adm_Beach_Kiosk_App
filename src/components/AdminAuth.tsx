import React, { useState } from 'react';
import { KeyRound, X } from 'lucide-react';

interface AdminAuthProps {
  onSuccess: () => void;
  onClose: () => void;
}

export function AdminAuth({ onSuccess, onClose }: AdminAuthProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Beach Kiosk') {
      onSuccess();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Admin Access</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter admin password"
                autoComplete="current-password"
              />
              <KeyRound className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
            {error && (
              <p className="mt-1 text-sm text-red-600">
                Incorrect password. Please try again.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Access Admin Panel
          </button>
        </form>
      </div>
    </div>
  );
}