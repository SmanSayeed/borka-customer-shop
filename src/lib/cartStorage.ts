'use client';

import { ICart } from '@/types';

export const CART_KEY = 'cart';
const EXPIRATION_TIME = 1 * 24 * 60 * 60 * 1000;

// * set cart to storage
export const saveCartToStorage = (cartItems: ICart[]) => {
  const data = {
    items: cartItems,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem(CART_KEY, JSON.stringify(data));
};

// * get cart from storage
export const getCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];

  const storedData = localStorage.getItem(CART_KEY);
  if (!storedData) return [];

  try {
    const { items, timestamp } = JSON.parse(storedData);

    if (new Date().getTime() - timestamp > EXPIRATION_TIME) {
      localStorage.removeItem(CART_KEY);
      return [];
    }

    return items;
  } catch {
    localStorage.removeItem(CART_KEY);
    return [];
  }
};
