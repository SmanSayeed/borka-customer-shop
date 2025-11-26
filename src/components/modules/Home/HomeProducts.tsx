'use client';

import { getProductsBySection } from '@/actions/home';
import Container from '@/components/shared/Container';
import Loader from '@/components/shared/Loader';
import { IProduct } from '@/types';
import { IHomeProduct } from '@/types/home';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import ProductCard from '../products/ProductCard';

const HomeProducts = ({ section }: { section: IHomeProduct }) => {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['sectionProducts', section.id],
    queryFn: () => getProductsBySection(section.id),
  });

  const products: IProduct[] = productsData?.data?.data || [];

  return (
    <div className='px-2'>
      <div className='text-center mb-10'>
        <h2
          className={`md:text-5xl text-2xl font-bold mb-4 ${section.type_color}`}
        >
          {section.title}
        </h2>
        {section.subtitle && (
          <p className='text-foreground/80'>{section.subtitle}</p>
        )}
      </div>

      {/* PRODUCTS GRID */}
      <motion.div
        className='grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading ? (
          <Loader skeleton skeletonCount={4} />
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </motion.div>
    </div>
  );
};

export default HomeProducts;
