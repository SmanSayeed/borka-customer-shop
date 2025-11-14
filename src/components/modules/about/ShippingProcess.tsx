'use client';

import CustomBadge from '@/components/shared/CustomBadge';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
} from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Order Placed',
    description:
      'Customer places an order on our platform, and it is confirmed immediately.',
    icon: <ShoppingCart className='w-12 h-12 text-green-600' />,
    color: 'text-green-600 border-green-500',
  },
  {
    id: '02',
    title: 'Order Processed',
    description:
      'Our team processes the order, prepares the items, and ensures quality checks are done.',
    icon: <Package className='w-12 h-12 text-blue-600' />,
    color: 'text-blue-600 border-blue-500',
  },
  {
    id: '03',
    title: 'Shipped',
    description:
      'The order is handed over to our delivery partner for fast and secure shipping.',
    icon: <Truck className='w-12 h-12 text-purple-600' />,
    color: 'text-purple-600 border-purple-500',
  },
  {
    id: '04',
    title: 'Delivered',
    description:
      'The package reaches the customer safely, completing the delivery process.',
    icon: <CheckCircle className='w-12 h-12 text-green-600' />,
    color: 'text-green-600 border-green-500',
  },
];

const DeliveryShippingProcess = () => {
  return (
    <section className='py-16 bg-no-repeat bg-cover'>
      <div className='text-center mb-12'>
        <div className='flex justify-center'>
          <CustomBadge text='Delivery Process' />
        </div>
        <h2 className='text-3xl md:text-4xl font-bold mt-2'>
          How Your Order Reaches You
        </h2>
      </div>

      <div className='flex flex-col md:flex-row justify-center items-center gap-12 max-w-6xl mx-auto px-4 relative'>
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className='relative text-center max-w-xs'
          >
            <div
              className={`relative border-4 rounded-full w-30 h-30 mx-auto flex items-center justify-center ${step.color}`}
            >
              {step.icon}
              <div
                className={`absolute -top-3 -right-3 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold ${step.color}`}
              >
                {step.id}
              </div>
            </div>

            <h4 className='text-lg font-bold mt-4'>{step.title}</h4>
            <p className='text-gray-500 text-sm mt-2'>{step.description}</p>

            {index < steps.length - 1 && (
              <div className='hidden md:block absolute top-16 -right-10'>
                <ArrowRight size={28} className='text-gray-300' />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DeliveryShippingProcess;
