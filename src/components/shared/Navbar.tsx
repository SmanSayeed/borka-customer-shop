'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useGlobalContext } from '@/context/GlobalContext';
import useCategory from '@/hooks/useCategory';
import useProducts from '@/hooks/useProducts';
import { ICategory } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Logo } from './assets';
import CategoryMenuItem from './CategoryMenuItem';
import MobileCategoryItem from './MobileCategoryItem';
import NavbarSearch from './NavbarSearch';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { categories, businessCategories, isCategoryLoading } = useCategory();
  const { cartDetails, setIsCartSheetOpen } = useGlobalContext();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products } = useProducts();

  const [selectedBusinessCat, setSelectedBusinessCat] = useState<number>(1);

  const filteredCategories = categories.filter(
    (cat) => cat.business_category_id === selectedBusinessCat
  );

  return (
    <header className='bg-black text-white sticky top-0 z-40 leading-none transition-all duration-300 pointer-events-auto'>
      <nav className='container mx-auto flex items-center justify-between py-2 px-4 lg:px-0 relative z-40 pointer-events-auto'>
        {/* Logo */}
        <Link prefetch={true} href='/'>
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <ul className='hidden lg:flex items-center gap-2'>
          {isCategoryLoading ? (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className='h-6 w-20 bg-white/20' />
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
          <NavbarSearch />

          {/* Cart Button */}
          <button
            onClick={() => setIsCartSheetOpen(true)}
            className='relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary transition'
            aria-label='Shopping Cart'
          >
            <ShoppingBag className='size-5' />

            {cartDetails.products.length > 0 && (
              <span className='absolute -top-1.5 -right-1.5 bg-primary text-black text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center'>
                {cartDetails.products.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )}
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
            className='lg:hidden bg-black backdrop-blur-md overflow-hidden flex flex-col gap-0 px-6 py-8 text-sm relative z-40'
          >
            {isCategoryLoading ? (
              <>
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className='h-5 w-32 bg-white/20' />
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

      {/* Mobile Only — Business Categories + Main Category Slider */}
      <div className='md:hidden flex items-center gap-6 border-t border-white/10 py-4 px-2'>
        {/* LEFT SIDE → SELECT */}
        <div className='w-[140px]'>
          <Select
            onValueChange={(value) => setSelectedBusinessCat(Number(value))}
            defaultValue='1'
          >
            <SelectTrigger className='bg-white/10 border-0'>
              <SelectValue placeholder='Category' />
            </SelectTrigger>

            <SelectContent className='bg-white/15'>
              {businessCategories.map((bc) => (
                <SelectItem
                  key={bc.id}
                  value={String(bc.id)}
                  className='bg-transparent'
                >
                  {bc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* RIGHT SIDE → FILTERED CATEGORIES */}
        <div className='flex items-center gap-4 overflow-x-auto whitespace-nowrap py-2 text-sm'>
          {filteredCategories.map((cat) => (
            <div key={cat.id} className=''>
              {cat.name}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
