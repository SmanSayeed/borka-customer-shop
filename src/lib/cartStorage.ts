'use client';

import config from '@/config';
import { ICart } from '@/types/cart';
const { cart_key, cart_expiry_time } = config();

// * Save cart to storage
export const saveCartToStorage = (cartItems: ICart[]) => {
  localStorage.setItem(cart_key, JSON.stringify(cartItems));
};

// * get cart from storage
export const getCartFromStorage = () => {
  if (typeof window === 'undefined') return [];

  const storedData = localStorage.getItem(cart_key);
  if (!storedData) return [];

  try {
    const items: ICart[] = JSON.parse(storedData);
    const currentTime = new Date().getTime();

    // Filter out expired items
    const validItems = items.filter((item) => {
      return item.cart_expiry && currentTime < item.cart_expiry;
    });
    // If some items expired, update storage
    if (validItems.length !== items.length) {
      saveCartToStorage(validItems);
    }

    return validItems;
  } catch {
    return [];
  }
};
