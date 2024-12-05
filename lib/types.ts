export type Role = 'admin' | 'show';

export type Category = 'Column1' | 'Column2' | 'Column3' | 'Column4' | 'Column5';

export interface User {
  username: string;
  role: Role;
  showNumber?: number;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
}

export interface Stock {
  showId: number;
  productId: string;
  quantity: number;
  lastUpdated: string;
}

export interface ShowStatus {
  showId: number;
  status: 'Complete' | 'Incomplete';
  lastUpdated: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface CategoryNames {
  [key: string]: string;
}

export interface NewProduct {
  name: string;
  category: Category;
}