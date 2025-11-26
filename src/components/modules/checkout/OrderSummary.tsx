'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Tag } from 'lucide-react';
import { useState } from 'react';

interface OrderItem {
  product_id: number;
  quantity: number;
  size_id: number;
  original_price: number;
  discount_amount: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  deliveryCharge: number;
  totalPayableAmount: number;
}

const OrderSummary = ({
  items,
  deliveryCharge,
  totalPayableAmount,
}: OrderSummaryProps) => {
  const subtotal = items.reduce(
    (sum, item) =>
      sum + item.original_price * item.quantity - item.discount_amount,
    0
  );

  return (
    <div className='bg-white rounded-xl p-6 sticky top-12'>
      <h2 className='text-xl font-semibold text-foreground mb-6'>
        Review your order
      </h2>

      <div className='space-y-4 mb-6'>
        {items.map((item) => (
          <div key={item.product_id} className='flex items-center gap-4'>
            <div className='flex-1'>
              <h3 className='font-medium text-foreground text-sm'>
                Product ID: {item.product_id}
              </h3>
              <p className='text-xs text-muted-foreground'>
                Quantity: {item.quantity} | Size: {item.size_id}
              </p>
            </div>
            <span className='font-semibold text-foreground'>
              ${item.original_price - item.discount_amount}
            </span>
          </div>
        ))}
      </div>

      <div className='space-y-3 mb-6'>
        <div className='flex justify-between text-sm'>
          <span className='text-muted-foreground'>Subtotal</span>
          <span className='font-medium text-foreground'>${subtotal}</span>
        </div>

        <div className='flex justify-between text-sm'>
          <span className='text-muted-foreground'>Delivery Charge</span>
          <span className='font-medium text-foreground'>${deliveryCharge}</span>
        </div>

        <div className='pt-3 border-t border-border'>
          <div className='flex justify-between items-center'>
            <span className='font-semibold text-foreground'>Total Payable</span>
            <span className='text-2xl font-bold text-foreground'>
              ${totalPayableAmount}
            </span>
          </div>
        </div>
      </div>

      <Button className='w-full mb-4'>Place Order</Button>

      <div className='flex items-center justify-center gap-2 text-sm text-muted-foreground'>
        <Lock className='w-4 h-4' />
        <span className='font-medium'>Secure Checkout - SSL Encrypted</span>
      </div>
      <p className='text-xs text-center text-muted-foreground mt-2'>
        Ensuring your financial and personal details are secure during every
        transaction.
      </p>
    </div>
  );
};

export default OrderSummary;
