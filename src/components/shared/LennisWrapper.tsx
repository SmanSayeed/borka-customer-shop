'use client';
import { useEffect } from 'react';
import Lennis from '@studio-freight/lennis';

const LennisWrapper = () => {
  useEffect(() => {
    const lennis = new Lennis({
      lerp: 0.3, 
      direction: 'vertical', 
    });

    return () => {
      lennis.destroy(); 
    };
  }, []);

  return null; 
};

export default LennisWrapper;
