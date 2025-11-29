'use client';

import { useGlobalContext } from '@/context/GlobalContext';
import useCategory from '@/hooks/useCategory';
import { ICategory } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Logo } from './assets';
import CategoryMenuItem from './CategoryMenuItem';
import { Skeleton } from '@/components/ui/skeleton';
import MobileCategoryItem from './MobileCategoryItem';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { categories, isCategoryLoading } = useCategory();
  const { cartDetails, setIsCartDrawerOpen } = useGlobalContext();

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial scroll position after mount
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use bg-black/0 initially, but black when menu is open on mobile or when scrolled
  const headerBg =
    menuOpen
      ? 'bg-black'
      : isMounted && isScrolled
        ? 'bg-background'
        : 'bg-black/0';

  return (
    <header
      className={`${headerBg} text-white sticky top-0 z-[100] leading-none transition-all duration-300 pointer-events-auto`}
    >
      <nav className='container mx-auto flex items-center justify-between py-3 px-4 lg:px-0 relative z-[101] pointer-events-auto'>
        {/* Logo */}
        <Link prefetch={true} href='/'>
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <ul className='hidden lg:flex items-center gap-6'>
          {isCategoryLoading ? (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className='h-6 w-20 bg-white/20'
                />
              ))}
            </>
          ) : (
            categories.map((category: ICategory) => (
              <CategoryMenuItem key={category.id} category={category} />
            ))
          )}
        </ul>

        {/* Right Section */}
        <div className='flex items-center gap-4'>
          {/* Search */}
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
            className='lg:hidden bg-black backdrop-blur-md overflow-hidden flex flex-col gap-0 px-6 py-8 text-sm relative z-[101]'
          >
            {isCategoryLoading ? (
              <>
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className='h-5 w-32 bg-white/20'
                  />
                ))}
              </>
            ) : (
              categories.map((category: ICategory) => (
                <MobileCategoryItem
                  key={category.id}
                  category={category}
                  onLinkClick={() => setMenuOpen(false)}
                />
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
