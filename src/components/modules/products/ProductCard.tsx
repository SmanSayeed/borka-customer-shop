'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { ProductCardProps } from '@/types';

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      key={product.id}
      className='overflow-hidden group transition-all duration-500'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link href={`/products/${product.id}`}>
        <div className='relative w-full aspect-3/4 overflow-hidden'>
         <Image
            src={product.thumbnail_url || '/placeholder.png'}
            alt={product.product_label || 'Product Image'}
            height={500}
            width={350}
            className='object-cover w-full h-full transition-transform duration-700 group-hover:scale-110'
          />
        </div>

        <div className='py-4 space-y-2'>
          <h4 className='font-semibold text-base sm:text-xl'>{product.product_label}</h4>
          <p className='font-semibold text-lg text-gray-400'>
            ৳ {' '}{Number(product.sale_price ?? 0).toLocaleString()}
          {product.is_discount_active ? (
            <span className='text-xs text-gray-500 line-through ml-2'>৳ {Number(product.original_price ?? 0).toLocaleString()}</span>
          ) : null}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
