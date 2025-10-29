'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const NewArrivals = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/products.json');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const newProducts = products.filter((p) => p.status === 'new');
  const firstThree = newProducts.slice(0, 4);

  // Framer Motion variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div className='container mx-auto mt-24 px-6 lg:px-0'>
      <div className='grid grid-cols-1 lg:grid-cols-12 items-start gap-5'>
        {/* Left section */}
        <div className='col-span-9 space-y-6'>
          <h2 className='text-4xl font-semibold mb-4'>New Arrivals</h2>
          <p className='text-foreground/80'>
            Discover the newest pieces in our collection and embrace timeless
            fashion.
          </p>

          {newProducts.length === 0 ? (
            <p className='text-gray-500'>No new arrivals available.</p>
          ) : (
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className='py-2'
            >
              {firstThree.map((product, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    className='relative border border-primary/20 overflow-hidden hover:bg-gray-50 hover:rounded-2xl group transition-all duration-700'
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.2 }}
                    custom={index}
                    variants={cardVariants}
                    whileHover={{ scale: 1 }}
                  >
                    <div className='relative w-full h-80 overflow-hidden'>
                      {/* Badges */}
                      {product.status && (
                        <span className='absolute top-3 left-3 z-10 bg-green-600 text-white text-[11px] px-2 py-1'>
                          {product.status.toUpperCase()}
                        </span>
                      )}
                      {product.discount > 0 && (
                        <span className='absolute top-3 right-3 z-10 bg-primary text-white text-xs font-semibold px-2 py-1'>
                          -{product.discount}%
                        </span>
                      )}

                      {/* Product Image */}
                      <Image
                        src={product.image?.[0] || '/placeholder.png'}
                        alt={product.name || 'Product'}
                        fill
                        className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
                      />

                      {/* Hover buttons on the right, vertically centered */}
                      <div className='absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10'>
                        <button className='bg-white w-9 h-9 flex items-center justify-center hover:bg-primary transition-colors duration-500'>
                          <ShoppingBag className='w-5 h-5' />
                        </button>
                        <button className='bg-white w-9 h-9 flex items-center justify-center hover:bg-primary transition-colors duration-500'>
                          <Heart className='w-5 h-5 ' />
                        </button>
                        <Link href={`/product/${product.slug ?? index}`}>
                          <button className='bg-white w-9 h-9 flex items-center justify-center hover:bg-primary transition-colors duration-500'>
                            <Eye className='w-5 h-5' />
                          </button>
                        </Link>
                      </div>
                    </div>

                    <div className='py-6 text-center flex flex-col items-center justify-center transition-all duration-300'>
                      <h4 className='font-semibold text-lg'>{product.name}</h4>
                      <p className='text-sm text-gray-500 mt-1'>
                        {Array.isArray(product.color)
                          ? product.color.join(', ')
                          : product.color}
                      </p>
                      <p className='font-medium text-primary mt-2'>
                        ৳{Number(product.price ?? 0).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <button className='underline font-semibold text-foreground hover:underline-offset-3 hover:text-primary transition-colors'>
            Discover New Arrival
          </button>
        </div>

        {/* Right image */}
        <div className='col-span-3 hidden lg:block'>
          <motion.div
            className='relative w-full h-full overflow-hidden group'
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Image
              src='/images/arrival.png'
              alt='new arrival'
              width={500}
              height={900}
              className='object-cover transition-transform duration-800 ease-in-out group-hover:scale-110'
              priority
            />

            <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
              <div className='w-84 h-146 border-6 border-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:opacity-0'></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
