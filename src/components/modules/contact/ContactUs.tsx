'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ContactUS() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    // API call or backend submission can be added here
  };

  return (
    <section className='max-w-7xl mx-auto py-12 flex flex-col md:flex-row gap-8'>
      {/* Left Content */}
      <div className='flex-1 space-y-6'>
        <h2 className='text-3xl md:text-4xl font-bold text-heading'>
          Connect With Us For <br />
          <span className='text-primary'>Your Faith Journey</span>
        </h2>
        <p className='text-gray-600 max-w-md'>
          Reach out for guidance, feedback, or to join a Faith Journey program.
          Fill out the form, and our team of mentors will assist you promptly.
        </p>

        <div className='flex items-center gap-4'>
          <div className='flex -space-x-2 overflow-hidden'>
            <Image
              className='w-10 h-10 rounded-full'
              src='/avatars/avatar1.png'
              alt='mentor'
              width={100}
              height={100}
            />
            <Image
              className='w-10 h-10 rounded-full'
              src='/avatars/avatar2.png'
              alt='mentor'
              width={100}
              height={100}
            />
            <Image
              className='w-10 h-10 rounded-full'
              src='/avatars/avatar3.png'
              alt='mentor'
              width={100}
              height={100}
            />
            <Image
              className='w-10 h-10 rounded-full'
              src='/avatars/avatar4.png'
              alt='mentor'
              width={100}
              height={100}
            />
          </div>
          <button className='bg-primary-100 text-primary px-4 py-2 rounded-full font-semibold hover:bg-primary-200'>
            Talk to over 215 mentors
          </button>
        </div>

        <p className='flex items-center gap-1 text-sm text-gray-700'>
          <span className='text-yellow-500 text-lg'>⭐</span>
          <strong>(4.9)</strong> 15k+ positive feedbacks
        </p>

        {/* Info Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='bg-primary-50 p-4 rounded-xl'>
            <p className='font-semibold'>📍 Address</p>
            <p className='text-sm text-primary'>
              12 Harmony Lane, Spiritual Town, USA
            </p>
          </div>
          <div className='bg-primary/50 p-4 rounded-xl'>
            <p className='font-semibold'>📞 Call Us</p>
            <p className='text-sm text-primary-700'>+1 555 123 4567</p>
          </div>
          <div className='bg-primary/50 p-4 rounded-xl'>
            <p className='font-semibold'>📧 Send us a Mail</p>
            <p className='text-sm text-primary'>info@faithjourney.com</p>
            <p className='text-sm text-primary'>support@faithjourney.com</p>
          </div>
          <div className='bg-primary/50 p-4 rounded-xl'>
            <p className='font-semibold'>🕒 Opening Time</p>
            <p className='text-sm text-primary'>Mon–Sat: 8:00am–8:00pm</p>
            <p className='text-sm text-primary'>Sun: 9:00am–1:00pm</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className='flex-1 bg-primary rounded-2xl text-white p-8'>
        <h3 className='text-2xl font-bold mb-2'>Get In Touch</h3>
        <p className='mb-6 text-sm'>Our mentors are here to guide you</p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex gap-4'>
            <input
              type='text'
              name='firstName'
              placeholder='First Name'
              onChange={handleChange}
              className='flex-1 p-2 rounded bg-white text-primary'
            />
            <input
              type='text'
              name='lastName'
              placeholder='Last Name'
              onChange={handleChange}
              className='flex-1 p-2 rounded bg-white text-primary'
            />
          </div>
          <div className='flex gap-4'>
            <input
              type='email'
              name='email'
              placeholder='Your Email'
              onChange={handleChange}
              className='flex-1 p-2 rounded bg-white text-primary'
            />
            <input
              type='tel'
              name='phone'
              placeholder='Phone Number'
              onChange={handleChange}
              className='flex-1 p-2 rounded bg-white text-primary'
            />
          </div>
          <textarea
            name='message'
            placeholder='Message'
            rows={4}
            onChange={handleChange}
            className='w-full p-2 rounded bg-white text-primary'
          />
          <button
            type='submit'
            className='bg-white text-primary font-semibold px-6 py-2 rounded hover:bg-gray-100 inline-flex items-center'
          >
            Submit <span className='ml-2'>➡️</span>
          </button>
        </form>
      </div>
    </section>
  );
}
