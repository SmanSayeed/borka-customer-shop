'use client';

import useCategory from '@/hooks/useCategory';
import { ICategory } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  category: ICategory;
  onLinkClick: () => void;
}

const MobileCategoryItem = ({ category, onLinkClick }: Props) => {
  const { subCategories, isSubCategoryLoading } = useCategory(category.id);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasSubCategories = subCategories && subCategories.length > 0;

  const handleToggle = (e: React.MouseEvent) => {
    if (hasSubCategories) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    } else {
      onLinkClick();
    }
  };

  return (
    <li className='border-b border-white/10 last:border-b-0'>
      <div className='flex items-center justify-between'>
        <Link
          href={`/category/${category.slug}`}
          className='flex-1 py-3 hover:text-primary transition-colors'
          onClick={handleToggle}
        >
          {category.name}
        </Link>
        {hasSubCategories && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }}
            className='p-2 hover:text-primary transition-colors'
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        )}
      </div>

      <AnimatePresence>
        {hasSubCategories && isExpanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='overflow-hidden pl-4'
          >
            {isSubCategoryLoading ? (
              <li className='py-2'>
                <Skeleton className='h-4 w-24 bg-white/20' />
              </li>
            ) : (
              subCategories.map((sub: ICategory) => (
                <li key={sub.id}>
                  <Link
                    href={`/category/${sub.slug}`}
                    className='block py-2 hover:text-primary transition-colors text-sm'
                    onClick={onLinkClick}
                  >
                    {sub.name}
                  </Link>
                </li>
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export default MobileCategoryItem;

