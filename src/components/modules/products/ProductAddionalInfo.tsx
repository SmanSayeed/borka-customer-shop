'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function ProductAdditionalInfo() {
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...filesArray]);
    }
  };

  return (
    <div className='container mx-auto mt-10 px-4 sm:px-6 lg:px-0'>
      <Tabs defaultValue='description' className='w-full flex mx-auto items-center'>
        {/* ------- TAB BUTTONS ------- */}
        <TabsList className='flex justify-center sm:justify-start items-center mb-6 gap-4 overflow-x-auto scrollbar-none bg-transparent'>
          <TabsTrigger
            value='description'
            className='text-center flex-shrink-0 border-none'
          >
            Description
          </TabsTrigger>
          <TabsTrigger value='additional' className='text-center flex-shrink-0 border-none'>
            Additional Info
          </TabsTrigger>
          <TabsTrigger value='reviews' className='text-center flex-shrink-0 border-0'>
            Reviews
          </TabsTrigger>
        </TabsList>

        {/* ------- DESCRIPTION TAB ------- */}
        <TabsContent
          value='description'
          className='max-w-3xl mx-auto text-gray-700 leading-relaxed space-y-4 sm:space-y-6'
        >
          <h2 className='text-xl sm:text-2xl font-semibold'>
            Product Description
          </h2>

          <p>
            The <strong>Cover Up Chiffon (Blue)</strong> Abaya is designed with
            premium-quality chiffon fabric and detailed{' '}
            <strong>Dehra Embroidery</strong>, offering an elegant, lightweight,
            and modest look. The breathable material ensures all-day comfort,
            while the rich blue tone adds a sophisticated charm.
          </p>

          <p>
            This abaya is perfect for daily wear, casual outings, gatherings, or
            Islamic events. The embroidery detailing brings a unique identity,
            and the loose fit provides confidence and modesty. Ideal for those
            who love stylish yet comfortable modest fashion.
          </p>

          <div className='aspect-video w-full rounded-lg overflow-hidden shadow'>
            <iframe
              width='100%'
              height='100%'
              src='https://www.youtube.com/embed/KoqG2pTZGHs?si=vFN-CA4lABaQA7jn'
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          </div>
        </TabsContent>

        {/* ------- ADDITIONAL INFO TAB ------- */}
        <TabsContent
          value='additional'
          className='max-w-3xl mx-auto text-gray-700 leading-relaxed space-y-3 sm:space-y-4'
        >
          <h2 className='text-xl sm:text-2xl font-semibold'>Specifications</h2>

          <ul className='ml-0 space-y-1 list-none text-sm sm:text-base'>
            <li>
              <strong>Product Code:</strong> COVER-UP-002
            </li>
            <li>
              <strong>Color:</strong> Blue
            </li>
            <li>
              <strong>Category:</strong> Tops/Kurti - Dehra Embroidery Abaya
            </li>
            <li>
              <strong>Fabric:</strong> Premium Chiffon
            </li>
            <li>
              <strong>Embroidery:</strong> Dehra Hand Embroidery
            </li>
            <li>
              <strong>Original Price:</strong> ৳1000
            </li>
            <li>
              <strong>Discount:</strong> 10% OFF
            </li>
            <li>
              <strong>Sale Price:</strong> ৳900
            </li>
            <li>
              <strong>Fit:</strong> Loose & Comfortable
            </li>
            <li>
              <strong>Care:</strong> Hand wash recommended
            </li>
          </ul>
        </TabsContent>

        {/* ------- REVIEWS TAB ------- */}
        <TabsContent
          value='reviews'
          className='max-w-3xl mx-auto text-gray-700'
        >
          <h2 className='text-xl sm:text-2xl font-semibold mb-4'>
            Write a Review
          </h2>

          <form className='space-y-4'>
            <Input placeholder='Your Name' required className='w-full' />

            <Textarea
              placeholder='Write your review here...'
              required
              className='w-full min-h-[120px]'
            />

            <div>
              <label className='font-medium'>Upload Images (optional)</label>
              <Input
                type='file'
                multiple
                accept='image/*'
                onChange={handleImageUpload}
                className='mt-2 w-full'
              />

              {images.length > 0 && (
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3'>
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className='w-full h-24 border rounded overflow-hidden flex items-center justify-center text-xs'
                    >
                      {img.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button type='submit' className='w-full'>
              Submit Review
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
