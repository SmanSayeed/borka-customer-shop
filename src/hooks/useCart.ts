'use client';

import { useEffect, useState } from 'react';
import { getCartFromStorage, saveCartToStorage } from '@/lib/cartStorage';
import { ICart } from '@/types';
import { toast } from 'sonner';

export default function useCart() {
  const [carts, setCart] = useState<ICart[]>([]);

  // Load cart from storage on mount
  useEffect(() => {
    const storedCart = getCartFromStorage();
    setCart(storedCart);
  }, []);

  // * Add product to cart
  const addToCart = (product: ICart) => {
    const updatedCard = [...carts];
    const existingCard = updatedCard.find((cart) => cart.id === product.id);

    if (existingCard) {
      existingCard.quantity += 1;
    } else {
      updatedCard.push({ ...product, quantity: 1 });
    }

    setCart(updatedCard);
    saveCartToStorage(updatedCard);

    toast.success(`${product.name} Added to Cart!`);
  };

  // * Change product quantity
  const updateQuantity = (id: string, quantity: number) => {
    const updated = carts.map((cart) =>
      cart.id === id ? { ...cart, quantity } : cart
    );
    setCart(updated);
    saveCartToStorage(updated);
  };

  // * Remove from cart
  const removeItem = (id: string) => {
    const updated = carts.filter((cart) => cart.id !== id);
    setCart(updated);
    saveCartToStorage(updated);
  };

  // * Calculate subtotal
  const subtotal = carts.reduce(
    (sum, cart) => sum + cart.price * cart.quantity,
    0
  );

  return {
    carts,
    addToCart,
    updateQuantity,
    removeItem,
    subtotal,
  };
}
