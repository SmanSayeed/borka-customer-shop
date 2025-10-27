'use client';

import Features from '@/components/modules/Home/Features';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className='min-h-screen'>{children}</main>
      <Features />
      <Footer />
    </>
  );
};

export default CommonLayout;
