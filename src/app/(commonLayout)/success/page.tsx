'use client';

import OrderStepper from '@/components/shared/OrderStepper';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const SuccessPage = () => {
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('checkout-data');
    if (data) {
      setOrderData(JSON.parse(data));
    }
  }, []);

  if (!orderData) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-gray-500 text-lg'>Loading your order details...</p>
      </div>
    );
  }

  const {
    billing_address,
    shipping_address,
    payment_method,
    order_summary,
    coupon,
    tax,
    total,
  } = orderData;

  const subtotal = order_summary.reduce(
    (sum: number, item: any) => sum + item.subtotal,
    0
  );
  const shipping = 2; 

  return (
    <div className='bg-background py-20 px-4 sm:px-6 lg:px-8'>
      <OrderStepper currentStep={3}/>

      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
          {/* Left Column - Billing Address */}
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

            {/* Billing Address */}
            <div className='space-y-4'>
              <h2 className='text-xl font-semibold text-foreground'>
                Billing Address
              </h2>
              <div className='space-y-3'>
                <div className='grid grid-cols-[120px_1fr] gap-2'>
                  <span className='font-medium'>Name</span>
                  <span>{billing_address.name}</span>
                </div>
                <div className='grid grid-cols-[120px_1fr] gap-2'>
                  <span className='font-medium'>Address</span>
                  <span>{billing_address.address}</span>
                </div>
                {billing_address.area && (
                  <div className='grid grid-cols-[120px_1fr] gap-2'>
                    <span className='font-medium'>Area</span>
                    <span>{billing_address.area}</span>
                  </div>
                )}
                <div className='grid grid-cols-[120px_1fr] gap-2'>
                  <span className='font-medium'>Zone ID</span>
                  <span>{billing_address.zone_id}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className='space-y-4'>
              <h2 className='text-xl font-semibold text-foreground'>
                Shipping Address
              </h2>
              <div className='space-y-3'>
                <div className='grid grid-cols-[120px_1fr] gap-2'>
                  <span className='font-medium'>Name</span>
                  <span>{shipping_address.name}</span>
                </div>
                <div className='grid grid-cols-[120px_1fr] gap-2'>
                  <span className='font-medium'>Address</span>
                  <span>{shipping_address.address}</span>
                </div>
                {shipping_address.area && (
                  <div className='grid grid-cols-[120px_1fr] gap-2'>
                    <span className='font-medium'>Area</span>
                    <span>{shipping_address.area}</span>
                  </div>
                )}
                <div className='grid grid-cols-[120px_1fr] gap-2'>
                  <span className='font-medium'>Zone ID</span>
                  <span>{shipping_address.zone_id}</span>
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
              className='relative p-6 lg:p-8 shadow-sm flex flex-col items-center bg-cover bg-center bg-no-repeat border-none rounded-xl'
              style={{ backgroundImage: "url('/success.png')" }}
            >
              <div className='absolute inset-0 bg-background/70 backdrop-blur-sm rounded-xl'></div>
              <div className='relative z-10 w-full'>
                <h2 className='text-2xl font-semibold mb-6'>Order Summary</h2>

                {/* Order Items */}
                <div className='space-y-4 mb-6'>
                  {order_summary.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className='flex justify-between items-center'
                    >
                      <div>
                        <p className='font-semibold'>{item.name}</p>
                        <p className='text-sm text-muted-foreground'>
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className='font-semibold'>
                        ${item.subtotal.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Price Details */}
                <div className='space-y-2 border-t pt-4 text-sm'>
                  <div className='flex justify-between'>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Coupon ({coupon.code})</span>
                    <span>- ${coupon.discount.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between text-xl font-bold border-t pt-3'>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <span className='font-medium'>Payment Method:</span>
                    <span className='capitalize'>{payment_method}</span>
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
