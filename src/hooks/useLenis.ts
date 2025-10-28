'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.021 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.7,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])
}
