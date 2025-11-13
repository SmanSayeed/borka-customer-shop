'use client';

import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getCartFromStorage, saveCartToStorage } from '@/lib/cartStorage';
import { Minus, Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface CartItem {
  id: number;
  slug: string;
  product_code: string;
  thumbnail_url: string;
  product_label: string;
  sale_price: number;
  color_name: string;
  quantity: number;
}

const CartPage = () => {
  const router = useRouter();
  const [promoCode, setPromoCode] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cart from localStorage
  useEffect(() => {
    const timeout = setTimeout(() => {
      const items = getCartFromStorage() || [];
      setCartItems(items);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  // Update quantity
  const updateQuantity = (id: number, change: number) => {
    if (!cartItems) return;
    const updated = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCartItems(updated);
    saveCartToStorage(updated);
  };

  // Remove item
  const removeItem = (id: number) => {
    if (!cartItems) return;
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    saveCartToStorage(updated);
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    saveCartToStorage([]);
  };

  // Calculate subtotal
  const subtotal =
    cartItems?.reduce(
      (sum, item) => sum + item.sale_price * item.quantity,
      0
    ) || 0;

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-[60vh]'>
        <Loader text='Loading your cart...' />
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center h-[60vh] text-center'>
        <p className='text-lg font-semibold text-gray-700 dark:text-gray-300'>
          Your cart is empty 🛒
        </p>
        <button
          onClick={() => router.push('/products')}
          className='mt-4 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition'
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress Steps */}
      <div className='flex items-center justify-between mb-14 max-w-4xl mx-auto'>
        <div className='flex-1 text-center'>
          <div className='w-8 h-8 rounded-full bg-green-600 text-white mx-auto flex items-center justify-center'>
            1
          </div>
          <p className='mt-2 text-sm font-medium'>Your Cart</p>
        </div>
        <div className='flex-1 text-center border-t-2 border-green-600 relative top-4'></div>
        <div className='flex-1 text-center'>
          <div className='w-8 h-8 rounded-full bg-gray-300 text-white mx-auto flex items-center justify-center'>
            2
          </div>
          <p className='mt-2 text-sm font-medium'>Checkout Details</p>
        </div>
        <div className='flex-1 text-center border-t-2 border-gray-300 relative top-4'></div>
        <div className='flex-1 text-center'>
          <div className='w-8 h-8 rounded-full bg-gray-300 text-white mx-auto flex items-center justify-center'>
            3
          </div>
          <p className='mt-2 text-sm font-medium'>Order Complete</p>
        </div>
      </div>

      {/* Cart Content */}
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Cart Items */}
          <div className='lg:col-span-2'>
            <div className='bg-card rounded-lg shadow-sm overflow-hidden'>
              <div className='hidden md:grid md:grid-cols-12 gap-4 p-4 border-b bg-muted/50 font-medium text-sm'>
                <div className='col-span-4'>Product</div>
                <div className='col-span-2'>Price</div>
                <div className='col-span-3'>Quantity</div>
                <div className='col-span-2'>Total</div>
                <div className='col-span-1'>Delete</div>
              </div>

              <div className='divide-y'>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className='grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center'
                  >
                    {/* Product Info */}
                    <div className='col-span-1 md:col-span-4 flex items-center gap-4'>
                      <img
                        src={item.thumbnail_url}
                        alt={item.product_label}
                        className='w-16 h-16 object-cover rounded'
                      />
                      <div>
                        <p className='font-medium'>{item.product_label}</p>
                        <p className='text-sm text-muted-foreground'>
                          Color: {item.color_name}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className='col-span-1 md:col-span-2'>
                      <span className='text-sm md:hidden font-medium mr-2'>
                        Price:
                      </span>
                      ৳{item.sale_price}
                    </div>

                    {/* Quantity */}
                    <div className='col-span-1 md:col-span-3'>
                      <div className='flex items-center gap-2'>
                        <Button
                          variant='outline'
                          size='icon'
                          className='h-8 w-8'
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className='h-3 w-3' />
                        </Button>
                        <span className='w-12 text-center'>
                          {item.quantity}
                        </span>
                        <Button
                          variant='outline'
                          size='icon'
                          className='h-8 w-8'
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className='h-3 w-3' />
                        </Button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className='col-span-1 md:col-span-2 font-medium'>
                      <span className='text-sm md:hidden font-medium mr-2'>
                        Total:
                      </span>
                      ৳{(item.sale_price * item.quantity).toFixed(2)}
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className='text-destructive hover:text-destructive/80'
                    >
                      <Trash className='h-4 w-4' />
                    </button>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              {/* <div className='p-4 border-t'>
                <div className='flex gap-2 max-w-md'>
                  <Input
                    placeholder='Add promo code'
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant='secondary' className='shrink-0'>
                    APPLY
                  </Button>
                </div>
              </div> */}
            </div>

            <div className='mt-4'>
              <Button
                variant='outline'
                onClick={clearCart}
                disabled={cartItems.length === 0}
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Cart Totals */}
          <div className='lg:col-span-1 space-y-6'>
            <Card className='p-6'>
              <h2 className='text-xl font-semibold mb-6'>Cart Totals</h2>
              <div className='space-y-4'>
                <div className='flex justify-between text-muted-foreground'>
                  <span>Subtotals:</span>
                  <span>৳{subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between font-semibold text-lg pt-4 border-t'>
                  <span>Totals:</span>
                  <span>৳{subtotal.toFixed(2)}</span>
                </div>
                <p className='text-xs text-muted-foreground flex items-start gap-2'>
                  <span className='text-accent'>■</span>
                  <span>Shipping & taxes calculated at checkout</span>
                </p>
                <Button
                  variant='secondary'
                  className='w-full'
                  onClick={() => {
                    const checkoutData = {
                      cartItems,
                      subtotal,
                    };
                    // Send data to checkout page via sessionStorage
                    sessionStorage.setItem(
                      'checkout-data',
                      JSON.stringify(checkoutData)
                    );
                    router.push('/checkout');
                  }}
                >
                  Proceed To Checkout
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
