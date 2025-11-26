'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-center px-4'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='max-w-md'
        >
          <div className='flex justify-center mb-6'>
            <div className='bg-red-100 dark:bg-red-900/30 p-6 rounded-full'>
              <AlertTriangle className='w-12 h-12 text-red-600 dark:text-red-400' />
            </div>
          </div>

          <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3'>
            Something went wrong
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mb-8'>
            We encountered an unexpected error. Don’t worry — you can try again
            or go back to safety.
          </p>

          <div className='flex items-center justify-center gap-4'>
            <Button
              onClick={() => reset()}
              variant='default'
              className='rounded-2xl'
            >
              Try Again
            </Button>

            <Button
              asChild
              variant='outline'
              className='rounded-2xl border-gray-400 text-gray-700 dark:text-gray-200'
            >
              <a href='/'>Go Home</a>
            </Button>
          </div>

          {/* Optional: show error digest for debugging */}
          {error?.digest && (
            <p className='mt-6 text-xs text-gray-500'>
              Error ID: {error.digest}
            </p>
          )}
        </motion.div>
      </body>
    </html>
  );
}
