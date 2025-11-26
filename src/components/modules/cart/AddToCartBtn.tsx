'use client';

import useCart from '@/hooks/useCart';
import { IProduct } from '@/types';
import { ShoppingCart } from 'lucide-react';

interface Props {
  product: IProduct;
}

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      items: [
        {
          product_id: product.id,
          quantity: 1,
          size_id: null,
        },
      ],
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className='bg-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-500 shadow-md'
    >
      <ShoppingCart className='w-5 h-5' />
    </button>
  );
}
