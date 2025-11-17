'use client';

import AddToCartButton from '@/components/shared/addToCartBtn';
import { IProduct } from '@/types';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Eye, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <motion.div
      className='relative overflow-hidden bg-white rounded-xl transition-all duration-700 group' // <-- add group here
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1 }}
    >
      <div
        className={clsx(
          'relative w-full overflow-hidden',
          'aspect-3/4 h-[380px] md:h-[620px]'
        )}
      >
        {product.product_code && (
          <span className='absolute top-3 left-3 z-10 bg-[#14854e] text-white text-[11px] px-2 py-1'>
            {product.product_code.toUpperCase()}
          </span>
        )}

        {product.discount_label && (
          <span className='absolute top-3 right-3 z-10 bg-[#d0473e] text-white text-xs font-semibold px-2 py-1'>
            - {product.discount_label}
          </span>
        )}

        <Image
          src={product.thumbnail_url || '/placeholder.png'}
          alt={product.product_label || 'Product Image'}
          height={900}
          width={500}
          className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
        />

        <div className='absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10'>
          <AddToCartButton product={product} />

          <button className='bg-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-500'>
            <Heart className='w-5 h-5' />
          </button>

          <Link href={`/products/${product.slug}`}>
            <button className='bg-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-500'>
              <Eye className='w-5 h-5' />
            </button>
          </Link>
        </div>
      </div>
      
      <div className='py-6 text-center flex flex-col items-center justify-center transition-all duration-300'>
        <h4 className='font-semibold text-xl'>{product.product_label}</h4>
        <p className='text-sm text-gray-500 mt-1'>
          {Array.isArray(product.color_name)
            ? product.color_name.join('-')
            : product.product_category}
        </p>
        <p className='font-medium text-primary mt-2'>
          ৳{Number(product.sale_price ?? 0).toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
