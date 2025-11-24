'use client'

import { slides } from '@/constants';
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeBanner() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     nextSlide();
  //   }, 7000);
  //   return () => clearInterval(timer);
  // }, [current]);

  return (
    <div className="bg-background w-full flex justify-center">
      <div
        className="
          relative w-full  
          h-[250px] 
          sm:h-[320px] 
          md:h-[450px] 
          lg:h-[550px] 
          xl:h-[650px]
          overflow-hidden rounded-lg sm:rounded-xl
        "
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt="banner image"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 
  to-transparent"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6">
  
  {/* Title */}
  <h1
    className="
      text-xl sm:text-4xl 
      md:text-5xl lg:text-6xl 
      font-extrabold mb-3 sm:mb-4 
      drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]
      leading-tight
    "
  >
    {slide.title}
  </h1>

  {/* Subtitle */}
  <p
    className="
      text-sm sm:text-base 
      max-w-lg md:max-w-xl mb-5 sm:mb-6 md:px-0 px-16
      drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]
    "
  >
    {slide.subtitle}
  </p>

  {/* Button */}
  <Link
    href="/products"
    className="
      px-4 sm:px-8 py-1 sm:py-2 text-sm sm:text-lg
      bg-black/40  
      text-[#e1b320] font-semibold 
      rounded-full shadow-lg 
      hover:bg-black/60 hover:text-white
      transition-all duration-500
    "
  >
    Browse Collection
  </Link>

</div>

          </div>
        ))}

<button
  onClick={prevSlide}
  className="
    absolute bottom-6 sm:bottom-10 left-7 
    px-3 sm:px-4 py-1.5 sm:py-2 
    bg-white/10 hover:bg-white/20 
    text-white rounded-full transition 
    flex items-center gap-1 text-xs sm:text-sm
    backdrop-blur-md
    z-[20]
  "
>
  <ChevronLeft size={18} />
  <span className="hidden md:block">Prev</span>
</button>

{/* Next Button (Right) */}
<button
  onClick={nextSlide}
  className="
    absolute bottom-6 sm:bottom-10 right-7 
    px-3 sm:px-4 py-1.5 sm:py-2 
    bg-white/10 hover:bg-white/20 
    text-white rounded-full transition 
    flex items-center gap-1 text-xs sm:text-sm
    backdrop-blur-md
    z-[20]
  "
>
  <span className="hidden md:block">Next</span>
  <ChevronRight size={18} />
</button>

<div
  className="
    absolute bottom-10 sm:bottom-12 
    left-1/2 -translate-x-1/2 
    flex items-center gap-2 sm:gap-3 
    z-[20]
  "
>
  {slides.map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrent(index)}
      className={`
        h-1 rounded-full transition-all 
        ${
          current === index
            ? "bg-white/60 w-10 sm:w-12"
            : "bg-white/10 w-3 sm:w-6"
        }
      `}
    />
  ))}
</div>


      </div>
    </div>
  );
}
