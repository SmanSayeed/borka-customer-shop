'use client';

import { getCartFromStorage, saveCartToStorage } from '@/lib/cartStorage';
import { IProduct } from '@/types';
import { ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  product: IProduct;
  text?: string;
}

export default function AddToCartButton({ product, text = 'Add To Cart' }: Props) {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    setCart(getCartFromStorage());
  }, []);

  const handleAddToCart = () => {
    const updatedCart = [...cart];
    const existing = updatedCart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        className='bg-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-500'
      >
        <ShoppingBag className='w-5 h-5' />
      </button>
    </div>
  );
}
