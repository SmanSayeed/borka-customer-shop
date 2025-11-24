'use client';

import Container from '@/components/shared/Container';
import Loader from '@/components/shared/Loader';
import useProducts from '@/hooks/useProducts';
import { IProduct } from '@/types';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

export default function NewArrivals() {
  const { products, isProductLoading } = useProducts();

  const displayProducts = Array.from(
    { length: 8 },
    (_, i) => products[i % products.length]
  );

  return (
    <Container>
      <div className='text-center mb-10'>
        <h2 className='md:text-5xl text-2xl font-bold mb-4'>New Arrivals</h2>
        <p className='text-foreground/80'>
          Discover the newest pieces in our collection and embrace timeless
          fashion.
        </p>
      </div>

      {/* PRODUCTS GRID */}
      <motion.div
        className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isProductLoading ? (
          <Loader skeleton skeletonCount={12} />
        ) : (
          displayProducts.map((product: IProduct, index: number) => (
            <ProductCard key={index} product={product} />
          ))
        )}
      </motion.div>
    </Container>
  );
}
