'use client';

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <section
      className={`w-full container mx-auto px-4 my-12 lg:px-0 lg:my-24 ${className}`}
    >
      {children}
    </section>
  );
};

export default Container;


