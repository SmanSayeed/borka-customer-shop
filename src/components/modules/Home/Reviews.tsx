'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  title: string;
  rating: number;
  content: string;
  images: string[]; // নতুন ফিল্ড
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Milton Austin',
    role: 'Sales Manager',
    company: 'Slack',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    title: 'It was a great experience!',
    rating: 5,
    content:
      'This can be done in a multitude of ways for example if you are producing a brochure selling wellington boots...',
    images: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 2,
    name: 'John Reeves',
    role: 'Head of Sales',
    company: 'Asana',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    title: 'Outstanding service and quality!',
    rating: 5,
    content:
      'Working with this team has been an absolute pleasure. Their attention to detail and commitment to excellence is unmatched...',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 3,
    name: 'John Reeves',
    role: 'Head of Sales',
    company: 'Asana',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    title: 'Outstanding service and quality!',
    rating: 5,
    content:
      'Working with this team has been an absolute pleasure. Their attention to detail and commitment to excellence is unmatched...',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    ],
  },
  {
    id: 4,
    name: 'John Reeves',
    role: 'Head of Sales',
    company: 'Asana',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    title: 'Outstanding service and quality!',
    rating: 5,
    content:
      'Working with this team has been an absolute pleasure. Their attention to detail and commitment to excellence is unmatched...',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    ],
  },
  // আরও testimonial objects একইভাবে
];

const Reviews = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(
    testimonials[0]
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'fill-primary text-primary' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className='container mx-auto p-12 bg-gray-50 rounded-2xl mt-20'>
      <h1 className='mb-12 text-4xl font-bold text-center'>Testimonials</h1>

      <div className='max-w-5xl mx-auto'>
        <div className='grid gap-8 lg:grid-cols-[300px_1fr]'>
          <div className='space-y-4'>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`cursor-pointer transition-all hover:shadow-md rounded-md ${
                  selectedTestimonial.id === testimonial.id
                    ? 'border-primary bg-gray-100'
                    : ''
                }`}
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <div className='flex items-center gap-4 p-4'>
                  <Avatar className='h-12 w-12'>
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className='font-semibold'>{testimonial.name}</h3>
                    <p className='text-sm text-muted-foreground'>
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main testimonial content */}
          <div>
            <div className='lg:pl-8'>
              <h2 className='mb-4 text-2xl font-bold'>
                {selectedTestimonial.title}
              </h2>

              <div className='mb-6 flex gap-1'>
                {renderStars(selectedTestimonial.rating)}
              </div>

              <p className='text-muted-foreground leading-relaxed mb-6'>
                {selectedTestimonial.content}
              </p>

              {/* Images below testimonial */}
              <div className='flex gap-4'>
                {selectedTestimonial.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`testimonial-${selectedTestimonial.id}-${idx}`}
                    className='h-26 w-26 object-cover rounded-md'
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
