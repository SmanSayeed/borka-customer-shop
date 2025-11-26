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
    updateQuantity,
    removeItem: (id: number, sizeId?: number) => removeItem(id, sizeId),
    clearCart,
    isCartLoading,
  };
}
