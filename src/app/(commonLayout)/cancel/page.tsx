'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export default function CancelPage() {
  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center text-center px-6'>
      {/* ❌ Cancel Icon */}
      <div className='bg-gray-100 text-gray-700 rounded-full p-6 mb-6'>
        <XCircle className='w-16 h-16' />
      </div>

      {/* Title */}
      <h1 className='text-3xl font-bold text-gray-800 mb-3'>Order Cancelled</h1>

      {/* Description */}
      <p className='text-gray-600 max-w-md mb-6'>
        Your order has been successfully cancelled. You can place a new order or
        continue browsing our products.
      </p>

      {/* Actions */}
      <div className='flex flex-wrap gap-4 justify-center'>
        <Link href='/shop'>
          <Button variant='default'>Back to Shop</Button>
        </Link>

        <Link href='/'>
          <Button variant='outline'>Go to Home</Button>
        </Link>
      </div>
    </div>
  );
}
