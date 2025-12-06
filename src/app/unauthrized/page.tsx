'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

const UnauthorizedPage = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-background text-center'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex flex-col items-center space-y-6 p-6'
      >
        {/* Icon */}
        <div className='relative'>
          <div className='absolute inset-0 animate-ping rounded-full bg-red-500/30 blur-lg' />
          <ShieldAlert className='relative text-red-500' size={80} />
        </div>

        {/* Text Content */}
        <div>
          <h1 className='text-5xl font-bold text-foreground'>401</h1>
          <p className='mt-2 text-lg text-muted-foreground'>
            Unauthorized Access
          </p>
          <p className='mt-1 text-sm text-muted-foreground/70'>
            You don't have permission to view this page.
          </p>
        </div>

        {/* Action Button */}
        <Link
          href='/'
          className='mt-4 rounded-full bg-primary px-6 py-2 text-white transition-colors hover:bg-primary/90'
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default UnauthorizedPage;

