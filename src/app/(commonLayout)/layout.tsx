'use client'

import CartDrawer from '@/components/modules/cart/CartDrawer';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { useLenis } from '@/hooks/useLenis';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  useLenis();
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
};

export default CommonLayout;
