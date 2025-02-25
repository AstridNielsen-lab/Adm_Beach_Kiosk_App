import React, { useEffect, useState } from 'react';
import { Clock, DollarSign, Plus, UtensilsCrossed, History, CreditCard, Printer } from 'lucide-react';
import type { Table, Order, ClosedTable, PaymentMethod } from '../types';

interface TableGridProps {
  tables: Table[];
  onUpdateTable: (tableNumber: number, updates: Partial<Table>) => void;
  onCloseTable: (table: Table) => void;
  onOpenNewTable: (tableNumber: number, waiter: string) => void;
}

interface PaymentModalProps {
  table: Table;
  onClose: () => void;
  onConfirm: (table: Table, paymentMethod: PaymentMethod) => void;
}

function PaymentModal({ table, onClose, onConfirm }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');

  const handlePayment = () => {
    if (paymentMethod === 'mercadopago') {
      window.open('https://link.mercadopago.com.br/likelooksolutions', '_blank');
    }
    onConfirm(table, paymentMethod);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <DollarSign size={24} />
          Fechar Mesa {table.number}
        </h3>
        
        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">Total: R$ {table.total.toFixed(2)}</p>
          <p className="text-sm text-gray-600">Selecione a forma de pagamento:</p>
        </div>

        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="w-4 h-4 text-blue-600"
            />
            <span>Dinheiro</span>
          </label>
          
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="w-4 h-4 text-blue-600"
            />
            <span>Cartão de Crédito/Débito</span>
          </label>
          
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="payment"
              value="pix"
              checked={paymentMethod === 'pix'}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="w-4 h-4 text-blue-600"
            />
            <span>PIX</span>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="payment"
              value="mercadopago"
              checked={paymentMethod === 'mercadopago'}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="w-4 h-4 text-blue-600"
            />
            <span>Mercado Pago</span>
          </label>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handlePayment}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard size={20} />
            Confirmar Pagamento
          </button>
        </div>
      </div>
    </div>
  );
}

export function TableGrid({ tables, onUpdateTable, onCloseTable, onOpenNewTable }: TableGridProps) {
  const [newTableNumber, setNewTableNumber] = useState('');
  const [newTableWaiter, setNewTableWaiter] = useState('');
  const [showNewTableForm, setShowNewTableForm] = useState(false);
  const [showClosedTables, setShowClosedTables] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState<Table | null>(null);
  const [closedTables, setClosedTables] = useState<ClosedTable[]>(() => {
    const saved = localStorage.getItem('closedTables');
    return saved ? JSON.parse(saved, (key, value) => {
      if (key === 'closedAt' || key === 'lastInteraction') {
        return new Date(value);
      }
      return value;
    }) : [];
  });
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

  const handleCloseTable = (table: Table) => {
    setShowPaymentModal(table);
  };

  const handlePaymentConfirm = (table: Table, paymentMethod: PaymentMethod) => {
    const duration = Math.floor(
      (Date.now() - new Date(table.lastInteraction).getTime()) / (1000 * 60)
    );
    
    const closedTable: ClosedTable = {
      ...table,
      closedAt: new Date(),
      duration,
      paymentMethod
    };

    setClosedTables(prev => {
      const updated = [closedTable, ...prev].slice(0, 100); // Keep last 100 entries
      localStorage.setItem('closedTables', JSON.stringify(updated));
      return updated;
    });

    onCloseTable(table);
    setShowPaymentModal(null);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const getPaymentMethodLabel = (method: PaymentMethod) => {
    switch (method) {
      case 'cash':
        return 'Dinheiro';
      case 'card':
        return 'Cartão';
      case 'pix':
        return 'PIX';
      case 'mercadopago':
        return 'Mercado Pago';
    }
  };

  const handlePrintBill = (table: Table) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Conta - Mesa ${table.number}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px;
            line-height: 1.6;
          }
          .header { 
            text-align: center; 
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #ccc;
          }
          .info { 
            margin-bottom: 20px; 
          }
          .items { 
            margin-bottom: 20px;
            width: 100%;
          }
          .items th {
            text-align: left;
            padding: 8px;
            border-bottom: 1px solid #ccc;
          }
          .items td {
            padding: 8px;
          }
          .total { 
            text-align: right;
            font-size: 1.2em;
            font-weight: bold;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ccc;
          }
          @media print {
            .no-print { 
              display: none; 
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Beach Kiosk</h1>
          <p>Conta da Mesa ${table.number}</p>
        </div>
        
        <div class="info">
          <p><strong>Data:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Hora:</strong> ${new Date().toLocaleTimeString()}</p>
          <p><strong>Garçom:</strong> ${table.waiter}</p>
        </div>

        <table class="items">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qtd</th>
              <th>Valor Unit.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${table.orders.flatMap(order => 
              order.items.map(item => `
                <tr>
                  <td>${item.product.name}</td>
                  <td>${item.quantity}</td>
                  <td>R$ ${item.product.price.toFixed(2)}</td>
                  <td>R$ ${(item.product.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')
            )}
          </tbody>
        </table>

        <div class="total">
          Total: R$ ${table.total.toFixed(2)}
        </div>

        <button class="no-print" onclick="window.print()">Imprimir</button>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-800">Controle de Mesas</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowClosedTables(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <History size={20} />
            Mesas Fechadas
          </button>
          <button
            onClick={() => setShowNewTableForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Abrir Nova Mesa
          </button>
        </div>
      </div>

      {showClosedTables && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <History size={24} />
                Histórico de Mesas Fechadas
              </h3>
              <button
                onClick={() => setShowClosedTables(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 px-4">Mesa</th>
                    <th className="py-3 px-4">Garçom</th>
                    <th className="py-3 px-4">Pedidos</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Duração</th>
                    <th className="py-3 px-4">Pagamento</th>
                    <th className="py-3 px-4">Fechado em</th>
                  </tr>
                </thead>
                <tbody>
                  {closedTables.map((table, index) => (
                    <tr key={`${table.number}-${index}`} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{table.number}</td>
                      <td className="py-3 px-4">{table.waiter}</td>
                      <td className="py-3 px-4">{table.orders.length}</td>
                      <td className="py-3 px-4">R$ {table.total.toFixed(2)}</td>
                      <td className="py-3 px-4">{formatDuration(table.duration)}</td>
                      <td className="py-3 px-4">{getPaymentMethodLabel(table.paymentMethod)}</td>
                      <td className="py-3 px-4">
                        {new Date(table.closedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

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

      {showPaymentModal && (
        <PaymentModal
          table={showPaymentModal}
          onClose={() => setShowPaymentModal(null)}
          onConfirm={handlePaymentConfirm}
        />
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
                    onClick={() => handlePrintBill(table)}
                    className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Printer size={16} />
                    Imprimir Conta
                  </button>

                  <button
                    onClick={() => handleCloseTable(table)}
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
