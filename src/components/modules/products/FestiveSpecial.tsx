'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Eye, Heart, ShoppingBag } from 'lucide-react';

const FestiveSpecial = () => {
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

  const festiveProducts = products.filter((p) => p.status === 'trending');

  return (
    <div className='container mx-auto mt-24'>
      <h2 className='text-4xl font-semibold mb-10 text-center'>
        🎊 Festive Specials 🎊
      </h2>

      {festiveProducts.length === 0 ? (
        <p className='text-gray-500 text-center'>
          No festive special items available.
        </p>
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
          {festiveProducts.map((product, index) => (
            <SwiperSlide key={index}>
              <div className='relative border border-primary/10 overflow-hidden group transition-all duration-700'>
                {/* Image Section */}
                <div className='relative w-full h-100 overflow-hidden group'>
                  {/* Discount Badge */}
                  {product.discount > 0 && (
                    <span className='absolute top-2 right-2 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded'>
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
                    <Link href={`/product-details/${index}`}>
                      <button className='bg-white p-2 rounded-full hover:bg-gray-200 transform hover:scale-110 transition-transform duration-300'>
                        <Eye className='text-gray-800' />
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Content Section */}
                <div className='p-4 text-center flex flex-col items-center justify-center transition-all duration-300'>
                  <h4 className='font-semibold text-lg'>{product.name}</h4>
                  <p className='text-sm text-gray-500 mt-1'>
                    {product.color.join(', ')}
                  </p>

                  <div className='mt-2 flex items-center gap-2'>
                    <p className='font-medium text-primary'>
                      ৳{product.price.toLocaleString()}
                    </p>
                    {product.discount > 0 && (
                      <p className='text-gray-400 line-through text-sm'>
                        ৳
                        {Math.round(
                          product.price / (1 - product.discount / 100)
                        ).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default FestiveSpecial;
