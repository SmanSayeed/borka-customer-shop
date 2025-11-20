// components/ui/BreadcrumbBanner.tsx
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export interface BreadcrumbItemType {
  label: string;
  href?: string; // যদি href থাকে তাহলে clickable হবে
}

interface BreadcrumbBannerProps {
  items: BreadcrumbItemType[];
  className?: string;
}

const BreadcrumbBanner: React.FC<BreadcrumbBannerProps> = ({
  items,
  className = '',
}) => {
  return (
    <div className={`py-6 sm:py-10 ${className}`}>
      <Breadcrumb className='container mx-auto'>
        <BreadcrumbList>
          {items.map((item, index) => (
            <BreadcrumbItem key={index}>
              {item.href && index !== items.length - 1 ? (
                <BreadcrumbLink
                  href={item.href}
                  className='text-sm sm:text-base font-medium hover:text-blue-600 transition-colors'
                >
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className='text-sm sm:text-base font-medium text-gray-700'>
                  {item.label}
                </BreadcrumbPage>
              )}

              {index < items.length - 1 && (
                <BreadcrumbSeparator className='text-gray-400 mx-1'>
                  &gt;
                </BreadcrumbSeparator>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbBanner;
