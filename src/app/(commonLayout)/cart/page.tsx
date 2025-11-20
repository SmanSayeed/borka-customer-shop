'use client';

import CartItem from '@/components/modules/cart/CartItem';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/useCart';
import { ICart } from '@/types';
import { Flame, Phone } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const router = useRouter();
  const { carts, updateQuantity, removeItem, subtotal } = useCart();

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-6 max-w-7xl'>
        <div className='flex flex-col gap-3 md:flex-row md:justify-between md:items-center my-4'>
          <nav className='text-xs sm:text-sm text-muted-foreground'>
            Home / Products / <span className='text-foreground'>Cart</span>
          </nav>

          <div className='flex items-center gap-2 bg-card rounded-lg px-3 py-2 text-sm'>
            <Flame className='w-4 h-4 text-primary' />
            <span>Items reserved for 24 hours</span>
          </div>

          <div className='flex items-center gap-2 text-sm'>
            <Phone className='w-4 h-4' />
            <span>Help line: 01819-491091</span>
          </div>
        </div>

        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-6'>
          Shopping Cart
        </h1>

        {/* MAIN CART BOX */}
        <div className='bg-white p-4 sm:p-6 md:p-8 rounded-2xl'>
          {carts.length === 0 ? (
            <p className='text-center text-lg font-semibold py-10'>
              Your cart is empty
            </p>
          ) : (
            <>
              {/* Cart Info */}
              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4'>
                <p className='text-sm sm:text-base'>
                  You have <span className='font-semibold'>{carts.length}</span>{' '}
                  products in your cart
                </p>

                <p className='text-xs sm:text-sm text-muted-foreground'>
                  Expected Delivery:{' '}
                  <span className='font-semibold text-foreground'>Friday</span>
                </p>
              </div>

              {/* Desktop Table View */}
              <div className='hidden md:block bg-card rounded-lg border border-border overflow-x-auto mb-8'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b border-border'>
                      <th className='text-left py-4 px-4'>Product</th>
                      <th className='text-left py-4 px-4'>Stock</th>
                      <th className='text-left py-4 px-4'>Price</th>
                      <th className='text-left py-4 px-4'>Quantity</th>
                      <th className='text-right py-4 px-4'>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {carts.map((cart: ICart) => (
                      <CartItem
                        key={cart.id}
                        cart={cart}
                        onQuantityChange={updateQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className='md:hidden flex flex-col gap-4 mb-8'>
                {carts.map((cart: ICart) => (
                  <CartItem
                    key={cart.id}
                    cart={cart}
                    onQuantityChange={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>

              {/* Summary */}
              <div className='flex flex-col md:flex-row justify-end'>
                <div className='w-full md:w-96'>
                  <div className='flex justify-between items-center text-lg'>
                    <span className='font-semibold'>Sub Total:</span>
                    <span className='font-bold text-xl'>
                      ৳{subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className='flex flex-col sm:flex-row sm:justify-end gap-4 mt-6'>
                    <Link
                      href='/products'
                      className='text-center underline hover:text-primary'
                    >
                      Continue Shopping
                    </Link>

                    <Button
                      className='bg-primary hover:bg-primary/90 w-full sm:w-auto'
                      onClick={() =>
                        router.push('/checkout')
                      }
                    >
                      Proceed To Checkout
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
