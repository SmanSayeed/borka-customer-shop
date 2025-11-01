import { IProduct } from '@/types/product';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({product}: {product: IProduct}) => {  
  return (
    <motion.div
      className='relative border border-primary/20 overflow-hidden hover:bg-gray-50 hover:rounded-2xl group transition-all duration-700'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1 }}
    >
      <div
        className={clsx(
          'relative w-full overflow-hidden h-100'
        )}
      >
        {/* Badges */}
        {product.product_code && (
          <span className='absolute top-3 left-3 z-10 bg-green-600 text-white text-[11px] px-2 py-1'>
            {product.product_code.toUpperCase()}
          </span>
        )}
        {product.discount_label && (
          <span className='absolute top-3 right-3 z-10 bg-primary text-white text-xs font-semibold px-2 py-1'>
            {product.discount_label}
          </span>
        )}

        <Image
          src={product.thumbnail_url || '/placeholder.png'}
          alt={product.product_label || 'Product Image'}
          fill
          className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
        />

        <div className='absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10'>
          <button className='bg-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-500'>
            <ShoppingBag className='w-5 h-5' />
          </button>
          <button className='bg-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-500'>
            <Heart className='w-5 h-5 ' />
          </button>
          <Link href={`/products/${product.product_label}`}>
            <button className='bg-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-500'>
              <Eye className='w-5 h-5' />
            </button>
          </Link>
        </div>
      </div>

      <div className='py-6 text-center flex flex-col items-center justify-center transition-all duration-300'>
        <h4 className='font-semibold text-lg'>{product.product_label}</h4>
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
