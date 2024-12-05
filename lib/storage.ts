import { Stock, ShowStatus, Product } from './types';

const STORAGE_KEYS = {
  STOCK: 'inventory_stock',
  STATUS: 'show_statuses',
  PRODUCTS: 'products_list'
};

export const getStoredStock = (): Stock[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.STOCK);
  return stored ? JSON.parse(stored) : [];
};

export const setStoredStock = (stock: Stock[]) => {
  localStorage.setItem(STORAGE_KEYS.STOCK, JSON.stringify(stock));
};

export const getStoredStatuses = (): ShowStatus[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.STATUS);
  return stored ? JSON.parse(stored) : [];
};

export const setStoredStatuses = (statuses: ShowStatus[]) => {
  localStorage.setItem(STORAGE_KEYS.STATUS, JSON.stringify(statuses));
};

export const getStoredProducts = (): Product[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  return stored ? JSON.parse(stored) : [];
};

export const setStoredProducts = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
};