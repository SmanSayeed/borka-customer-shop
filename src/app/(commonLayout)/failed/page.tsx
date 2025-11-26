'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FailedPage() {
  const router = useRouter()
  return (
    <div className='min-h-screen flex items-center justify-center px-6'>
      <div className='flex flex-col items-center justify-center text-center bg-white p-8 rounded-xl'>
        <div className='bg-red-100 text-red-600 rounded-full p-6 mb-6'>
          <AlertCircle className='w-16 h-16' />
        </div>
        <h1 className='text-3xl font-bold text-red-600 mb-3'>Payment Failed</h1>

        {/* 📝 Description */}
        <p className='text-gray-600 max-w-md mb-6'>
          Unfortunately, your order couldn’t be completed due to a network or
          payment issue. Please check your internet connection or try again
          later.
        </p>

        {/* 🔘 Actions */}
        <div className='flex flex-wrap gap-4 justify-center'>
          <Button
            variant='default'
            className='bg-red-600 hover:bg-red-700 text-white'
            onClick={() => 
              router.push('/')}
          >
            <RefreshCw className='w-4 h-4 mr-2' />
            Go To Home
          </Button>

          <Link href='/products'>
            <Button variant='outline'>Back to Shop</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
