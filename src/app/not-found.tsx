'use client';

import { useRouter } from 'next/navigation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='flex flex-col min-h-screen items-center justify-center bg-primary/20 text-center'>
      <div className='w-200 h-100 -mt-10'>
        <DotLottieReact src='/not-found.json' loop autoplay />
      </div>

      <Button
        onClick={() => router.push('/')}
        className='bg-primary text-white rounded-none hover:bg-white hover:text-primary'
      >
        Go To Home Page
      </Button>
    </div>
  );
}
