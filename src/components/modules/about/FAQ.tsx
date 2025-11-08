'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import CustomBadge from '@/components/shared/CustomBadge';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// Faith Journey সম্পর্কিত FAQ data
const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'What is Faith Journey about?',
    answer:
      'Faith Journey is a holistic approach to nurturing your spiritual, mental, and emotional well-being through guided experiences, workshops, and community support.',
  },
  {
    id: 2,
    question: 'How can I join a Faith Journey program?',
    answer:
      'You can join by signing up through our website. After registration, you will receive detailed instructions and schedules for the program.',
  },
  {
    id: 3,
    question: 'Are the programs suitable for beginners?',
    answer:
      'Yes, our programs are designed for individuals at all levels, whether you are new to spiritual practices or have prior experience.',
  },
  {
    id: 4,
    question: 'Is there any cost to participate?',
    answer:
      'We offer both free and paid programs. The details and fees for each program are provided during registration.',
  },
  {
    id: 5,
    question: 'Can I participate online?',
    answer:
      'Absolutely! Many of our workshops and sessions are available online, allowing you to join from the comfort of your home.',
  },
];

const FAQ = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([1]); // প্রথম আইটেম expanded by default

  // Accordion toggle
  const toggleItem = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className='max-w-7xl mx-auto my-16 px-4'>
      {/* Header */}
      <div className='mb-12 text-center'>
        <CustomBadge text='Faith Journey FAQs' />
        <h2 className='text-3xl md:text-4xl font-bold mt-4 text-heading'>
          Frequently Asked Questions
        </h2>
      </div>

      {/* FAQ Items */}
      <div className='space-y-4'>
        {faqData.map((item) => (
          <div
            key={item.id}
            className='rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200 text-color'
          >
            {/* Question Button */}
            <button
              onClick={() => toggleItem(item.id)}
              className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200'
            >
              <span className='font-semibold text-secondary pr-4'>
                {item.id}. {item.question}
              </span>
              <div className='flex-shrink-0'>
                {expandedItems.includes(item.id) ? (
                  <Minus className='w-6 h-6 bg-secondary p-1 rounded-full text-white' />
                ) : (
                  <Plus className='w-5 h-5 text-secondary' />
                )}
              </div>
            </button>

            {/* Answer */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out px-6 ${
                expandedItems.includes(item.id)
                  ? 'max-h-96 opacity-100 py-4'
                  : 'max-h-0 opacity-0 py-0'
              }`}
            >
              <p className='text-sm leading-relaxed'>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
