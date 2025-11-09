import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

const SuccessPage = () => {
  const orderData = {
    date: '02 May 2023',
    orderNumber: '024-125478956',
    paymentMethod: 'Mastercard',
    items: [
      {
        id: 1,
        name: 'All In One Chocolate Combo',
        size: 'Pack: Medium',
        quantity: 1,
        price: 50.0,
        image:
          'https://res.cloudinary.com/do6tvtff8/image/upload/v1761205488/1756636393926759_tugedf.jpg',
      },
      {
        id: 2,
        name: 'Desire Of Hearts',
        size: 'Pack: Large',
        quantity: 1,
        price: 50.0,
        image:
          'https://res.cloudinary.com/do6tvtff8/image/upload/v1761205484/171524926895183_kyxvfe.jpg',
      },
    ],
    subtotal: 100.0,
    shipping: 2.0,
    tax: 5.0,
  };

  const billingAddress = {
    name: 'Jane Smith',
    address: '456 Oak St #3b, San Francisco,',
    addressLine2: 'CA 94102, United States',
    phone: '+1 (415) 555-1234',
    email: 'jane.smith@email.com',
  };

  const orderTotal = orderData.subtotal + orderData.shipping + orderData.tax;

  return (
    <div className='bg-background py-20 px-4 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between mb-14 max-w-4xl mx-auto'>
        <div className='flex-1 text-center'>
          <div className='w-8 h-8 rounded-full bg-green-600 text-white mx-auto flex items-center justify-center'>
            1
          </div>
          <p className='mt-2 text-sm font-medium'>Your Cart</p>
        </div>
        <div className='flex-1 text-center border-t-2 border-green-600 relative top-4'></div>
        <div className='flex-1 text-center'>
          <div className='w-8 h-8 rounded-full bg-green-600 text-white mx-auto flex items-center justify-center'>
            2
          </div>
          <p className='mt-2 text-sm font-medium'>Checkout Details</p>
        </div>
        <div className='flex-1 text-center border-t-2 border-green-600 relative top-4'></div>
        <div className='flex-1 text-center'>
          <div className='w-8 h-8 rounded-full bg-green-600 text-white mx-auto flex items-center justify-center'>
            3
          </div>
          <p className='mt-2 text-sm font-medium'>Order Complete</p>
        </div>
      </div>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
          {/* Left Column - Thank You Message & Billing */}
          <div className='space-y-8'>
            <div>
              <h1 className='text-4xl lg:text-5xl font-bold text-foreground mb-4'>
                Thank you for your purchase!
              </h1>
              <p className='text-muted-foreground text-base'>
                Your order will be processed within 24 hours during working
                days. We will notify you by email once your order has been
                shipped.
              </p>
            </div>

            <div className='space-y-4'>
              <h2 className='text-xl font-semibold text-foreground'>
                Billing address
              </h2>
              <div className='space-y-3'>
                <div className='grid grid-cols-[100px_1fr] gap-2'>
                  <span className='font-medium text-foreground'>Name</span>
                  <span className='text-muted-foreground'>
                    {billingAddress.name}
                  </span>
                </div>
                <div className='grid grid-cols-[100px_1fr] gap-2'>
                  <span className='font-medium text-foreground'>Address</span>
                  <div className='text-muted-foreground'>
                    <div>{billingAddress.address}</div>
                    <div>{billingAddress.addressLine2}</div>
                  </div>
                </div>
                <div className='grid grid-cols-[100px_1fr] gap-2'>
                  <span className='font-medium text-foreground'>Phone</span>
                  <span className='text-muted-foreground'>
                    {billingAddress.phone}
                  </span>
                </div>
                <div className='grid grid-cols-[100px_1fr] gap-2'>
                  <span className='font-medium text-foreground'>Email</span>
                  <span className='text-muted-foreground'>
                    {billingAddress.email}
                  </span>
                </div>
              </div>
            </div>

            <Button variant='default' size='lg' className='rounded-none'>
              Track Your Order
            </Button>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div
              className='relative p-6 lg:p-8 shadow-sm flex flex-col items-center bg-cover bg-center bg-no-repeat border-none'
              style={{ backgroundImage: "url('/success.png')" }}
            >
              {/* Overlay for better readability */}
              <div className='absolute inset-0 bg-background/70 backdrop-blur-sm rounded-xl'></div>

              {/* Content on top of the background */}
              <div className='relative z-10 w-full'>
                <h2 className='text-2xl font-semibold text-foreground mb-6'>
                  Order Summary
                </h2>

                {/* Order Details */}
                <div className='grid grid-cols-3 gap-4 mb-6 pb-6 border-b'>
                  <div>
                    <div className='text-sm text-muted-foreground mb-1'>
                      Date
                    </div>
                    <div className='font-medium text-foreground'>
                      {orderData.date}
                    </div>
                  </div>
                  <div>
                    <div className='text-sm text-muted-foreground mb-1'>
                      Order Number
                    </div>
                    <div className='font-medium text-foreground'>
                      {orderData.orderNumber}
                    </div>
                  </div>
                  <div>
                    <div className='text-sm text-muted-foreground mb-1'>
                      Payment Method
                    </div>
                    <div className='font-medium text-foreground'>
                      {orderData.paymentMethod}
                    </div>
                  </div>
                </div>

                {/* Product Items */}
                <div className='space-y-4 mb-6'>
                  {orderData.items.map((item) => (
                    <div key={item.id} className='flex gap-4'>
                      <div className='w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0'>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-semibold text-foreground mb-1'>
                          {item.name}
                        </h3>
                        <p className='text-sm text-muted-foreground mb-1'>
                          {item.size}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className='font-semibold text-foreground shrink-0'>
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className='space-y-3 pt-4 border-t'>
                  <div className='flex justify-between text-muted-foreground'>
                    <span>Sub Total</span>
                    <span>${orderData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between text-muted-foreground'>
                    <span>Shipping</span>
                    <span>${orderData.shipping.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between text-muted-foreground'>
                    <span>Tax</span>
                    <span>${orderData.tax.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between text-xl font-bold text-foreground pt-3 border-t'>
                    <span>Order Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
