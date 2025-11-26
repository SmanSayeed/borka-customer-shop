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
    <div className="container mx-auto mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left: Gallery */}
        <div className="col-span-1 lg:col-span-5">
          <ProductGallery
            images={galleryImages}
            productName={product.product_name}
          />
        </div>

        {/* Right: Details */}
        <div className="col-span-1 lg:col-span-7 md:space-y-6 space-y-4">

          <h4 className="text-xl sm:text-2xl font-semibold">
            {product.product_name}
          </h4>

          {/* Price */}
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-2xl font-bold">৳{salePrice}</p>

            {hasDiscount && (
              <>
                <p className="line-through text-gray-400">৳{originalPrice}</p>
                <p className="text-primary text-sm">({discountPercent}% Off)</p>
              </>
            )}
          </div>

          {/* Info */}
          <div className="text-gray-700 space-y-1">
            <p><strong>SKU:</strong> {product.product_code}</p>
            <p><strong>Available:</strong> {stockCount} in stock</p>
            <p><strong>Category:</strong> {product.category?.name}</p>
          </div>

          {/* Size Selection */}
          {sizes.length > 0 && (
            <div className="flex items-center gap-2">
              <p className="font-medium">
                Size:{' '}
                <span className="text-gray-500">
                  {selectedSize ? selectedSize.name : 'Select'}
                </span>
              </p>

              <div className="flex flex-wrap gap-3">
                {sizes.map((s: ISize) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSize(s)}
                    className={`px-2 py-1 border bg-white rounded-sm text-sm transition-all ${
                      selectedSize?.id === s.id
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-300'
                    }`}
                  >
                    {s.code}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <p className="font-medium">Quantity:</p>

            <div className="flex items-center ">
              <button
                className="bg-white rounded-sm p-2 text-sm border hover:border-primary hover:bg-primary/10 transition duration-300"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                <Minus size={16}/>
              </button>

              <span className="w-8 text-center">{quantity}</span>

              <button
                className="bg-white rounded-sm p-2 text-sm border hover:border-primary hover:bg-primary/10 transition duration-300"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <Plus size={16}/>
              </button>
            </div>
          </div>

          {/* Add to Cart & Buy Now */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">

            <Button
              className="bg-primary text-white w-full sm:w-auto flex items-center gap-2 shadow-none"
              onClick={handleAddToCart}
            >
              <ShoppingBasket className="w-5 h-5" />
              Add To Cart
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center bg-white gap-2 border-gray-300 text-gray-600 shadow-none"
            >
              <ShoppingBag className="w-5 h-5" />
              Buy Now
            </Button>
          </div>

          <ProductAdditionalInfo product={product} />
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
