'use client';

import CartItem from '@/components/modules/cart/CartItem';
import Loader from '@/components/shared/Loader';
import PageBanner from '@/components/shared/PageBanner';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/useCart';
import { ICartProduct } from '@/types/cart';
import { Flame, Phone, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const router = useRouter();
  const {
    cartDetails,
    isCartLoading,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const { products, cart_total, discount_amount, payable_amount } = cartDetails;

  if(isCartLoading) return <Loader skeleton skeletonCount={5} />

  return (
    <div className='min-h-screen bg-gray-50/50'>
      <PageBanner
        heading='Shopping Cart'
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Cart' },
        ]}
      />

      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        {products.length === 0 ? (
          <div className='bg-white p-12 rounded-2xl text-center'>
            <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Trash2 className='w-10 h-10 text-gray-400' />
            </div>
            <h2 className='text-2xl font-bold mb-2'>Your cart is empty</h2>
            <p className='text-muted-foreground mb-8'>
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link href='/products'>
              <Button size='lg'>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Left Column - Cart Items */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Header Actions */}
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-gray-100'>
                <div className='flex items-center gap-2 text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full'>
                  <Flame className='w-4 h-4' />
                  <span>Items reserved for 24 hours</span>
                </div>

                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => clearCart()}
                  className='text-red-500 hover:text-red-600 hover:bg-red-50'
                >
                  <Trash2 className='w-4 h-4 mr-2' />
                  Clear Cart
                </Button>
              </div>

              {/* Cart Items List */}
              <div className='bg-white rounded-2xl border border-gray-100 overflow-hidden'>
                {/* Desktop Header */}
                <div className='hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50/50 border-b text-sm font-medium text-gray-500'>
                  <div className='col-span-6'>Product</div>
                  <div className='col-span-2 text-center'>Price</div>
                  <div className='col-span-2 text-center'>Quantity</div>
                  <div className='col-span-2 text-right'>Total</div>
                </div>

                {/* Items */}
                <div className='divide-y'>
                  {products.map((item: ICartProduct) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onQuantityChange={updateQuantity}
                      onRemove={(id, sizeId) => removeItem(id, sizeId)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className='lg:col-span-1'>
              <div className='bg-white p-6 rounded-2xl border border-gray-100 sticky top-24'>
                <h3 className='text-lg font-bold mb-6'>Order Summary</h3>

                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between text-gray-600'>
                    <span>Subtotal</span>
                    <span className='font-medium text-gray-900'>
                      ৳{cart_total}
                    </span>
                  </div>

                  {discount_amount > 0 && (
                    <div className='flex justify-between text-green-600'>
                      <span>Discount</span>
                      <span className='font-medium'>-৳{discount_amount}</span>
                    </div>
                  )}

                  <div className='pt-4 border-t flex justify-between items-end'>
                    <span className='font-bold text-lg'>Total</span>
                    <div className='text-right'>
                      <span className='block text-2xl font-bold text-primary'>
                        ৳{payable_amount}
                      </span>
                      <span className='text-xs text-muted-foreground'>
                        Including VAT
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  className='w-full py-6 text-lg font-semibold'
                  onClick={() => router.push('/checkout')}
                >
                  Proceed to Checkout
                </Button>

                <div className='mt-6 pt-6 border-t'>
                  <div className='flex items-center justify-center gap-2 text-sm text-gray-500'>
                    <Phone className='w-4 h-4' />
                    <span>Need help? Call 01819-491091</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
