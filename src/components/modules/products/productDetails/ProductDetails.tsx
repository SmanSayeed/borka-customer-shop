'use client';

import { Button } from '@/components/ui/button';
import useCart from '@/hooks/useCart';
import useProducts from '@/hooks/useProducts';
import { IColor, IProductDetails, ISize } from '@/types/product';
import { Minus, Plus, ShoppingBag, ShoppingBasket } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import ProductAdditionalInfo from './ProductAdditionalInfo';
import ProductGallery from './ProductGallery';

const ProductDetails = ({ product }: { product: IProductDetails }) => {
  const [selectedColor, setSelectedColor] = useState<IColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<ISize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { sizes } = useProducts();

  const galleryImages = product.gallery_images?.length
    ? product.gallery_images.map((img) => img.url)
    : [product.thumbnail_url];

  const { price_info } = product;

  const salePrice = price_info?.sale_price ?? 0;
  const originalPrice = Number(price_info?.original_price ?? salePrice);
  const hasDiscount = price_info?.is_discount_active ?? false;
  const discountPercent = price_info?.discount_value ?? 0;

  const stockCount = product.total_stock ?? 0;

  const cartProduct = {
    product_id: product.id,
    quantity: quantity,
    size_id: selectedSize ? selectedSize.id : null,
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.warning('Please select a size before adding to cart!');
      return;
    }

    addToCart({ items: [cartProduct] });
  };

  return (
    <div className='container mx-auto my-6 lg:my-12'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8'>
        {/* Gallery */}
        <div className='col-span-1 lg:col-span-5'>
          <ProductGallery
            images={galleryImages}
            productName={product.product_name}
          />
        </div>

        {/* Right Section */}
        <div className='col-span-1 lg:col-span-7 space-y-4 lg:space-y-6'>
          <h4 className='text-xl sm:text-2xl font-semibold'>
            {product.product_name}
          </h4>

          <div className='flex flex-wrap items-center gap-2 sm:gap-4'>
            <p className='text-xl sm:text-2xl font-bold'>৳{salePrice}</p>

            {hasDiscount && (
              <>
                <p className='line-through text-gray-400'>৳{originalPrice}</p>
                <p className='text-primary text-sm'>({discountPercent}% Off)</p>
              </>
            )}
          </div>

          <div className='text-sm text-gray-700 space-y-1'>
            <p>
              <strong>SKU:</strong> {product.product_code}
            </p>
            <p>
              <strong>Available:</strong> {stockCount} in stock
            </p>
            <p>
              <strong>Category:</strong> {product.category?.name}
            </p>
          </div>

          <div>
            {/* Sizes */}
            {sizes.length > 0 && (
              <div>
                <p className='font-medium mb-2'>
                  Size:{' '}
                  <span className='text-gray-500'>
                    {selectedSize ? selectedSize.name : 'Select'}
                  </span>
                </p>
                <div className='flex gap-2 flex-wrap'>
                  {sizes.map((s: ISize) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1 border rounded-md text-sm transition-all duration-200 ${
                        selectedSize?.id === s.id
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200'
                      }`}
                    >
                      {s.code}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className='flex flex-col items-center sm:flex-row gap-6'>
            <div className='mt-2'>
              <div className='flex items-center gap-2 sm:gap-3'>
                <Button
                  size='icon'
                  variant='outline'
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  <Minus />
                </Button>

                <span className='w-8 text-center'>{quantity}</span>

                <Button
                  size='icon'
                  variant='outline'
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <Plus />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className='flex flex-col sm:flex-row items-center gap-3'>
              <Button
                className='flex-1 bg-primary text-white'
                onClick={handleAddToCart}
              >
                <ShoppingBasket className='w-5 h-5 mr-1' /> Add To Cart
              </Button>

              <Button variant='outline' className='flex-1'>
                <ShoppingBag className='mr-1 w-5 h-5' /> Buy Now
              </Button>
            </div>
          </div>
          <div>
            <ProductAdditionalInfo product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
