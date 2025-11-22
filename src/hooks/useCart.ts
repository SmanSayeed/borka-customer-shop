'use client';

import { sentUserCartDetails } from '@/actions/cart';
import { initialCart } from '@/constants/cart';
import { getCartFromStorage, saveCartToStorage } from '@/lib/cartStorage';
import { ICart, ICartData } from '@/types/cart';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function useCart() {
  const [cartDetails, setCartDetails] = useState<ICartData>(initialCart);

  // Load cart from storage on mount and fetch details
  useEffect(() => {
    const stored = getCartFromStorage();
    if (stored.length > 0) {
      fetchCartDetails(stored);
    }
  }, []);

  // Fetch cart from backend and update
  const fetchCartDetails = async (products: ICart[]) => {
    try {
      const response = await sentUserCartDetails({items: products});
      console.log(response, 'response')
      if (response.success) {
        setCartDetails(response.data);
        saveCartToStorage(products);
        toast.success('Cart updated successfully!');
      } else {
        toast.error('Failed to update cart');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };

  // Add products to cart
  const addToCart = async (payload: { items: ICart[] }) => {
    const currentCart = getCartFromStorage();
    const newItems = payload.items.map((item) => ({
      ...item,
      cart_expiry: new Date().getTime() + 24 * 60 * 60 * 1000, // 24 hours from now
    }));

    // Merge new items with current cart
    // If item exists (same product_id and size_id), update quantity
    // Otherwise add new item
    let updatedCart = [...currentCart];

    newItems.forEach((newItem) => {
      const existingItemIndex = updatedCart.findIndex(
        (item) =>
          item.product_id === newItem.product_id &&
          item.size_id === newItem.size_id
      );

      if (existingItemIndex > -1) {
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        updatedCart[existingItemIndex].cart_expiry = newItem.cart_expiry; // Update expiry on re-add
      } else {
        updatedCart.push(newItem);
      }
    });

    saveCartToStorage(updatedCart);
    
    // Fetch fresh data to sync with UI
    const freshCart = getCartFromStorage();
    
    try {
      const response = await sentUserCartDetails({ items: freshCart });
      console.log(response, 'fresh cart')
      if (response.success) {
        setCartDetails(response.data);
        toast.success('Added to cart successfully!');
        // Redirect to cart
        window.location.href = '/cart';
      } else {
        toast.error('Failed to update cart');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };

  // Update product quantity
  const updateQuantity = async (id: number, quantity: number) => {
    const currentCart = getCartFromStorage();
    const updatedCart = currentCart.map((p) =>
      p.product_id === id ? { ...p, quantity } : p
    );
    
    saveCartToStorage(updatedCart);
    await fetchCartDetails(updatedCart);
  };

  // Remove product from cart
  const removeItem = async (id: number) => {
    const currentCart = getCartFromStorage();
    const updatedCart = currentCart.filter(
      (p) => p.product_id !== id
    );
    
    saveCartToStorage(updatedCart);
    await fetchCartDetails(updatedCart);
  };

  return {
    cartDetails,
    addToCart,
    updateQuantity,
    removeItem,
  };
}
