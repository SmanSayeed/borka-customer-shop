'use client';
import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';
<<<<<<< HEAD
=======
import Lenis from '@studio-freight/lenis';
>>>>>>> 811aa7daddb20053522508ce2af68cce8085fe2d

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
