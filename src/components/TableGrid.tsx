import React, { useEffect, useState } from 'react';
import { Clock, DollarSign } from 'lucide-react';
import type { Table, Order } from '../types';

interface TableGridProps {
  tables: Table[];
  onUpdateTable: (tableNumber: number, updates: Partial<Table>) => void;
  onCloseTable: (table: Table) => void;
}

export function TableGrid({ tables, onUpdateTable, onCloseTable }: TableGridProps) {
  useEffect(() => {
    const interval = setInterval(() => {
      tables.forEach(table => {
        if (table.status === 'occupied') {
          const timeSinceLastInteraction = Date.now() - new Date(table.lastInteraction).getTime();
          const minutesPassed = Math.floor(timeSinceLastInteraction / (1000 * 60));

          if (minutesPassed >= 40) {
            onUpdateTable(table.number, { status: 'urgent' });
          } else if (minutesPassed >= 20) {
            onUpdateTable(table.number, { status: 'attention' });
          }
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [tables]);

  const getTableColor = (status: Table['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 hover:bg-green-200';
      case 'occupied':
        return 'bg-blue-100 hover:bg-blue-200';
      case 'attention':
        return 'bg-yellow-100 hover:bg-yellow-200';
      case 'urgent':
        return 'bg-red-100 hover:bg-red-200';
    }
  };

  const handleWaiterChange = (tableNumber: number, waiter: string) => {
    onUpdateTable(tableNumber, { waiter });
  };

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {tables.map((table) => (
        <div
          key={table.number}
          className={`${getTableColor(
            table.status
          )} p-4 rounded-lg shadow-md transition-all`}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold">Mesa {table.number}</h3>
            {table.status !== 'available' && (
              <Clock
                size={20}
                className={table.status === 'urgent' ? 'text-red-500 animate-pulse' : ''}
              />
            )}
          </div>

          {table.status !== 'available' && (
            <>
              <input
                type="text"
                value={table.waiter}
                onChange={(e) => handleWaiterChange(table.number, e.target.value)}
                placeholder="Nome do Garçom"
                className="w-full px-2 py-1 rounded border mb-2 text-sm"
              />

              <div className="text-sm mb-2">
                <p>Pedidos: {table.orders.length}</p>
                <p>Total: R$ {table.total.toFixed(2)}</p>
              </div>

              <button
                onClick={() => onCloseTable(table)}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <DollarSign size={16} />
                Fechar Mesa
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}