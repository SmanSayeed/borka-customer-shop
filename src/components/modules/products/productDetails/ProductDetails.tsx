'use client';

import BreadcrumbBanner from '@/components/shared/Breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  ZoomIn,
} from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import CustomerReviews from './CustomerReviews';
import ProductDetailsSection from './ProductAddionalInfo';
import Link from 'next/link';

const ProductDetails = ({ product }: { product: IProduct }) => {
  const galleryImages = useMemo(() => {
    if (product.image && product.image.length > 0) {
      return product.image;
    }
    const fallback = product.thumbnail_url || '/placeholder.png';
    return [fallback];
  }, [product.image, product.thumbnail_url]);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState(galleryImages[0]);
  const [zoomed, setZoomed] = useState(false);

  const colorOptions = useMemo(() => {
    if (Array.isArray(product.color)) {
      return product.color;
    }
    if (typeof product.color === 'string') {
      return [product.color];
    }
    if (Array.isArray(product.color_name)) {
      return product.color_name;
    }
    if (product.color_name) {
      return [product.color_name];
    }
    return [];
  }, [product.color, product.color_name]);

  const sizeOptions = product.size ?? [];

  const salePrice =
    typeof product.price === 'number'
      ? product.price
      : Number(product.sale_price ?? product.original_price ?? 0);
  const normalizedPrice = Number.isFinite(salePrice) ? salePrice : 0;

  const originalPrice =
    typeof product.original_price === 'number'
      ? product.original_price
      : Number(product.original_price ?? normalizedPrice);
  const normalizedOriginalPrice = Number.isFinite(originalPrice)
    ? Number(originalPrice)
    : normalizedPrice;

  const computedDiscount =
    product.discount ??
    (normalizedOriginalPrice > 0
      ? Math.max(
          0,
          Math.round(
            ((normalizedOriginalPrice - normalizedPrice) /
              normalizedOriginalPrice) *
              100
          )
        )
      : undefined);
  const hasDiscount = Boolean(computedDiscount && computedDiscount > 0);

  const productName = product.name || product.product_label || 'Product';
  const rating = product.rating ?? 4.5;
  const reviewCount = product.reviews ?? 55;

  return (
    <div className='px-4 lg:px-0'>

      <div className='container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* ---------------- Left Section ---------------- */}
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
          {/* Sub Images */}
          <div className='flex lg:flex-col gap-2 lg:gap-4 order-2 lg:order-1'>
            {galleryImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setMainImage(img)}
                className={`relative w-20 h-20 lg:w-28 lg:h-28 border rounded-md cursor-pointer overflow-hidden ${
                  mainImage === img ? 'border-primary' : 'border-gray-200'
                }`}
              >
                <Image
                  src={img}
                  alt='product image'
                  fill
                  className='object-cover'
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className='relative w-full lg:w-[500px] h-[300px] lg:h-[500px] order-1 lg:order-2 flex items-center justify-center'>
            <div
              className='relative rounded-lg overflow-hidden w-full h-full'
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
            >
              <Image
                src={mainImage}
                alt={productName}
                fill
                className={`object-contain transition-transform duration-300 ${
                  zoomed ? 'scale-110 cursor-zoom-in' : 'scale-100'
                }`}
              />
            </div>

            <div className='absolute bottom-2 left-2'>
              <Dialog>
                <DialogTrigger asChild>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className='p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition'>
                          <ZoomIn className='size-5 text-gray-700' />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className='text-xs'>
                        Click to enlarge
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DialogTrigger>

                <DialogContent className='max-w-4xl p-0 bg-transparent border-none shadow-none'>
                  <div className='flex justify-center items-center'>
                    <Image
                      src={mainImage}
                      alt={productName}
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

        <Link href={'#similar-product'}>See Related Products</Link>

        {/* ---------------- Right Section ---------------- */}
        <div className='space-y-4'>
          <Badge className='bg-green-500 my-3 rounded-none'>New Arrival</Badge>

          <h2 className='text-2xl font-semibold mb-2'>{productName}</h2>

          <div className='flex items-center gap-2 mb-4'>
            <span className='text-yellow-500'>★★★★☆</span>
            <span className='text-sm text-gray-500'>
              {rating} ({reviewCount} Reviews)
            </span>
          </div>

          <div className='flex items-center gap-4 mb-4'>
            <p className='text-2xl font-bold text-gray-900'>
              ${normalizedPrice.toFixed(2)}
            </p>
            {hasDiscount && (
              <>
                <p className='text-gray-400 line-through'>
                  $ {normalizedOriginalPrice.toFixed(2)}
                </p>
                <p className='text-red-500 text-sm font-semibold'>
                  ({computedDiscount}% Off)
                </p>
              </>
            )}
          </div>

          {/* Product Info */}
          <div className='space-y-1 mb-4 text-sm text-gray-700'>
            <p>
              <strong>SKU:</strong>{' '}
              {product.product_code?.toUpperCase() || 'N/A'}
            </p>
            <p>
              <strong>Available:</strong>{' '}
              {product.status ? product.status : 'In Stock'}
            </p>
            <p>
              <strong>Categories:</strong>{' '}
              {product.category || product.product_category || 'Uncategorized'}
            </p>
          </div>

          {/* Colors & Sizes */}
          <div className='flex flex-col lg:flex-row gap-4 mb-4'>
            <div className='flex flex-col gap-2'>
              <p className='font-medium'>
                Color:{' '}
                <span className='text-gray-500'>
                  {selectedColor || 'Select'}
                </span>
              </p>
              <div className='flex gap-2 flex-wrap'>
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? 'border-primary ring-2 ring-primary/30'
                        : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <p className='font-medium'>
                Size:{' '}
                <span className='text-gray-500'>
                  {selectedSize || 'Select'}
                </span>
              </p>
              <div className='flex gap-2 flex-wrap'>
                {sizeOptions.map((size) => (
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

          <ul className='text-sm text-gray-600 mb-6 space-y-2'>
            <li>✅ In Stock</li>
            <li>✅ Free delivery available</li>
            <li>✅ Sales 10% Off Use Code: CODE123</li>
          </ul>

          <div className='flex flex-col lg:flex-row items-center gap-4 mt-6'>
            <Button className='flex-1 bg-primary hover:bg-primary/50 text-white'>
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
      </div>

      {/* ---------------- Tabs Section ---------------- */}
      <div id='similar-product'>
        <ProductDetailsSection />
      </div>

      <CustomerReviews />
    </div>
  );
};

export default ProductDetails;
