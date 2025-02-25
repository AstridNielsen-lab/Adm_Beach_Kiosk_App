import React from 'react';
import { Coffee, UtensilsCrossed, Printer } from 'lucide-react';
import { Order } from '../types';

interface AdminPanelProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onClose: () => void;
}

const BAR_CATEGORIES = ['destilados', 'cervejas', 'vinhos', 'nao_alcoolicas'];
const KITCHEN_CATEGORIES = ['pratos_principais', 'porcoes', 'saladas', 'molhos'];

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

  // Filtra os itens do pedido por categoria (bar ou cozinha)
  const filterOrderItems = (order: Order, isBar: boolean) => {
    const categories = isBar ? BAR_CATEGORIES : KITCHEN_CATEGORIES;
    return {
      ...order,
      items: order.items.filter(item => categories.includes(item.product.category))
    };
  };

  // Calcula o total dos itens filtrados
  const calculateFilteredTotal = (order: Order, isBar: boolean) => {
    const categories = isBar ? BAR_CATEGORIES : KITCHEN_CATEGORIES;
    return order.items
      .filter(item => categories.includes(item.product.category))
      .reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  // Verifica se o pedido tem itens para a seção específica
  const hasItemsForSection = (order: Order, isBar: boolean) => {
    const categories = isBar ? BAR_CATEGORIES : KITCHEN_CATEGORIES;
    return order.items.some(item => categories.includes(item.product.category));
  };

  const printOrder = (order: Order, isBar: boolean) => {
    const filteredOrder = filterOrderItems(order, isBar);
    const sectionTotal = calculateFilteredTotal(order, isBar);
    
    if (filteredOrder.items.length === 0) return;

    const content = `
      PEDIDO #${order.id}
      ${new Date(order.timestamp).toLocaleString()}
      Mesa: ${order.table}
      Status: ${order.status.toUpperCase()}
      
      ITENS:
      ${filteredOrder.items.map(item => 
        `${item.quantity}x ${item.product.name} - R$ ${(item.product.price * item.quantity).toFixed(2)}`
      ).join('\n')}
      
      Total dos itens: R$ ${sectionTotal.toFixed(2)}
    `;

    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <pre style="font-family: monospace; padding: 20px;">
        ${content}
      </pre>
    `);
    printWindow?.document.close();
    printWindow?.print();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Voltar para a Loja
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-orange-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <UtensilsCrossed />
              <h2 className="text-xl font-semibold">Pedidos - Cozinha</h2>
            </div>
            {orders
              .filter(order => hasItemsForSection(order, false))
              .map(order => (
                <OrderCard
                  key={order.id}
                  order={filterOrderItems(order, false)}
                  getStatusColor={getStatusColor}
                  onUpdateStatus={onUpdateStatus}
                  onPrint={() => printOrder(order, false)}
                  total={calculateFilteredTotal(order, false)}
                />
              ))}
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Coffee />
              <h2 className="text-xl font-semibold">Pedidos - Bar</h2>
            </div>
            {orders
              .filter(order => hasItemsForSection(order, true))
              .map(order => (
                <OrderCard
                  key={order.id}
                  order={filterOrderItems(order, true)}
                  getStatusColor={getStatusColor}
                  onUpdateStatus={onUpdateStatus}
                  onPrint={() => printOrder(order, true)}
                  total={calculateFilteredTotal(order, true)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface OrderCardProps {
  order: Order;
  getStatusColor: (status: Order['status']) => string;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onPrint: () => void;
  total: number;
}

function OrderCard({
  order,
  getStatusColor,
  onUpdateStatus,
  onPrint,
  total
}: OrderCardProps) {
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
          <span className="font-semibold">Pedido #{order.id}</span>
          <div className="text-sm text-gray-500 mt-1">
            <span>Mesa: {order.table}</span>
            <span className="mx-2">•</span>
            <span>{new Date(order.timestamp).toLocaleTimeString()}</span>
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
          <span className="ml-2 font-semibold">R$ {total.toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPrint}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1"
          >
            <Printer size={18} />
            Imprimir
          </button>
          {order.status !== 'delivered' && (
            <button
              onClick={() => onUpdateStatus(order.id, nextStatus[order.status])}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Atualizar Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
}