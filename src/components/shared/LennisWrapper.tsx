'use client';
import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';

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
