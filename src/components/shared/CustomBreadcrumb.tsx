'use client';

import Link from 'next/link';
import React from 'react';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type CustomBreadcrumbProps = {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
};

const CustomBreadcrumb = ({
  items,
  separator = '>',
}: CustomBreadcrumbProps) => {
  return (
    <nav
      aria-label='breadcrumb'
      className='overflow-x-auto whitespace-nowrap scrollbar-hide max-w-7xl'
    >
      <ol className='flex gap-1 sm:gap-2 text-sm sm:text-base text-white font-semibold'>
        {items.map((item, index) => (
          <li key={index} className='flex items-center gap-1'>
            {item.href ? (
              <Link href={item.href} className='hover:underline'>
                {item.label}
              </Link>
            ) : (
              <span className='capitalize'>{item.label}</span>
            )}
            {index !== items.length - 1 && <span>{separator}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CustomBreadcrumb;
