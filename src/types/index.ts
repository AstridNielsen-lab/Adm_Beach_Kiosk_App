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

export interface Order {
  id: string;
  items: CartItem[];
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  total: number;
  timestamp: Date;
  table: string;
}