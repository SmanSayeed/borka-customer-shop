'use client';

import CustomBadge from '@/components/shared/CustomBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MapPin, Mail, Clock, Globe } from 'lucide-react';

const centers = [
  {
    id: 1,
    location: 'New York Center',
    phone: '+1 212-555-0123',
    address: '123 Faith St, New York, NY 10001',
    email: 'contact@faithjourney.com',
  },
  {
    id: 2,
    location: 'Los Angeles Center',
    phone: '+1 310-555-0456',
    address: '456 Harmony Ave, Los Angeles, CA 90001',
    email: 'la@faithjourney.com',
  },
  {
    id: 3,
    location: 'Chicago Center',
    phone: '+1 773-555-0789',
    address: '789 Serenity Blvd, Chicago, IL 60601',
    email: 'chicago@faithjourney.com',
  },
];

const additionalInfo = [
  {
    icon: Clock,
    title: 'SCHEDULE',
    content: 'Mon-Sat: 8 AM — 8 PM',
  },
  {
    icon: Globe,
    title: 'ONLINE ACCESS',
    content: 'Join sessions from anywhere via Zoom or our platform',
  },
  {
    icon: Mail,
    title: 'CONTACT EMAIL',
    content: 'support@faithjourney.com',
  },
];

const BranchLocations = () => {
  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-16'>
          <div className='flex justify-center'>
            <CustomBadge text='Our Branches' />
          </div>
          <h2 className='text-3xl md:text-4xl font-bold text-heading mb-6'>
            Connect With Our{' '}
            <span className='text-teal-600'>Faith Journey Centers</span>
          </h2>
        </div>

        {/* Center Cards */}
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          {centers.map((center) => (
            <Card
              key={center.id}
              className='bg-teal-50 border-0 hover:shadow-lg transition-shadow duration-300'
            >
              <CardContent className='p-8'>
                <h3 className='text-xl font-bold text-teal-800 mb-6'>
                  {center.location}
                </h3>

                <div className='space-y-4'>
                  {/* Phone */}
                  <div className='flex items-start gap-3'>
                    <Phone className='w-5 h-5 mt-0.5 text-teal-600 flex-shrink-0' />
                    <span className='text-teal-700 font-medium'>
                      {center.phone}
                    </span>
                  </div>

                  {/* Address */}
                  <div className='flex items-start gap-3'>
                    <MapPin className='w-5 h-5 mt-0.5 text-teal-600 flex-shrink-0' />
                    <span className='text-teal-700 font-medium leading-relaxed'>
                      {center.address}
                    </span>
                  </div>

                  {/* Email */}
                  <div className='flex items-start gap-3'>
                    <Mail className='w-5 h-5 mt-0.5 text-teal-600 flex-shrink-0' />
                    <span className='text-blue-600 font-medium'>
                      {center.email}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className='grid md:grid-cols-3 gap-8'>
          {additionalInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <div key={index} className='flex items-center gap-4'>
                <div className='w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0'>
                  <IconComponent className='w-6 h-6 text-white' />
                </div>
                <div>
                  <h4 className='text-sm font-bold text-teal-800 mb-1'>
                    {info.title}
                  </h4>
                  <p className='text-teal-700 font-medium'>{info.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BranchLocations;
