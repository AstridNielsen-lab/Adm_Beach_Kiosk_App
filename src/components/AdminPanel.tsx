import React from 'react';
import { Clock, Coffee, UtensilsCrossed } from 'lucide-react';
import { Order } from '../types';

interface AdminPanelProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onClose: () => void;
}

export function AdminPanel({ orders, onUpdateStatus, onClose }: AdminPanelProps) {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back to Store
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-orange-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <UtensilsCrossed />
              <h2 className="text-xl font-semibold">Kitchen Orders</h2>
            </div>
            {orders
              .filter((order) => order.items.some((item) => item.product.category === 'food'))
              .map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  getStatusColor={getStatusColor}
                  onUpdateStatus={onUpdateStatus}
                />
              ))}
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Coffee />
              <h2 className="text-xl font-semibold">Bar Orders</h2>
            </div>
            {orders
              .filter((order) => order.items.some((item) => item.product.category === 'drink'))
              .map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  getStatusColor={getStatusColor}
                  onUpdateStatus={onUpdateStatus}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderCard({
  order,
  getStatusColor,
  onUpdateStatus,
}: {
  order: Order;
  getStatusColor: (status: Order['status']) => string;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}) {
  const nextStatus: Record<Order['status'], Order['status']> = {
    pending: 'preparing',
    preparing: 'ready',
    ready: 'delivered',
    delivered: 'delivered',
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="font-semibold">Order #{order.id}</span>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <Clock size={16} />
            <span>
              {new Date(order.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="space-y-2">
        {order.items.map((item) => (
          <div key={item.product.id} className="flex justify-between text-sm">
            <span>{item.quantity}x {item.product.name}</span>
            <span className="text-gray-600">
              R$ {(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-600">Total:</span>
          <span className="ml-2 font-semibold">R$ {order.total.toFixed(2)}</span>
        </div>
        {order.status !== 'delivered' && (
          <button
            onClick={() => onUpdateStatus(order.id, nextStatus[order.status])}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Update Status
          </button>
        )}
      </div>
    </div>
  );
}