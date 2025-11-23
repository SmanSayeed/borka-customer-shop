'use client';

import { Button } from '@/components/ui/button';
import { Confetti, type ConfettiRef } from '@/components/ui/confetti';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function OrderSuccessPage() {
  const confettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    confettiRef.current?.fire({});
  }, []);

  return (
    <div className='relative flex items-center justify-center px-4 py-12 overflow-hidden'>
      {/* Confetti Layer */}
      <div className='relative z-10 max-w-xl w-full text-center space-y-6 bg-white p-6 sm:p-10 rounded-xl'>
        <Confetti
          ref={confettiRef}
          className='absolute inset-0 z-0 pointer-events-none'
        />

        <div className='flex justify-center'>
          <CheckCircle className='w-16 h-16 sm:w-20 sm:h-20 text-green-500' />
        </div>

        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-foreground'>
          Order Placed Successfully!
        </h1>

        <p className='text-muted-foreground text-base sm:text-lg'>
          Thank you for your purchase! Your order has been received and is now
          being processed.
        </p>

        <div className='border rounded-xl p-4 sm:p-6 text-left space-y-2'>
          <h2 className='font-semibold text-lg sm:text-xl'>Order Summary</h2>

          <p className='text-muted-foreground text-sm sm:text-base'>
            Order ID: <span className='font-medium'>#MDG-45219</span>
          </p>

          <p className='text-muted-foreground text-sm sm:text-base'>
            Payment Status:{' '}
            <span className='font-medium text-green-600'>Paid</span>
          </p>

          <p className='text-muted-foreground text-sm sm:text-base'>
            Estimated Delivery:{' '}
            <span className='font-medium'>3–5 Business Days</span>
          </p>
        </div>

        <Link href='/products'>
          <Button className='mt-4 px-6 py-4 text-base sm:text-lg rounded-lg'>
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
