'use client';

import { motion } from 'framer-motion';
import { Package, BadgeCheck, HeartHandshake, ShieldCheck } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Package,
      title: 'Free Shipping',
      description: 'You will love at great low prices.',
    },
    {
      icon: BadgeCheck,
      title: 'Free Returns',
      description: 'Within 15 days for an exchange.',
    },
    {
      icon: HeartHandshake,
      title: 'Flexible Payment',
      description: 'Pay with multiple credit cards.',
    },
    {
      icon: ShieldCheck,
      title: 'Support Online',
      description: 'Outstanding premium support.',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    }),
  };

  return (
    <div className='container mx-auto mt-10'>
      <div className='py-10 px-4 border-b border-gray-100'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8'
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              custom={index}
              whileHover={{ scale: 1.05 }}
              className='flex items-start gap-4 bg-transparent rounded-xl transition-all duration-300 cursor-default group'
            >
              <div className='rounded-full border border-primary/20 p-3 transition-colors duration-300 group-hover:border-primary'>
                <service.icon
                  className='size-8 text-foreground transition-colors duration-300 group-hover:text-primary'
                  strokeWidth={1.5}
                />
              </div>
              <div className='flex flex-col'>
                <h4 className='font-semibold text-foreground mb-1 transition-colors duration-300 group-hover:text-primary'>
                  {service.title}
                </h4>
                <p className='text-sm text-muted-foreground'>
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
