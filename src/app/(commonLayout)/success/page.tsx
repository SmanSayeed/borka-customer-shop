'use client';

import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OrderSuccessPage() {
  return (
    <div className='flex items-center justify-center px-4 py-16'>
      <div className='max-w-xl w-full text-center space-y-6 bg-white p-10 rounded-xl'>
        {/* Success Icon */}
        <div className='flex justify-center'>
          <CheckCircle className='w-20 h-20 text-green-500' />
        </div>

        {/* Title */}
        <h1 className='text-3xl md:text-4xl font-bold text-foreground'>
          Order Placed Successfully!
        </h1>

        {/* Message */}
        <p className='text-muted-foreground text-lg'>
          Thank you for your purchase! Your order has been received and is now
          being processed.
        </p>

        {/* Order Info Box */}
        <div className='border rounded-xl p-6 text-left space-y-2'>
          <h2 className='font-semibold text-xl'>Order Summary</h2>
          <p className='text-muted-foreground'>
            Order ID: <span className='font-medium'>#MDG-45219</span>
          </p>
          <p className='text-muted-foreground'>
            Payment Status:{' '}
            <span className='font-medium text-green-600'>Paid</span>
          </p>
          <p className='text-muted-foreground'>
            Estimated Delivery:{' '}
            <span className='font-medium'>3–5 Business Days</span>
          </p>
        </div>

        {/* Button */}
        <Link href='/'>
          <Button className='mt-4 px-8 py-5 text-lg rounded-lg'>
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
