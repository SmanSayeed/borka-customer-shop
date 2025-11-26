'use client';

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <section
      className={`w-full container mx-auto pt-12 md:px-0 ${className}`}
    >
      {children}
    </section>
  );
};

export default Container;


