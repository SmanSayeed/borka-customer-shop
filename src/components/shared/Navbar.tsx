'use client'

import { categoryLinks } from '@/constants/category';
import { Search, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link';
import { Logo } from './assets';

const Navbar = () => {
  return (
    <div className='bg-secondary'>
      <nav className='container mx-auto flex items-center justify-between py-2 text-white'>
        <Link href='/'>
          <Logo height={80} width={80}/>
        </Link>
        <div>
          <ul className='flex items-center justify-around gap-6'>
            {categoryLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className='hover:text-primary transition-colors'
              >
                {link.name}
              </Link>
            ))}
          </ul>
        </div>
        <div className='flex items-center justify-around gap-6'>
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
        </div>
      </nav>
    </div>
  );
}

export default Navbar