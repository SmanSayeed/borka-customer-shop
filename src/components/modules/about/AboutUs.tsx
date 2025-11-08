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
    <div className='max-w-7xl mx-auto py-16'>
      <div className='grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto text-color'>
        {/* Left Content Section */}
        <div className='space-y-8'>
          {/* Header */}
          <div className='space-y-6'>
            <div className='flex items-center'>
              <CustomBadge text='Discover Faith Journey' />
            </div>

            <h1 className='text-4xl md:text-5xl lg:text-4xl font-bold text-heading leading-tight'>
              Your Spiritual Journey
              <br />
              <span className=''>Begins Here.</span>
            </h1>

            <p className='text-lg leading-relaxed max-w-lg'>
              Explore a path of faith, mindfulness, and inner growth. Embrace
              wisdom, compassion, and community support as you navigate your
              spiritual journey.
            </p>
          </div>

          {/* Features List */}
          <div className='space-y-4'>
            {features.map((feature, index) => (
              <div key={index} className='flex items-start gap-4 group'>
                <div className='flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-0.5 group-hover:bg-teal-200 transition-colors duration-300'>
                  <Check className='w-4 h-4 text-teal-600' />
                </div>
                <p className='leading-relaxed group-hover:text-heading transition-colors duration-300'>
                  {feature}
                </p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 pt-4'>
            <Button className='bg-primary hover:bg-secondary text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group'>
              Learn More
              <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300' />
            </Button>

            <Button
              variant='ghost'
              className='text-heading hover:text-teal-600 px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 hover:bg-gray-100 group'
            >
              <MessageCircle className='w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300' />
              Ask a Question
            </Button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className='relative'>
          {/* Main Image */}
          <div className='relative overflow-hidden rounded-2xl shadow-2xl'>
            <Image
              src='https://images.pexels.com/photos/4148860/pexels-photo-4148860.jpeg?auto=compress&cs=tinysrgb&w=800'
              alt='Meditation and spiritual reflection'
              className='w-full h-[600px] object-cover'
              width={500}
              height={500}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
          </div>

          {/* Floating Card */}
          <Card className='absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1'>
            <CardContent className='p-6'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0'>
                  <Plus className='w-6 h-6 text-teal-600' />
                </div>
                <div className='space-y-2'>
                  <h3 className='text-xl font-bold text-gray-900'>
                    Inspiring Growth, Mindfulness, and Compassion.
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    Join our community to explore spiritual practices and
                    personal development.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Decorative Elements */}
          <div className='absolute -top-4 -right-4 w-24 h-24 bg-teal-100 rounded-full opacity-60 animate-pulse' />
          <div className='absolute -bottom-8 -left-8 w-32 h-32 bg-teal-50 rounded-full opacity-40' />
        </div>
      </div>
    </div>
  );
}
