'use client';

import useCategory from '@/hooks/useCategory';
import { ICategory } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  category: ICategory;
}

const CategoryMenuItem = ({ category }: Props) => {
  const { subCategories, isSubCategoryLoading } = useCategory(category.id);
  const [isHovered, setIsHovered] = useState(false);

  const hasSubCategories = subCategories && subCategories.length > 0;

  // if (isSubCategoryLoading) return <Loader />;

  return (
    <div
      className='relative group h-full flex items-center gap-1'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/products?category=${category.slug}`}
        className='flex items-center hover:text-primary transition-colors py-2 px-2 bg-black/80 rounded-sm text-sm lg:text-sm font-semibold'
      >
        {category.name}
        {hasSubCategories && (
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'rotate-180' : ''
              }`}
          />
        )}
      </Link>

      <AnimatePresence>
        {hasSubCategories && isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className='absolute top-full left-0 w-56 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden z-50 border border-gray-100'
          >
            <ul className='py-2'>
              {subCategories.map((sub: ICategory) => (
                <li key={sub.id}>
                  <Link
                    href={`/products?category=${category.slug}/${sub.slug}`}
                    className='block px-4 py-2 hover:bg-gray-50 hover:text-primary transition-colors text-sm'
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryMenuItem;
