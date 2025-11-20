'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <motion.div
      key={product.id}
      className='  
                 overflow-hidden group transition-all duration-500 '
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link href={`/products/${product.id}`}>
        <div className='relative w-full aspect-3/4 overflow-hidden rounded-md'>
          {product.product_code && (
            <span className='absolute top-3 left-3 z-10 bg-[#14854e] text-white text-[11px] px-2 py-1 rounded-md shadow'>
              {product.product_code.toUpperCase()}
            </span>
          )}

          {product.discount_label && (
            <span className='absolute top-3 right-3 z-10 bg-[#d0473e] text-white text-xs font-semibold px-2 py-1 rounded-md shadow'>
              - {product.discount_label}
            </span>
          )}

          <Image
            src={product.thumbnail_url || '/placeholder.png'}
            alt={product.product_label || 'Product Image'}
            height={500}
            width={350}
            className='object-cover w-full h-full transition-transform duration-700 group-hover:scale-110'
          />
        </div>

        <div className='py-8 px-8 text-center'>
          <h4 className='font-semibold text-xl'>{product.product_label}</h4>

          <p className='text-sm text-gray-500 mt-1'>
            {Array.isArray(product.color_name)
              ? product.color_name.join(' - ')
              : product.product_category}
          </p>

          <p className='font-semibold text-primary mt-3 text-xl'>
            ৳{Number(product.sale_price ?? 0).toLocaleString()}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
