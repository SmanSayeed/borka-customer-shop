'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Eye, Heart, ShoppingBag } from 'lucide-react';

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

  return (
    <div className='container mx-auto mt-20'>
      <h2 className='text-4xl font-semibold mb-10 text-center'>New Arrivals</h2>

      {products.filter((p) => p.status === 'new').length === 0 ? (
        <p className='text-gray-500 text-center'>No new arrivals available.</p>
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
        >
          {products
            .filter((p) => p.status === 'new')
            .map((product, index) => (
              <SwiperSlide key={index}>
                <div className='relative border border-primary/10 overflow-hidden group transition-all duration-700'>
                  
                  {/* Image */}
                  <div className='relative w-full h-100 overflow-hidden group'>
                    {/* Badges */}
                    {product.status && (
                      <span className='absolute top-2 left-2 z-10 bg-green-500 text-white text-[10px] px-2 py-1 rounded'>
                        {product.status.toUpperCase()}
                      </span>
                    )}
                    {product.discount > 0 && (
                      <span className='absolute top-2 right-2 z-10 bg-primary text-white text-xs font-semibold px-2 py-1 rounded'>
                        -{product.discount}%
                      </span>
                    )}

                    {/* Image */}
                    <Image
                      src={product.image[0]}
                      alt={product.name}
                      fill
                      className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
                    />

                    {/* Hover Icons */}
                    <div className='absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10'>
                      <button className='bg-white p-2 rounded-full hover:bg-gray-200 transform hover:scale-110 transition-transform duration-300'>
                        <ShoppingBag className='text-primary' />
                      </button>
                      <button className='bg-white p-2 rounded-full hover:bg-gray-200 transform hover:scale-110 transition-transform duration-300'>
                        <Heart className='text-red-500' />
                      </button>
                      <Link href={`/category/${index}`}>
                        <button className='bg-white p-2 rounded-full hover:bg-gray-200 transform hover:scale-110 transition-transform duration-300'>
                          <Eye className='text-gray-800' />
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Content */}
                  <div className='p-4 text-center flex flex-col items-center justify-center transition-all duration-300'>
                    <h4 className='font-semibold text-lg'>{product.name}</h4>
                    <p className='text-sm text-gray-500 mt-1'>
                      {product.color.join(', ')}
                    </p>
                    <p className='font-medium text-primary mt-2'>
                      ৳{product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default NewArrivals;
