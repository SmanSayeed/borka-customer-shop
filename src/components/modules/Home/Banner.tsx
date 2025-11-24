'use client';

import EmblaCarousel from './HomeBanner/EmblaCarousel';
import './HomeBanner/embla.css';
import { bannerImages } from '@/constants';
import { EmblaOptionsType } from 'embla-carousel';

const SLIDES = bannerImages.map((image) => image)
const OPTIONS: EmblaOptionsType = {}

const HomeBanner = () => {
  return (
    <section className="bg-primary/5 py-12 sm:py-16 md:py-20 lg:py-24 not-even:bg-primary/5">      
      <EmblaCarousel slides={SLIDES} options={OPTIONS}/>
    </section>
  );
};

export default HomeBanner;
