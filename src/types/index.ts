export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'destilados' | 'cervejas' | 'vinhos' | 'nao_alcoolicas' | 'pratos_principais' | 'porcoes' | 'saladas' | 'molhos';
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Table {
  number: number;
  waiter: string;
  status: 'available' | 'occupied' | 'attention' | 'urgent';
  lastInteraction: Date;
  orders: Order[];
  total: number;
}

export interface ClosedTable extends Omit<Table, 'status'> {
  closedAt: Date;
  duration: number; // in minutes
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  total: number;
  timestamp: Date;
  table: number;
  waiter: string;
}

export type UserRole = 'admin' | 'waiter' | 'cashier';

export interface User {
  role: UserRole;
  name: string;
  timestamp: Date;
}
