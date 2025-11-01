'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { IProduct } from '@/types/product';
import ProductCard from './ProductCard';
import useCategory from '@/hooks/useCategory';
import { ICategory } from '@/types/category';
import useProducts from '@/hooks/useProducts';

const AllCollection = () => {
const {categories, categoryFetchLoading} = useCategory();
const {products, productFetchLoading} = useProducts()

console.log(categories, 'from all collection')

  return (
    <div className='container mx-auto mt-24 px-6 lg:px-0'>
      <h2 className='text-4xl font-semibold mb-10 text-center'>
        All Collections
      </h2>

      <Tabs defaultValue='All' className='space-y-6'>
        <TabsList className='grid md:w-4xl mx-auto grid-cols-4 md:grid-cols-8 gap-2 bg-transparent mb-20 md:mb-10'>
          {categoryFetchLoading ? <>Loading</> : categories.map(({id, name}: ICategory) => (
            <TabsTrigger
              key={id}
              value={name}
              className='rounded-full py-2'
            >
              {name}
            </TabsTrigger>
          ))}
        </TabsList>

        {productFetchLoading? <>Loading</> : products.map((product: IProduct) => (
          <TabsContent key={product.id} value='All'>
            {products.length === 0 ? (
              <p className='text-gray-500 text-center'>
                No products available.
              </p>
            ) : (
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 '>
                {products.map((product: IProduct) => (
                  <div
                    key={product.id}
                    className='relative rounded-none border border-primary/10 hover:rounded-xl transition-all duration-300 overflow-hidden group'
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AllCollection;
