'use client';

import useCart from '@/hooks/useCart';
import { ShoppingBag } from 'lucide-react';

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className='rounded-full flex items-center justify-center 
                 hover:bg-primary transition-colors duration-500'
    >
      <ShoppingBag className='w-5 h-5' />
    </button>
  );
}
