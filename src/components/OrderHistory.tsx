import React, { useState } from 'react';
import { History, Search, Plus } from 'lucide-react';
import type { Order } from '../types';

interface OrderHistoryProps {
  orders: Order[];
  onClose: () => void;
}

export function OrderHistory({ orders, onClose }: OrderHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWaiter, setFilterWaiter] = useState('');
  const [filterTable, setFilterTable] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.waiter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWaiter = !filterWaiter || order.waiter === filterWaiter;
    const matchesTable = !filterTable || order.table.toString() === filterTable;
    return matchesSearch && matchesWaiter && matchesTable;
  });

  const uniqueWaiters = Array.from(new Set(orders.map(order => order.waiter)))
    .filter(Boolean)
    .sort();

  const uniqueTables = Array.from(new Set(orders.map(order => order.table)))
    .sort((a, b) => a - b);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <History size={24} />
            Histórico de Pedidos
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Plus size={24} className="rotate-45" />
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por garçom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterWaiter}
            onChange={(e) => setFilterWaiter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos os Garçons</option>
            {uniqueWaiters.map(waiter => (
              <option key={waiter} value={waiter}>{waiter}</option>
            ))}
          </select>
          <select
            value={filterTable}
            onChange={(e) => setFilterTable(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todas as Mesas</option>
            {uniqueTables.map(table => (
              <option key={table} value={table.toString()}>Mesa {table}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white shadow-sm">
              <tr className="border-b-2 border-gray-200">
                <th className="py-3 px-4">Data/Hora</th>
                <th className="py-3 px-4">Mesa</th>
                <th className="py-3 px-4">Garçom</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Itens</th>
                <th className="py-3 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {new Date(order.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">Mesa {order.table}</td>
                  <td className="py-3 px-4">{order.waiter}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'ready' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="max-h-20 overflow-y-auto">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          {item.quantity}x {item.product.name}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">R$ {order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}