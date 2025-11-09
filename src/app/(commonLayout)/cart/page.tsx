'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Minus, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BreadcrumbBanner from '@/components/shared/Breadcrumb';

interface CartItem {
  id: string;
  name: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage = () => {
  const router = useRouter();
  const [promoCode, setPromoCode] = useState('');
  const [country, setCountry] = useState('Bangladesh');
  const [city, setCity] = useState('Mirpur Dohs Dhaka-1200');
  const [postalCode, setPostalCode] = useState('');

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Digital Bandage',
      color: 'Brown',
      price: 32.0,
      quantity: 2,
      image:
        'https://res.cloudinary.com/do6tvtff8/image/upload/v1761205484/171480007779230_c9ygw5.jpg',
    },
    {
      id: '2',
      name: 'Covid-19 Mask',
      color: 'Brown',
      price: 32.0,
      quantity: 4,
      image:
        'https://res.cloudinary.com/do6tvtff8/image/upload/v1761205484/1730173954017210_lkkzx0.jpg',
    },
    {
      id: '3',
      name: 'Rice Flouring',
      color: 'Brown',
      price: 32.0,
      quantity: 1,
      image:
        'https://res.cloudinary.com/do6tvtff8/image/upload/v1761205484/171480007779230_c9ygw5.jpg',
    },
    {
      id: '4',
      name: 'Digital Tethiscope',
      color: 'Brown',
      price: 32.0,
      quantity: 32,
      image:
        'https://res.cloudinary.com/do6tvtff8/image/upload/v1761205484/171524926895183_kyxvfe.jpg',
    },
    {
      id: '5',
      name: 'N95 Covid Mask',
      color: 'Brown',
      price: 32.0,
      quantity: 5,
      image:
        'https://res.cloudinary.com/do6tvtff8/image/upload/v1761205488/1756636393926759_tugedf.jpg',
    },
  ]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
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
      <div className=''>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Cart Items */}
            <div className='lg:col-span-2'>
              <div className='bg-card rounded-lg shadow-sm overflow-hidden'>
                {/* Table Header */}
                <div className='hidden md:grid md:grid-cols-12 gap-4 p-4 border-b bg-muted/50 font-medium text-sm'>
                  <div className='col-span-4'>Product</div>
                  <div className='col-span-2'>Price</div>
                  <div className='col-span-3'>Quantity</div>
                  <div className='col-span-2'>Total</div>
                  <div className='col-span-1'></div>
                </div>

                {/* Cart Items */}
                {cartItems.length === 0 ? (
                  <div className='p-8 text-center text-muted-foreground'>
                    Your cart is empty
                  </div>
                ) : (
                  <div className='divide-y'>
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className='grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center'
                      >
                        {/* Product */}
                        <div className='col-span-1 md:col-span-4 flex items-center gap-4'>
                          <img
                            src={item.image}
                            alt={item.name}
                            className='w-16 h-16 object-cover rounded'
                          />
                          <div>
                            <p className='font-medium'>{item.name}</p>
                            <p className='text-sm text-muted-foreground'>
                              Color: {item.color}
                            </p>
                            <p className='text-sm text-muted-foreground'>
                              Quantity: ({item.quantity}pcs)
                            </p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className='col-span-1 md:col-span-2'>
                          <span className='text-sm md:hidden font-medium mr-2'>
                            Price:
                          </span>
                          ${item.price.toFixed(2)}
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
                          £{(item.price * item.quantity).toFixed(2)}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className='text-destructive hover:text-destructive/80'
                        >
                          <X className='h-4 w-4' />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Promo Code */}
                <div className='p-4 border-t'>
                  <div className='flex gap-2 max-w-md'>
                    <Input
                      placeholder='Add promo Code'
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant='secondary' className='shrink-0'>
                      APPLY
                    </Button>
                  </div>
                </div>
              </div>

              {/* Clear Cart Button */}
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

            {/* Cart Totals & Shipping */}
            <div className='lg:col-span-1 space-y-6'>
              {/* Cart Totals */}
              <Card className='p-6'>
                <h2 className='text-xl font-semibold mb-6'>Cart Totals</h2>
                <div className='space-y-4'>
                  <div className='flex justify-between text-muted-foreground'>
                    <span>Subtotals:</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between font-semibold text-lg pt-4 border-t'>
                    <span>Totals:</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <p className='text-xs text-muted-foreground flex items-start gap-2'>
                    <span className='text-accent'>■</span>
                    <span>Shipping & taxes calculated at checkout</span>
                  </p>
                  <Button
                    variant='secondary'
                    className='w-full'
                    onClick={() => router.push('/checkout')}
                  >
                    Proceed To Checkout
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
