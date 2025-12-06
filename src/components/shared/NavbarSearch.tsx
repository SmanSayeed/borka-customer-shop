'use client';

import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Link from 'next/link';
import { Search } from 'lucide-react';
import useProducts from '@/hooks/useProducts';
import Image from 'next/image';

const NavbarSearch = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const { products } = useProducts();

  // Debounce for smoother typing
  const [debouncedText, setDebouncedText] = useState(searchText);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedText(searchText), 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    if (debouncedText) {
      const filtered = products.filter((p) => {
        const colorNames = Array.isArray(p.color_name)
          ? p.color_name.join(' ')
          : p.color_name;

        return (
          p.product_label.toLowerCase().includes(debouncedText.toLowerCase()) ||
          p.product_code.toLowerCase().includes(debouncedText.toLowerCase()) ||
          colorNames.toLowerCase().includes(debouncedText.toLowerCase()) ||
          p.product_category.toLowerCase().includes(debouncedText.toLowerCase())
        );
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [debouncedText, products]);

  return (
    <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <PopoverTrigger asChild>
        <button
          className='h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary transition'
          aria-label='Search'
        >
          <Search size={20} />
        </button>
      </PopoverTrigger>

      <PopoverContent className='w-[380px] p-2'>
        <Input
          autoFocus
          placeholder='Search products...'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className='border border-primary/20'
        />

        {searchText && (
          <div className='mt-2 flex flex-col gap-2 max-h-92 overflow-y-auto'>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className='flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition'
                  onClick={() => setIsSearchOpen(false)}
                >
                  {/* Thumbnail */}
                  <div className='w-12 h-12 relative flex-shrink-0'>
                    <Image
                      src={p.thumbnail_url}
                      alt={p.product_label}
                      fill
                      className='object-cover rounded'
                    />
                  </div>

                  {/* Product Info */}
                  <div className='flex flex-col text-sm'>
                    <span className='font-medium text-foreground truncate'>
                      {p.product_label}
                    </span>
                    <span className='text-gray-500'>{p.product_category}</span>
                    <div className='flex items-center gap-2'>
                      <span className='font-semibold text-primary'>
                        ৳{p.sale_price}
                      </span>
                      {p.is_discount_active && (
                        <span className='text-gray-400 line-through text-xs'>
                          ৳{p.original_price} ({p.discount_label})
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className='p-2 text-gray-500 text-sm'>No products found</div>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NavbarSearch;
