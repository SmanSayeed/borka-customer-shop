'use client';

import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoaderProps {
  fullscreen?: boolean;
  size?: number;
  text?: string;
}

const Loader = ({
  fullscreen = false,
  size = 48,
  text = 'Loading...',
}: LoaderProps) => {
  const loaderContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className='flex flex-col items-center justify-center space-y-3 text-center'
    >
      <div className='relative'>
        <div className='absolute inset-0 animate-pulse rounded-full' />
        <Loader2
          className='relative animate-spin text-primary drop-shadow-lg'
          style={{ width: size, height: size }}
        />
      </div>
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='text-sm font-medium text-muted-foreground'
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );

  if (fullscreen) {
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md'>
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

export default Loader;
