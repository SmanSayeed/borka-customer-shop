'use client';

import OrderForm from '@/components/modules/checkout/OrderForm';
import OrderSummary from '@/components/modules/checkout/OrderSummary';
import { useState } from 'react';

export interface CartItem {
  product_id: number;
  quantity: number;
  size_id: number;
  original_price: number;
  discount_amount: number;
}

const Checkout = () => {
  const [cartItems] = useState<CartItem[]>([
    {
      product_id: 1,
      quantity: 6,
      size_id: 1,
      original_price: 1000,
      discount_amount: 100,
    },
    {
      product_id: 2,
      quantity: 2,
      size_id: 1,
      original_price: 700,
      discount_amount: 0,
    },
  ]);

  const [deliveryCharge, setDeliveryCharge] = useState(100); // Default delivery charge
  const [totalPayable, setTotalPayable] = useState(0);

  const handleFormSubmit = (formData: any) => {
    // Calculate total payable amount
    const subtotal = cartItems.reduce(
      (sum, item) =>
        sum + item.original_price * item.quantity - item.discount_amount,
      0
    );
    const total = subtotal + formData.deliveryCharge;
    setTotalPayable(total);

    const payload = {
      phone_number: formData.phoneNumber,
      items: cartItems,
      shipping_address: formData.shippingAddress,
      billing_address: formData.billingAddress,
      notes: formData.notes || '',
      delivery_charge: formData.deliveryCharge,
      total_payable_amount: total,
    };

    console.log('Order Payload:', payload);
  };

  return (
    <div className='container mx-auto px-4 py-8 max-w-7xl'>
      <h1 className='text-3xl md:text-4xl font-bold text-foreground mb-8'>
        Checkout
      </h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2'>
          <OrderForm onFormSubmit={handleFormSubmit} />
        </div>

        <div className='lg:col-span-1'>
          <OrderSummary
            items={cartItems}
            deliveryCharge={deliveryCharge}
            totalPayableAmount={totalPayable}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
