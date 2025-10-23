'use client';

import { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { categoryLinks } from '@/constants/category';
import { IProduct } from '@/types';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const colors = [
  { name: 'Black', value: '#000000' },
  { name: 'Navy', value: '#1e3a8a' },
  { name: 'Mint', value: '#86efac' },
  { name: 'Pink', value: '#ffc0cb' },
  { name: 'Rose', value: '#fb7185' },
  { name: 'Sky', value: '#7dd3fc' },
  { name: 'White', value: '#ffffff' },
  { name: 'Gold', value: '#fbbf24' },
];

const tags = ['bicycle', 'Computer', 'Electric', 'flycam', 'headphone'];

const ProductSidebar = () => {
  const [priceRange, setPriceRange] = useState([0]);

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

  return (
    <div className='container mx-auto mt-20'>
      <div className='grid grid-cols-12 gap-6'>
        {/* Sidebar */}
        <aside className='col-span-12 md:col-span-2 space-y-8 pr-8'>
          {/* Product Categories */}
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Product categories</h3>
            <ul className='space-y-2'>
              {categoryLinks.map((category) => (
                <li key={category.name}>
                  <button className='flex w-full items-center justify-between text-sm text-muted-foreground transition-colors hover:text-foreground'>
                    <span>{category.name}</span>
                    <span className='text-xs'>({category.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Filter by price</h3>
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

          {/* Colors */}
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Colors</h3>
            <div className='grid grid-cols-4 gap-2'>
              {colors.map((color) => (
                <button
                  key={color.name}
                  className='h-10 w-10 rounded-md border border-border transition-transform hover:scale-110'
                  style={{ backgroundColor: color.value }}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          {/* Product Tags */}
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Product tags</h3>
            <div className='flex flex-wrap gap-2'>
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant='outline'
                  className='cursor-pointer hover:bg-accent'
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Display Section */}
        <section className='col-span-12 md:col-span-10 grid grid-cols-3 lg:grid-cols-4 gap-6'>
          {/* Example product cards (you can replace with your dynamic products) */}
          {products.map((product) => (
            <div
              key={product.category}
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
                  <Link href={`/product-details/${product.name}`}>
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
        </section>
      </div>
    </div>
  );
};

export default ProductSidebar;
