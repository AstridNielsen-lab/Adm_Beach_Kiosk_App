import React, { useState, useEffect } from 'react';
import { Coffee, UtensilsCrossed, Printer, Grid } from 'lucide-react';
import { Order, Table } from '../types';
import { TableGrid } from './TableGrid';

interface AdminPanelProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onClose: () => void;
}

const BAR_CATEGORIES = ['destilados', 'cervejas', 'vinhos', 'nao_alcoolicas'];
const KITCHEN_CATEGORIES = ['pratos_principais', 'porcoes', 'saladas', 'molhos'];

const INITIAL_TABLES: Table[] = Array.from({ length: 100 }, (_, i) => ({
  number: i + 1,
  waiter: '',
  status: 'available',
  lastInteraction: new Date(),
  orders: [],
  total: 0,
}));

export function AdminPanel({ orders, onUpdateStatus, onClose }: AdminPanelProps) {
  const [activeView, setActiveView] = useState<'orders' | 'tables'>('orders');
  const [tables, setTables] = useState<Table[]>(INITIAL_TABLES);

  useEffect(() => {
    // Update tables based on orders
    const updatedTables = [...tables];
    orders.forEach(order => {
      const tableIndex = updatedTables.findIndex(t => t.number === order.table);
      if (tableIndex !== -1) {
        const table = updatedTables[tableIndex];
        if (!table.orders.find(o => o.id === order.id)) {
          table.orders.push(order);
          table.total = table.orders.reduce((sum, o) => sum + o.total, 0);
          table.status = 'occupied';
          table.lastInteraction = new Date();
          table.waiter = order.waiter || table.waiter;
        }
      }
    });
    setTables(updatedTables);
  }, [orders]);

  const handleUpdateTable = (tableNumber: number, updates: Partial<Table>) => {
    setTables(tables.map(table =>
      table.number === tableNumber ? { ...table, ...updates } : table
    ));
  };

  const handleCloseTable = (table: Table) => {
    // Open Mercado Pago link with the total amount
    window.open('https://link.mercadopago.com.br/likelooksolutions', '_blank');
    
    // Reset table
    setTables(tables.map(t =>
      t.number === table.number ? {
        ...t,
        status: 'available',
        orders: [],
        total: 0,
        waiter: '',
        lastInteraction: new Date()
      } : t
    ));
  };

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
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveView('orders')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeView === 'orders'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Pedidos
            </button>
            <button
              onClick={() => setActiveView('tables')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeView === 'tables'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Mesas
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Voltar para a Loja
            </button>
          </div>
        </div>

        {activeView === 'tables' ? (
          <TableGrid
            tables={tables}
            onUpdateTable={handleUpdateTable}
            onCloseTable={handleCloseTable}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <UtensilsCrossed />
                <h2 className="text-xl font-semibold">Pedidos - Cozinha</h2>
              </div>
              {orders
                .filter(order => order.items.some(item => 
                  KITCHEN_CATEGORIES.includes(item.product.category)
                ))
                .map(order => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    getStatusColor={getStatusColor}
                    onUpdateStatus={onUpdateStatus}
                    categories={KITCHEN_CATEGORIES}
                  />
                ))}
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Coffee />
                <h2 className="text-xl font-semibold">Pedidos - Bar</h2>
              </div>
              {orders
                .filter(order => order.items.some(item => 
                  BAR_CATEGORIES.includes(item.product.category)
                ))
                .map(order => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    getStatusColor={getStatusColor}
                    onUpdateStatus={onUpdateStatus}
                    categories={BAR_CATEGORIES}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface OrderCardProps {
  order: Order;
  getStatusColor: (status: Order['status']) => string;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  categories: string[];
}

function OrderCard({
  order,
  getStatusColor,
  onUpdateStatus,
  categories
}: OrderCardProps) {
  const nextStatus: Record<Order['status'], Order['status']> = {
    pending: 'preparing',
    preparing: 'ready',
    ready: 'delivered',
    delivered: 'delivered',
  };

  const filteredItems = order.items.filter(item => 
    categories.includes(item.product.category)
  );

  const total = filteredItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="font-semibold">Pedido #{order.id}</span>
          <div className="text-sm text-gray-500 mt-1">
            <span>Mesa: {order.table}</span>
            <span className="mx-2">•</span>
            <span>Garçom: {order.waiter}</span>
            <span className="mx-2">•</span>
            <span>{new Date(order.timestamp).toLocaleTimeString()}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="space-y-2">
        {filteredItems.map((item) => (
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
          <span className="ml-2 font-semibold">R$ {total.toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onUpdateStatus(order.id, nextStatus[order.status])}
            className={`px-4 py-2 rounded-lg transition-colors ${
              order.status === 'delivered'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            disabled={order.status === 'delivered'}
          >
            Atualizar Status
          </button>
        </div>
      </div>
    </div>
  );
}