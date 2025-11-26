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
  const { cartDetails, isCartDrawerOpen, setIsCartDrawerOpen } = useGlobalContext();

  return (
    <header className='bg-background text-white relative'>
      <nav className='container mx-auto flex items-center justify-between py-3 px-6 lg:px-0'>
        <Link prefetch={true} href='/'>
          <Logo />
        </Link>

        <ul className='hidden lg:flex items-center gap-6'>
          {categories.map((category: ICategory) => (
            <CategoryMenuItem key={category.id} category={category} />
          ))}
        </ul>

        <div className='flex items-center gap-4'>
          <button
            onClick={() => console.log('Search clicked')}
            className='p-3 rounded-full hover:bg-primary dark:hover:bg-gray-800 transition relative'
            aria-label='Search'
          >
            <Search className='size-5' />
          </button>

     
            <button
        onClick={() => setIsCartDrawerOpen(true)}
        className="relative md:p-3 p-2 rounded-full hover:bg-primary transition"
        aria-label="Shopping Cart"
      >
        <ShoppingBag className="size-5" />
        {cartDetails.products.length > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-primary text-black text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {cartDetails.products.length}
          </span>
        )}
      </button>

          {/* Menu Toggle */}
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
            className='lg:hidden bg-background/50 overflow-hidden flex flex-col gap-2 px-6 py-8 text-sm'
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
