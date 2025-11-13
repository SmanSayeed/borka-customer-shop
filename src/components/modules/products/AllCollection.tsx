'use client';

import Loader from '@/components/shared/Loader';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useCategory from '@/hooks/useCategory';
import useProducts from '@/hooks/useProducts';
import { ICategory } from '@/types/category';
import ProductCard from './ProductCard';

const AllCollection = () => {
  const { categories, isCategoryLoading } = useCategory();
  const { products, isProductLoading } = useProducts();

  return (
    <div className='container mx-auto mt-24 px-6 lg:px-0'>
      <h2 className='text-4xl font-semibold mb-10 text-center'>
        All Collections
      </h2>

      <Tabs defaultValue='All' className='space-y-6'>
        <TabsList className='grid md:w-4xl mx-auto grid-cols-4 md:grid-cols-8 gap-2 bg-transparent mb-20 md:mb-10'>
          {isCategoryLoading ? (
            <Loader skeleton skeletonCount={8} />
          ) : (
            categories.map(({ id, name }: ICategory) => (
              <TabsTrigger key={id} value={name} className='rounded-full py-2'>
                {name}
              </TabsTrigger>
            ))
          )}
        </TabsList>

        <div className='mt-12'>
          {isProductLoading ? (
            <Loader skeleton skeletonCount={8} />
          ) : (
            <div className='grid grid-cols-2 md:grid-col-3 gap-6'>
              {products.map((product) => (
                <ProductCard product={product} />
              ))}
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default AllCollection;
