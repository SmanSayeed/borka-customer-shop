'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { IProduct } from '@/types';

const categories = [
  'All', // Added "All" tab
  'Abaya',
  'Kimono',
  'Salah Khimar',
  'Hijab',
  'Skirt Set',
  'Gown',
  'Kurti',
];

const AllCollection = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/products.json');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const getFilteredProducts = (category: string) => {
    if (category === 'All') return products;
    return products.filter((p) => p.category === category);
  };

  return (
    <div className='container mx-auto mt-20'>
      <h3 className='text-3xl font-bold mb-8 text-center'>All Collections</h3>

      <Tabs defaultValue='All' className='space-y-6'>
        <TabsList className='grid w-4xl mx-auto grid-cols-4 md:grid-cols-8 gap-2 bg-transparent'>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className='rounded-full py-2'>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            {getFilteredProducts(category).length === 0 ? (
              <p className='text-gray-500 text-center'>
                No products available in {category}.
              </p>
            ) : (
              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
                {getFilteredProducts(category).map((product, index) => (
                  <div
                    key={index}
                    className='relative rounded-none border border-primary/10 hover:rounded-xl transition-all duration-300 overflow-hidden group'
                  >
                    {/* Image */}
                    <div className='relative w-full h-100 overflow-hidden'>
                      <Image
                        src={product.image[0]}
                        alt={product.name}
                        fill
                        className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
                      />

                      {/* Hover Icons */}
                      <div className='absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10'>
                        <button className='bg-white p-2 rounded-full hover:bg-gray-200 transform hover:scale-110 transition-transform duration-300'>
                          <ShoppingBag className='text-primary' />
                        </button>
                        <button className='bg-white p-2 rounded-full hover:bg-gray-200 transform hover:scale-110 transition-transform duration-300'>
                          <Heart className='text-red-500' />
                        </button>
                        <Link href={`/category/${index}`}>
                          <button className='bg-white p-2 rounded-full hover:bg-gray-200 transform hover:scale-110 transition-transform duration-300'>
                            <Eye className='text-gray-800' />
                          </button>
                        </Link>
                      </div>
                    </div>

                    {/* Content */}
                    <div className='p-4 text-center flex flex-col items-center justify-center'>
                      <h4 className='font-semibold text-lg'>{product.name}</h4>
                      <p className='text-sm text-gray-500 mt-1'>
                        {product.color.join(', ')}
                      </p>
                      <p className='font-medium text-primary mt-2'>
                         ৳{product.price.toLocaleString()}
                      </p>
                    </div>
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
