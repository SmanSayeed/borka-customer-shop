'use client';

import AddToCartButton from '@/components/shared/addToCartBtn';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useProducts from '@/hooks/useProducts';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Eye, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ProductDetailsSection = () => {
  const { products } = useProducts();
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: any) => {
    setImages([...e.target.files]);
  };

  return (
    <div className='container mx-auto grid grid-cols-1 md:grid-cols-12 mt-10'>
      {/* LEFT SECTION */}
      <div className='md:col-span-8'>
        <Tabs
          defaultValue='description'
          className='w-full border-t border-gray-200'
        >
          {/* TAB BUTTONS */}
          <TabsList className='flex justify-start gap-6 h-10 bg-transparent p-0 my-2 '>
            <TabsTrigger value='description' className='px-4 bg-white'>
              Description
            </TabsTrigger>
            <TabsTrigger value='additional' className='px-4 bg-white'>
              Additional Info
            </TabsTrigger>
          </TabsList>
          <Separator />

          {/* ================= DESCRIPTION TAB ================= */}
          <TabsContent value='description'>
            <div className='max-w-6xl mx-auto text-gray-700 leading-relaxed space-y-4 mt-6 pr-10'>
              <h2 className='text-2xl font-semibold'>Product Description</h2>

              <p>
                The <strong>Cover Up Chiffon (Blue)</strong> Abaya comes with
                premium quality <strong>Dehra Embroidery</strong>. It’s elegant,
                lightweight and modest.
              </p>

              <p>
                Ideal for daily wear, outings or Islamic events. Loose fit
                ensures comfort and modesty.
              </p>

              {/* VIDEO */}
              <div className='aspect-video w-full rounded-lg overflow-hidden shadow'>
                <iframe
                  width='100%'
                  height='100%'
                  src='https://www.youtube.com/embed/KoqG2pTZGHs'
                  title='YouTube video player'
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </TabsContent>

          {/* ================= ADDITIONAL TAB ================= */}
          <TabsContent value='additional'>
            <div className='max-w-3xl mx-auto text-gray-700 space-y-4 mt-6 pr-10'>
              <h2 className='text-2xl font-semibold'>Specifications</h2>

              <ul className='space-y-1 list-none'>
                <li>
                  <strong>Product Code:</strong> COVER-UP-002
                </li>
                <li>
                  <strong>Color:</strong> Blue
                </li>
                <li>
                  <strong>Category:</strong> Dehra Embroidery Abaya
                </li>
                <li>
                  <strong>Fabric:</strong> Premium Chiffon
                </li>
                <li>
                  <strong>Sale Price:</strong> ৳900
                </li>
                <li>
                  <strong>Care:</strong> Hand wash recommended
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* RIGHT SECTION */}
      <div className='md:col-span-4 border border-gray-200 p-6'>
        <div className='flex justify-between items-center mb-3'>
          <h4 className='text-xl font-semibold'>Related Products</h4>
          <a href='#' className='text-sm underline'>
            See All
          </a>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {products?.map((product) => (
            <motion.div
              key={product.id}
              className='relative overflow-hidden bg-white transition-all duration-700 group'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1 }}
            >
              <div
                className={clsx(
                  'relative w-full overflow-hidden',
                  'aspect-3/4 '
                )}
              >
                {product.product_code && (
                  <span className='absolute top-3 left-3 z-10 bg-[#14854e] text-white text-[11px] px-2 py-1'>
                    {product.product_code.toUpperCase()}
                  </span>
                )}
                {product.discount_label && (
                  <span className='absolute top-3 right-3 z-10 bg-[#d0473e] text-white text-xs font-semibold px-2 py-1'>
                    - {product.discount_label}
                  </span>
                )}
                <Image
                  src={product.thumbnail_url || '/placeholder.png'}
                  alt={product.product_label || 'Product Image'}
                  height={500}
                  width={350}
                  className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
                />

                {/* ACTION BUTTONS (Hover) */}
                <div className='absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10'>
                  <AddToCartButton product={product} />

                  <button className='bg-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-500'>
                    <Heart className='w-5 h-5' />
                  </button>

                  <Link href={`/products/${product.slug}`}>
                    <button className='bg-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-500'>
                      <Eye className='w-5 h-5' />
                    </button>
                  </Link>
                </div>
              </div>

              {/* PRODUCT INFO */}
              <div className='py-4  px-2 text-center flex flex-col items-center justify-center'>
                <h4 className='font-semibold'>
                  {product.product_label}
                </h4>

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
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
