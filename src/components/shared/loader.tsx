'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface LoaderProps {
  fullscreen?: boolean;
  size?: number;
  text?: string;
  circle?: boolean;
  skeleton?: 'grid' | boolean | undefined;
  skeletonCount?: number;
}

const Loader: React.FC<LoaderProps> = ({
  fullscreen = false,
  size = 48,
  text = 'Loading...',
  circle = false,
  skeleton,
  skeletonCount,
}: LoaderProps) => {
  const isGrid = skeleton === 'grid';
  const count = (() => {
    if (typeof skeletonCount === 'number' && skeletonCount > 0)
      return skeletonCount;
    if (isGrid) return 9;
    return 4;
  })();

  // single skeleton item
  const SkeletonItem: React.FC<{ index: number }> = ({ index }) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className='rounded-md bg-muted-foreground/10 animate-pulse'
      style={{ width: 80, height: 40 }}
      role='status'
      aria-hidden='true'
    />
  );

  const circleSpinner = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className='flex flex-col items-center justify-center space-y-3 text-center'
    >
      <div className='relative'>
        <div className='absolute inset-0 rounded-full opacity-20' />
        <Loader2
          className='relative animate-spin text-primary drop-shadow-lg'
          style={{ width: size, height: size }}
          aria-hidden='true'
        />
      </div>
      {text && (
        <p className='text-sm font-medium text-muted-foreground'>{text}</p>
      )}
    </motion.div>
  );

  const skeletonGrid = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className='w-full'
    >
      <div className='grid grid-cols-12 gap-4'>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className='col-span-4 flex items-center justify-center'>
            <SkeletonItem index={i} />
          </div>
        ))}
      </div>
    </motion.div>
  );

  const skeletonInline = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className='flex flex-wrap gap-3 items-center justify-center'
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonItem key={i} index={i} />
      ))}
    </motion.div>
  );
  const content = circle
    ? circleSpinner
    : skeleton
    ? isGrid
      ? skeletonGrid
      : skeletonInline
    : circleSpinner;

  if (fullscreen) {
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md'>
        {content}
      </div>
    );
  }

  return <div className='inline-block'>{content}</div>;
};

export default Loader;
