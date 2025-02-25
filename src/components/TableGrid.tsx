import React, { useEffect, useState } from 'react';
import { Clock, DollarSign, Plus, UtensilsCrossed } from 'lucide-react';
import type { Table, Order } from '../types';

interface TableGridProps {
  tables: Table[];
  onUpdateTable: (tableNumber: number, updates: Partial<Table>) => void;
  onCloseTable: (table: Table) => void;
  onOpenNewTable: (tableNumber: number, waiter: string) => void;
}

export function TableGrid({ tables, onUpdateTable, onCloseTable, onOpenNewTable }: TableGridProps) {
  const [newTableNumber, setNewTableNumber] = useState('');
  const [newTableWaiter, setNewTableWaiter] = useState('');
  const [showNewTableForm, setShowNewTableForm] = useState(false);
  const [timers, setTimers] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    // Load last interaction times from localStorage
    const loadLastInteractions = () => {
      const savedInteractions = localStorage.getItem('tableLastInteractions');
      if (savedInteractions) {
        const interactions = JSON.parse(savedInteractions);
        tables.forEach(table => {
          if (table.status !== 'available' && interactions[table.number]) {
            table.lastInteraction = new Date(interactions[table.number]);
          }
        });
      }
    };

    // Save last interaction times to localStorage
    const saveLastInteractions = () => {
      const interactions: { [key: number]: string } = {};
      tables.forEach(table => {
        if (table.status !== 'available') {
          interactions[table.number] = table.lastInteraction.toISOString();
        }
      });
      localStorage.setItem('tableLastInteractions', JSON.stringify(interactions));
    };

    // Check if user is logged in
    const isLoggedIn = !!localStorage.getItem('beachKioskUser');
    if (!isLoggedIn) {
      localStorage.removeItem('tableLastInteractions');
      return;
    }

    loadLastInteractions();

    const interval = setInterval(() => {
      const newTimers: { [key: number]: string } = {};
      let needsUpdate = false;
      
      tables.forEach(table => {
        if (table.status !== 'available') {
          const timeSinceLastInteraction = Date.now() - new Date(table.lastInteraction).getTime();
          const minutesPassed = Math.floor(timeSinceLastInteraction / (1000 * 60));
          const secondsPassed = Math.floor((timeSinceLastInteraction % (1000 * 60)) / 1000);
          
          // Format remaining time
          const timeLeft = 40 - minutesPassed;
          if (timeLeft > 0) {
            const minutes = timeLeft - 1;
            const seconds = 60 - secondsPassed;
            newTimers[table.number] = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          } else {
            newTimers[table.number] = '00:00';
          }

          // Update table status based on time
          if (minutesPassed >= 40 && table.status !== 'urgent') {
            onUpdateTable(table.number, { status: 'urgent' });
            needsUpdate = true;
          } else if (minutesPassed >= 20 && table.status !== 'attention') {
            onUpdateTable(table.number, { status: 'attention' });
            needsUpdate = true;
          }
        }
      });

      setTimers(newTimers);
      if (needsUpdate) {
        saveLastInteractions();
      }
    }, 1000);

    // Save current state before unloading
    const handleBeforeUnload = () => {
      saveLastInteractions();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [tables, onUpdateTable]);

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

  const handleNewTable = (e: React.FormEvent) => {
    e.preventDefault();
    const tableNum = parseInt(newTableNumber);
    if (tableNum > 0 && tableNum <= 100 && newTableWaiter.trim()) {
      onOpenNewTable(tableNum, newTableWaiter.trim());
      setNewTableNumber('');
      setNewTableWaiter('');
      setShowNewTableForm(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-800">Controle de Mesas</h2>
        <button
          onClick={() => setShowNewTableForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Abrir Nova Mesa
        </button>
      </div>

      {showNewTableForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form onSubmit={handleNewTable} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <UtensilsCrossed size={24} />
              Abrir Nova Mesa
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número da Mesa (1-100)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={newTableNumber}
                  onChange={(e) => setNewTableNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Garçom
                </label>
                <input
                  type="text"
                  value={newTableWaiter}
                  onChange={(e) => setNewTableWaiter(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Abrir Mesa
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewTableForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-5 gap-4">
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
                <div className="flex items-center gap-2">
                  <Clock
                    size={20}
                    className={table.status === 'urgent' ? 'text-red-500 animate-pulse' : ''}
                  />
                  <span className={`text-sm font-mono ${
                    table.status === 'urgent' ? 'text-red-600 font-bold' :
                    table.status === 'attention' ? 'text-yellow-600 font-bold' :
                    'text-gray-600'
                  }`}>
                    {timers[table.number] || '40:00'}
                  </span>
                </div>
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

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      const currentTable = table.number;
                      const currentWaiter = table.waiter;
                      window.dispatchEvent(new CustomEvent('openTableOrder', {
                        detail: { tableNumber: currentTable, waiter: currentWaiter }
                      }));
                    }}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    Adicionar Itens
                  </button>

                  <button
                    onClick={() => onCloseTable(table)}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <DollarSign size={16} />
                    Fechar Mesa
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
