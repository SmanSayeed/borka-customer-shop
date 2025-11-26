'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ForbiddenPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center max-w-md'
      >
        <div className='flex justify-center mb-6'>
          <div className='bg-red-100 dark:bg-red-900/30 p-6 rounded-full'>
            <Lock className='w-12 h-12 text-red-600 dark:text-red-400' />
          </div>
        </div>
        <h1 className='text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100'>
          403
        </h1>
        <h2 className='text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-300'>
          Access Forbidden
        </h2>
        <p className='text-gray-600 dark:text-gray-400 mb-8'>
          Sorry, you don’t have permission to view this page. Please check your
          account role or contact the administrator if you think this is a
          mistake.
        </p>

        <Link href='/'>
          <Button className='rounded-2xl'>Go Back Home</Button>
        </Link>
      </motion.div>
    </div>
  );
}
