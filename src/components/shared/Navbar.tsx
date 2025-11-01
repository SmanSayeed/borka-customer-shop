'use client';

import { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './assets';
import { ICategory } from '@/types/category';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '../ui/skeleton';
import useCategory from '@/hooks/useCategory';

const Navbar = () => {
const {categories, categoryFetchLoading} = useCategory();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='bg-secondary text-white relative'>
      <nav className='container mx-auto flex items-center justify-between py-3 px-6 lg:px-0'>
        <Link href='/'>
          <Logo height={80} width={80} />
        </Link>

        {categoryFetchLoading ? (
          <>
            {' '}
            <Skeleton className='w-200 h-12 bg-white/10' />
          </>
        ) : (
          <ul className='hidden lg:flex items-center gap-6'>
            {categories.map(({ id, slug, name }: ICategory) => (
              <Link
                key={id}
                href={`/category/${slug}`}
                className='hover:text-primary transition-colors'
              >
                {name}
              </Link>
            ))}
          </ul>
        )}

        {/* Right Icons */}
        <div className='flex items-center gap-4'>
          <button
            onClick={() => console.log('Search clicked')}
            className='p-2 rounded-full hover:bg-primary dark:hover:bg-gray-800 transition'
            aria-label='Search'
          >
            <Search className='size-5' />
          </button>

          <Link
            href='/cart'
            className='p-2 rounded-full hover:bg-primary dark:hover:bg-gray-800 transition'
            aria-label='Shopping Cart'
          >
            <ShoppingBag className='size-5' />
          </Link>

          <Link
            href='/signin'
            className='p-2 rounded-full hover:bg-primary dark:hover:bg-gray-800 transition'
            aria-label='User Account'
          >
            <User className='size-5' />
          </Link>

          {/* Hamburger for Mobile */}
          <button
            className='lg:hidden p-2 rounded-full hover:bg-primary transition'
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label='Menu'
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='lg:hidden bg-secondary overflow-hidden flex flex-col gap-2 px-6 py-8 text-sm'
          >
            {categories.map(({ id, slug, name }: ICategory) => (
              <Link
                key={id}
                href={`/category/${slug}`}
                className='py-2 hover:text-primary border-b border-white/10 transition-colors'
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </Link>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
