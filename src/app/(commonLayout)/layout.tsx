'use client'

import CartDrawer from '@/components/modules/cart/CartSheet';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { useLenis } from '@/hooks/useLenis';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  useLenis();
  return (
    <>
      <Navbar />
      <main className='pt-0 mt-0'>{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
};

export default CommonLayout;
