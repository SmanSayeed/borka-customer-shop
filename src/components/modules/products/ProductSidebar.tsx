'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { categoryLinks } from '@/constants/category';
import { IProduct } from '@/types/product';
import BreadcrumbBanner from '@/components/shared/Breadcrumb';
import ProductCard from './ProductCard';
import useProducts from '@/hooks/useProducts';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';


const ProductSidebar = () => {
  const [priceRange, setPriceRange] = useState([0]);
  const {products, productFetchLoading} = useProducts();
  
  return (
    <div className='container mx-auto'>
      <BreadcrumbBanner />
      <div className='grid grid-cols-12 gap-6'>
        {/* Sidebar */}
        <aside className='col-span-12 md:col-span-2 space-y-8 pr-8'>
          <div className='w-full flex justify-center py-4'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className='text-base font-semibold'>
                    Product Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className='p-6 bg-background shadow-lg rounded-xl border'>
                    <ul className='grid w-[300px] gap-2'>
                      {categoryLinks.map((category) => (
                        <li key={category.name}>
                          <NavigationMenuLink asChild>
                            <button className='flex w-full items-center justify-between rounded-md p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors'>
                              <span>{category.name}</span>
                              <span className='text-xs text-muted-foreground'>
                                ({category.count})
                              </span>
                            </button>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Price Filter */}
          <div>
            <h4 className='mb-4 text-lg font-semibold'>Filter by price</h4>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={100000}
              step={10}
              className='mb-4'
            />
            <div className='mb-4 flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>
                Price: ৳0 — ৳{priceRange[0]}
              </span>
            </div>
            <Button variant='outline' size='sm' className='w-full'>
              Filter
            </Button>
          </div>
        </aside>

        {/* Product Display Section */}
        <section className='col-span-12 md:col-span-10 grid grid-cols-2 lg:grid-cols-3 gap-6'>
          {productFetchLoading ? (
            <>Loading</>
          ) : (
            products.map((product: IProduct) => (
              <div
                key={product.id}
                className='relative rounded-none border border-primary/10 hover:rounded-xl transition-all duration-300 overflow-hidden group'
              >
                <ProductCard product={product} />
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductSidebar;
