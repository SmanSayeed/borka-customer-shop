'use client';

import { useGlobalContext } from '@/context/GlobalContext';
import useCategory from '@/hooks/useCategory';
import { ICategory } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Logo } from './assets';
import CategoryMenuItem from './CategoryMenuItem';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { categories } = useCategory();
  const { cartDetails, setIsCartDrawerOpen } = useGlobalContext();

  return (
    <header className='bg-background text-white sticky top-0 z-20 leading-none'>
      <nav className='container mx-auto flex items-center justify-between py-3 px-4 lg:px-0'>
        {/* Logo */}
        <Link prefetch={true} href='/'>
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <ul className='hidden lg:flex items-center gap-6'>
          {categories.map((category: ICategory) => (
            <CategoryMenuItem key={category.id} category={category} />
          ))}
        </ul>

        {/* Right Section */}
        <div className='flex items-center gap-4'>
          <button
            onClick={() => console.log('Search clicked')}
            className='h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary transition'
            aria-label='Search'
          >
            <Search className='size-5' />
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className='relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary transition'
            aria-label='Shopping Cart'
          >
            <ShoppingBag className='size-5' />

            {cartDetails.products.length > 0 && (
              <span className='absolute -top-1.5 -right-1.5 bg-primary text-black text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center'>
                {cartDetails.products.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className='lg:hidden h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary transition'
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
            className='lg:hidden bg-background/50 backdrop-blur-md overflow-hidden flex flex-col gap-2 px-6 py-8 text-sm'
          >
            {categories.map(({ id, slug, name }: ICategory) => (
              <Link
                key={id}
                href={`/category/${slug}`}
                className='py-2 hover:text-primary transition-colors'
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
