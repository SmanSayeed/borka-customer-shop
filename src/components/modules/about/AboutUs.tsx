'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Check, ArrowRight, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import CustomBadge from '@/components/shared/CustomBadge';

export default function AboutUs() {
  const features = [
    'Embracing a Path of Spiritual Growth and Inner Peace.',
    'Connecting Hearts Through Compassion and Faith.',
    'Guiding You Towards a Meaningful and Purposeful Life.',
    'Empowering Individuals Through Knowledge and Community.',
    'Inspiring Every Step of Your Personal Journey.',
  ];

  return (
    <div className='max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center text-color'>
        {/* Left Content Section */}
        <div className='space-y-6 sm:space-y-8'>
          <div className='space-y-4 sm:space-y-6'>
            <div className='flex items-center'>
              <CustomBadge text='Discover Faith Journey' />
            </div>

            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-heading leading-tight'>
              Your Spiritual Journey
              <br />
              <span className=''>Begins Here.</span>
            </h1>

            <p className='text-base sm:text-lg leading-relaxed max-w-lg'>
              Explore a path of faith, mindfulness, and inner growth. Embrace
              wisdom, compassion, and community support as you navigate your
              spiritual journey.
            </p>
          </div>

          {/* Features List */}
          <div className='space-y-3 sm:space-y-4'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='flex items-start gap-3 sm:gap-4 group'
              >
                <div className='flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5 group-hover:bg-primary/50 transition-colors duration-300'>
                  <Check className='w-3 h-3 sm:w-4 sm:h-4 text-primary' />
                </div>
                <p className='text-sm sm:text-base leading-relaxed group-hover:text-heading transition-colors duration-300'>
                  {feature}
                </p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4'>
            <Button className='bg-primary hover:bg-secondary text-white px-4 py-2 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group flex items-center justify-center'>
              Learn More
              <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300' />
            </Button>

            <Button
              variant='ghost'
              className='text-heading hover:text-teal-600 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 group flex items-center justify-center'
            >
              <MessageCircle className='w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300' />
              Ask a Question
            </Button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className='relative w-full flex justify-center sm:justify-end'>
          {/* Main Image */}
          <div className='relative w-full max-w-md sm:max-w-lg md:max-w-xl overflow-hidden rounded-2xl shadow-2xl'>
            <Image
              src='/images/about.jpg'
              alt='Meditation and spiritual reflection'
              className='w-full h-80 sm:h-96 md:h-[500px] object-cover'
              width={500}
              height={500}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
          </div>

          {/* Floating Card */}
          <Card className='absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1'>
            <CardContent className='p-4 sm:p-6'>
              <div className='flex items-start gap-3 sm:gap-4'>
                <div className='w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0'>
                  <Plus className='w-4 h-4 sm:w-6 sm:h-6 text-teal-600' />
                </div>
                <div className='space-y-1 sm:space-y-2'>
                  <h4 className='text-base sm:text-lg font-bold text-gray-900'>
                    Inspiring Growth, Mindfulness, and Compassion.
                  </h4>
                  <p className='text-gray-600 text-xs sm:text-sm leading-relaxed'>
                    Join our community to explore spiritual practices and
                    personal development.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Decorative Elements */}
          <div className='absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-teal-100 rounded-full opacity-60 animate-pulse' />
          <div className='absolute -bottom-8 -left-8 w-24 h-24 sm:w-32 sm:h-32 bg-teal-50 rounded-full opacity-40' />
        </div>
      </div>
    </div>
  );
}
