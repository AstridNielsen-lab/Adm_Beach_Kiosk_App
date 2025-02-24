export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'food' | 'drink';
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  total: number;
  timestamp: Date;
  table: string;
}