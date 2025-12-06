'use client';

import { getProductsBySection } from '@/actions/home';
import Container from '@/components/shared/Container';
import Loader from '@/components/shared/Loader';
import { IProduct } from '@/types';
import { IHomeProduct } from '@/types/home';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import ProductCard from '../products/ProductCard';
import Link from 'next/link';
import HighlightedProduct from '../products/HighlitedProducts';
import { ArrowRight } from 'lucide-react';

const HomeProducts = ({ section }: { section: any }) => {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['sectionProducts', section.id],
    queryFn: () => getProductsBySection(section.id),
  });
 

  const products: any[] = productsData?.data?.data || [];

  return (
    <div className='px-2 md:px-0 mt-12 md:mt-24'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className={'md:text-5xl text-2xl font-bold'}>{section.title}</h2>
          {section.subtitle && (
            <p className='text-foreground/80 mt-4'>{section.subtitle}</p>
          )}
        </div>
        <Link
          href='/products'
          className='bg-gray-100 hover:bg-primary hover:text-white px-3 py-2 flex items-center gap-2'
        >
          See All <ArrowRight size={16} />
        </Link>
      </div>

      <motion.div
        className='grid grid-cols-12 gap-2 md:gap-6 mt-6 md:mt-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading ? (
          <Loader skeleton skeletonCount={4} />
        ) : (
          <>
            {/* Highlight Products First */}
            {products
              .filter((p) => p.is_highlight === true)
              .map((product) => (
                <HighlightedProduct key={product.id} product={product} />
              ))}

            {/* Regular Products Next */}
            {products
              .filter((p) => !p.is_highlight)
              .map((product) => (
                <HighlightedProduct key={product.id} product={product} />
              ))}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default HomeProducts;
