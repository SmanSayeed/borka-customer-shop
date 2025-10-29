'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  ShoppingBag,
  Star,
  ZoomIn,
} from 'lucide-react';
import Link from 'next/link';
import { IProduct } from '@/types';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import BreadcrumbBanner from '@/components/shared/Breadcrumb';

const ProductDetails = ({ product }: { product: IProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState(product.image[0]);
const [zoomed, setZoomed] = useState(false);

  return (
    <div className='px-6 lg:px-0'>
      {/* Breadcrumb */}
      <BreadcrumbBanner />
      <div className='container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Left Section - Images */}
        <div className='flex gap-8'>
          {/* Thumbnails */}
          <div className='flex flex-col gap-4'>
            {product.image.map((img, index) => (
              <div
                key={index}
                onClick={() => setMainImage(img)}
                className={`relative w-28 h-28 border rounded-md cursor-pointer overflow-hidden ${
                  mainImage === img ? 'border-primary' : 'border-gray-200'
                }`}
              >
                <Image src={img} alt='' fill className='object-cover' />
              </div>
            ))}
          </div>

          {/* Main Image Section */}
          <div className='relative h-full flex items-center justify-center'>
            <div
              className='relative rounded-lg overflow-hidden'
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
            >
              <Image
                src={mainImage}
                alt={product.name}
                width={500}
                height={500}
                className={`object-contain transition-transform duration-300 ${
                  zoomed ? 'scale-110 cursor-zoom-in' : 'scale-100'
                }`}
              />
            </div>

            {/* Enlarge Button */}
            <div className='absolute bottom-4 left-4'>
              <Dialog>
                <DialogTrigger asChild>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className='p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition'>
                          <ZoomIn className='size-5 text-gray-700' />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side='top' className='text-xs'>
                        Click to enlarge
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DialogTrigger>

                <DialogContent className='max-w-4xl p-0 bg-transparent border-none shadow-none'>
                  <div className='flex justify-center items-center'>
                    <Image
                      src={mainImage}
                      alt={product.name}
                      width={800}
                      height={800}
                      className='rounded-lg object-contain'
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Right Section - Details */}
        <div>
          <Badge className='bg-green-500 my-3 rounded-none'>New Arrival</Badge>
          <h2 className='text-2xl font-semibold mb-2'>{product.name}</h2>
          <div className='flex items-center gap-2 mb-4'>
            <span className='text-yellow-500'>★★★★☆</span>
            <span className='text-sm text-gray-500'>
              {product.rating || 4.5} ({product.reviews || 55} Reviews)
            </span>
          </div>
          <div className='flex items-center gap-4 mb-4'>
            <p className='text-2xl font-bold text-gray-900'>
              ${product.price.toFixed(2)}
            </p>
            {product.price && (
              <p className='text-gray-400 line-through'>
                ${product.price.toFixed(2)}
              </p>
            )}
            {product.discount && (
              <p className='text-red-500 text-sm font-semibold'>
                ({product.discount}% Off)
              </p>
            )}
          </div>
          {/* Colors & Sizes Side by Side */}
          <div className='flex gap-10 mb-4'>
            {/* Colors */}
            <div>
              <p className='font-medium mb-2'>
                Colors:{' '}
                <span className='text-gray-500'>
                  {selectedColor || 'Select'}
                </span>
              </p>
              <div className='flex gap-2'>
                {product.color?.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? 'border-primary'
                        : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className='font-medium mb-2'>
                Size:{' '}
                <span className='text-gray-500'>
                  {selectedSize || 'Select'}
                </span>
              </p>
              <div className='flex gap-2'>
                {product.size?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Quantity */}
          <div className='mb-4'>
            <p className='font-medium mb-2'>Quantity:</p>
            <div className='flex items-center gap-3'>
              <Button
                size='icon'
                variant='outline'
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus />
              </Button>
              <span className='w-8 text-center'>{quantity}</span>
              <Button
                size='icon'
                variant='outline'
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus />
              </Button>
            </div>
          </div>
          {/* Stock Info */}{' '}
          <ul className='text-sm text-gray-600 mb-6 space-y-2'>
            {' '}
            <li>✅ In Stock</li> <li>✅ Free delivery available</li>{' '}
            <li>✅ Sales 10% Off Use Code: CODE123</li>{' '}
          </ul>
          {/* Action Buttons */}
          <div className='flex items-center justify-between gap-4 mt-6'>
            <Button className='flex-1 bg-orange-500 hover:bg-orange-600 text-white'>
              <ShoppingCart className='mr-2' /> Add To Cart
            </Button>
            <Button variant='outline' className='flex-1'>
              <ShoppingBag className='mr-2' /> Buy Now
            </Button>
            <Button variant='ghost' size='icon'>
              <Heart className='text-gray-400' />
            </Button>
          </div>
        </div>
        {/* Tabs Section */}
        <div className='mt-10 flex items-center justify-center mx-auto'>
          <Tabs defaultValue='description' className='w-full'>
            <TabsList className='flex gap-4 mb-4 border-b border-gray-200'>
              <TabsTrigger value='description'>Description</TabsTrigger>
              <TabsTrigger value='offers'>Available Offers</TabsTrigger>
              <TabsTrigger value='reviews'>Reviews</TabsTrigger>
            </TabsList>

            {/* Description */}
            <TabsContent value='description'>
              <p className='text-gray-600 leading-relaxed'>
                {product.description ||
                  'This beautiful dress is crafted from high-quality materials ensuring comfort and style. Perfect for any occasion.'}
              </p>
            </TabsContent>

            {/* Offers */}
            <TabsContent value='offers'>
              <ul className='text-sm text-gray-600 space-y-2'>
                <li>
                  💳 <strong>Bank Offer:</strong> 10% instant discount on Debit
                  Cards.
                </li>
                <li>
                  🎁 <strong>Special Offer:</strong> Buy 2 get 1 free on
                  selected items.
                </li>
                <li>
                  🚚 <strong>Free Delivery:</strong> On all orders above $50.
                </li>
              </ul>
            </TabsContent>

            {/* Reviews */}
            <TabsContent value='reviews'>
              <h4 className='font-semibold mb-4'>Write a Review</h4>
              <form className='space-y-4'>
                <Input placeholder='Your Name' />
                <Input placeholder='Your Email' type='email' />
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className='w-5 h-5 text-yellow-400' />
                  ))}
                </div>
                <Textarea placeholder='Write your review...' />
                <Button type='submit' className='bg-primary text-white'>
                  Submit Review
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
