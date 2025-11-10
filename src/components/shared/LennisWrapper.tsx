'use client';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const LennisWrapper = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.3, 
    });

    return () => {
      lenis.destroy(); 
    };
  }, []);

  return null; 
};

export default LennisWrapper;
