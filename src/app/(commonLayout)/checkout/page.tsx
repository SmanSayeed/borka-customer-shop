'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const CheckoutPage = () => {
  const router = useRouter();
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const handlePlaceOrder = () => {
    // এখানে অর্ডার প্রসেসিং logic রাখতে পারো
    router.push('/success'); // Redirect to success page
  };

  return (
    <div className='max-w-7xl mx-auto py-12 px-4'>
      {/* Step Progress */}
      <div className='flex items-center justify-between mb-14 max-w-4xl mx-auto'>
        <div className='flex-1 text-center'>
          <div className='w-8 h-8 rounded-full bg-green-600 text-white mx-auto flex items-center justify-center'>
            1
          </div>
          <p className='mt-2 text-sm font-medium'>Your Cart</p>
        </div>
        <div className='flex-1 text-center border-t-2 border-green-600 relative top-4'></div>
        <div className='flex-1 text-center'>
          <div className='w-8 h-8 rounded-full bg-green-600 text-white mx-auto flex items-center justify-center'>
            2
          </div>
          <p className='mt-2 text-sm font-medium'>Checkout Details</p>
        </div>
        <div className='flex-1 text-center border-t-2 border-gray-300 relative top-4'></div>
        <div className='flex-1 text-center'>
          <div className='w-8 h-8 rounded-full bg-gray-300 text-white mx-auto flex items-center justify-center'>
            3
          </div>
          <p className='mt-2 text-sm font-medium'>Order Complete</p>
        </div>
      </div>

      <div className='grid md:grid-cols-2 gap-8'>
        {/* Billing Form */}
        <div className='space-y-4'>
          <Input placeholder='First Name *' />
          <Input placeholder='Last Name *' />
          <Input placeholder='Company Name (optional)' />
          <Select onValueChange={setCountry}>
            <SelectTrigger>
              <SelectValue placeholder='Select a country / region *' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='usa'>USA</SelectItem>
              <SelectItem value='canada'>Canada</SelectItem>
              <SelectItem value='uk'>UK</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder='Street Address *' />
          <Input placeholder='Apartment, suite, unit, etc. (optional)' />
          <Input placeholder='Town / City *' />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='State / County *' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='newyork'>New York</SelectItem>
              <SelectItem value='texas'>Texas</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder='Postcode / ZIP *' />
          <Input placeholder='Phone *' />
          <Input placeholder='Email address *' />
          <Checkbox id='newsletter'>
            <span className='text-sm'>
              Sign me up to receive email updates and news (optional)
            </span>
          </Checkbox>
        </div>

        {/* Order Summary */}
        <div className='space-y-4 p-6 bg-gray-100 rounded-lg'>
          <h3 className='text-lg font-bold mb-4'>Your order</h3>
          <div className='text-sm space-y-2'>
            <p>Gummies × 2</p>
            <p>Formulation: Energy</p>
            <p>CBD Type: Pure Isolate (Zero THC)</p>
            <p>Strength: Regular (20mg/serving)</p>
            <p>Subtotal: $60.00</p>
            <p>Coupon: gummy23 -$12.00 [Remove]</p>
            <p>Shipping: Enter your address to view shipping options.</p>
            <p>Tax: $0.00</p>
            <p className='font-bold'>Total: $48.00</p>
          </div>

          {/* Payment Methods */}
          <div className='space-y-2 mt-4'>
            <label className='flex items-center gap-2'>
              <input
                type='radio'
                name='payment'
                checked={paymentMethod === 'credit'}
                onChange={() => setPaymentMethod('credit')}
              />
              Credit Card
            </label>
            <label className='flex items-center gap-2'>
              <input
                type='radio'
                name='payment'
                checked={paymentMethod === 'sezzle'}
                onChange={() => setPaymentMethod('sezzle')}
              />
              Interest Free Payments
            </label>
            <label className='flex items-center gap-2'>
              <input
                type='radio'
                name='payment'
                checked={paymentMethod === 'crypto'}
                onChange={() => setPaymentMethod('crypto')}
              />
              Crypto
            </label>
          </div>

          {paymentMethod === 'credit' && (
            <div className='space-y-2 mt-2'>
              <Input placeholder='Card Number *' />
              <div className='flex gap-2'>
                <Input placeholder='MM/YY *' />
                <Input placeholder='CSC *' />
              </div>
            </div>
          )}

          <Checkbox id='terms'>
            <span className='text-sm'>
              You agree to our privacy policy and terms and conditions *
            </span>
          </Checkbox>

          <Button
            className='w-full mt-4 bg-primary hover:bg-teal-700'
            onClick={handlePlaceOrder}
          >
            Place order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
