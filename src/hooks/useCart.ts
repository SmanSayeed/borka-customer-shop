'use client';

import { useGlobalContext } from '@/context/GlobalContext';

export default function useCart() {
  const {
    cartDetails,
    fetchCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    isCartLoading,
  } = useGlobalContext();

  return {
    cartDetails,
    fetchCart,
    addToCart,
    updateQuantity: (id: number, quantity: number, sizeId?: number) =>
      updateQuantity(id, quantity, sizeId),
    removeItem: (id: number, sizeId?: number) => removeItem(id, sizeId),
    clearCart,
    isCartLoading,
  };
}
