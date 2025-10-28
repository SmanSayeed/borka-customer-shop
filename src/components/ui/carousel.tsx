'use client';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { useState, useRef, useId, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SlideData {
  title: string;
  button: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      const x = xRef.current;
      const y = yRef.current;
      slideRef.current.style.setProperty('--x', `${x}px`);
      slideRef.current.style.setProperty('--y', `${y}px`);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current!);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const { src, button, title } = slide;

  const overlayVariants = {
    initial: { y: '100%' },
    hover: { y: '0%', transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    hover: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.5, duration: 0.5, ease: 'easeOut' }, // overlay এর পরে
    },
  };

  return (
    <div className='[perspective:1200px] [transform-style:preserve-3d]'>
      <li
        ref={slideRef}
        className='flex flex-1 flex-col justify-end relative text-center text-white transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10'
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          transform:
            current !== index
              ? 'scale(0.98) rotateX(8deg)'
              : 'scale(1) rotateX(0deg)',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transformOrigin: 'bottom',
        }}
      >
        <div
          className='absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden transition-all duration-150 ease-out'
          style={{
            transform:
              current === index
                ? 'translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)'
                : 'none',
          }}
        >
          <img
            className='absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out'
            alt={title}
            src={src}
            loading='eager'
            decoding='sync'
          />
          {current === index && (
            <div className='absolute inset-0  transition-all duration-1000' />
          )}

          {/* Overlay slide-up */}
          <motion.div
            className='absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-white/10'
            initial='initial'
            animate={hovered ? 'hover' : 'initial'}
            variants={overlayVariants}
          />
        </div>

        <motion.article
          className='relative p-[4vmin] flex flex-col items-center z-20'
          initial='initial'
          animate={hovered ? 'hover' : 'initial'}
          variants={contentVariants}
        >
          <h2 className='text-lg md:text-2xl lg:text-4xl font-semibold'>
            {title}
          </h2>
          <div className='flex justify-center w-full'>
            <button className='mt-6 px-4 py-2 mx-auto text-sm text-foreground bg-white flex justify-center items-center rounded-md hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
              {button}
            </button>
          </div>
        </motion.article>
      </li>
    </div>
  );
};

const CarouselControl = ({
  type,
  title,
  handleClick,
}: {
  type: string;
  title: string;
  handleClick: () => void;
}) => (
  <button
    className={`w-10 h-10 flex items-center mx-2 justify-center bg-gray-50 border-3 border-transparent rounded-full focus:border-[#6D64F7] hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
      type === 'previous' ? 'rotate-180' : ''
    }`}
    title={title}
    onClick={handleClick}
  >
    <IconArrowNarrowRight className='text-foreground dark:text-neutral-200' />
  </button>
);

export default function Carousel({ slides }: { slides: SlideData[] }) {
  const [current, setCurrent] = useState(0);
  const id = useId();

  const handlePreviousClick = () => {
    setCurrent((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextClick = () => {
    setCurrent((prev) => (prev + 1 === slides.length ? 0 : prev + 1));
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) setCurrent(index);
  };

  // 🔁 Auto-play / looping effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div
      className='relative w-[70vmin] h-[74vmin] mx-auto'
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className='absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out'
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className='absolute flex justify-center w-full top-[calc(100%+1rem)]'>
        <CarouselControl
          type='previous'
          title='Go to previous slide'
          handleClick={handlePreviousClick}
        />
        <CarouselControl
          type='next'
          title='Go to next slide'
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
