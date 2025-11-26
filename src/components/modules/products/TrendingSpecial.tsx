'use client';

import Container from '@/components/shared/Container';
import Loader from '@/components/shared/Loader';
import useProducts from '@/hooks/useProducts';
import { IProduct } from '@/types';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const TrendingSpecial = () => {
  const { products, isProductLoading } = useProducts();

  const displayProducts = Array.from(
    { length: 8 },
    (_, i) => products[i % products.length]
  );

  return (
    <Container className='border border-gray-200 rounded-lg lg:p-8'>
      {/* Section Header */}
      <div className='text-center mb-10'>
        <h2 className='text-5xl font-bold mb-4'>Trending Products</h2>
        <p className='text-foreground/80'>
          Discover the newest pieces in our collection and embrace timeless
          fashion.
        </p>
      </div>

      {/* PRODUCTS GRID */}
      <motion.div
        className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:px-6 p-2 rounded-sm'
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
};

export default TrendingSpecial;
