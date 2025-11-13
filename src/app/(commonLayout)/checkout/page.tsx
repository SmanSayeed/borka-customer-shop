'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CheckoutPage = () => {
  const router = useRouter();
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const [billingAddress, setBillingAddress] = useState({
    name: '',
    address: '',
    area: '',
    zone_id: '',
  });

  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    area: '',
    zone_id: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    // Same as billing toggle হলে shipping address sync হবে
    if (sameAsBilling) {
      setShippingAddress({ ...billingAddress });
    }
  }, [sameAsBilling, billingAddress]);

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!agree) {
      alert('Please agree to the terms and conditions.');
      return;
    }

    const orderSummary = checkoutData.products.map((p) => ({
      product_id: p.id,
      name: p.name,
      quantity: p.quantity,
      subtotal: p.subtotal,
    }));

    const orderPayload = {
      billing_address: billingAddress,
      shipping_address: sameAsBilling ? billingAddress : shippingAddress,
      payment_method: paymentMethod,
      order_summary: orderSummary,
      coupon: checkoutData.coupon,
      tax: checkoutData.tax,
      total:
        checkoutData.products.reduce((acc, p) => acc + p.subtotal, 0) -
        checkoutData.coupon.discount +
        checkoutData.tax,
    };

    console.log('🧾 ORDER DATA:', orderPayload);
    router.push('/success');
  };

  const { products, coupon, tax } = checkoutData;
  const subtotal = products.reduce((acc, p) => acc + p.subtotal, 0);
  const total = subtotal - coupon.discount + tax;

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
        {/* Left Section - Address Forms */}
        <div className='space-y-8'>
          {/* Billing Address */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-gray-800'>
              Billing Address
            </h3>
            <Input
              name='name'
              value={billingAddress.name}
              onChange={handleBillingChange}
              placeholder='Full Name *'
            />
            <Input
              name='address'
              value={billingAddress.address}
              onChange={handleBillingChange}
              placeholder='Address *'
            />
            <Input
              name='area'
              value={billingAddress.area}
              onChange={handleBillingChange}
              placeholder='Area (optional)'
            />
            <Input
              name='zone_id'
              value={billingAddress.zone_id}
              onChange={handleBillingChange}
              placeholder='Zone ID *'
            />
          </div>

          {/* Same as Billing Checkbox */}
          <div className='flex items-center gap-2'>
            <Checkbox
              checked={sameAsBilling}
              onCheckedChange={() => setSameAsBilling(!sameAsBilling)}
              id='sameAddress'
            />
            <label htmlFor='sameAddress' className='text-sm'>
              Shipping address same as billing
            </label>
          </div>

          {/* Shipping Address */}
          {!sameAsBilling && (
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-gray-800'>
                Shipping Address
              </h3>
              <Input
                name='name'
                value={shippingAddress.name}
                onChange={handleShippingChange}
                placeholder='Full Name *'
              />
              <Input
                name='address'
                value={shippingAddress.address}
                onChange={handleShippingChange}
                placeholder='Address *'
              />
              <Input
                name='area'
                value={shippingAddress.area}
                onChange={handleShippingChange}
                placeholder='Area (optional)'
              />
              <Input
                name='zone_id'
                value={shippingAddress.zone_id}
                onChange={handleShippingChange}
                placeholder='Zone ID *'
              />
            </div>
          )}
        </div>

        {/* Right Section - Order Summary */}
        <div className='space-y-4 p-6 bg-gray-100 rounded-lg'>
          <h3 className='text-lg font-bold mb-4'>Your Order</h3>

          <div className='text-sm space-y-2'>
            {products.map((item) => (
              <div key={item.id} className='border-b pb-2'>
                <p className='font-medium'>
                  {item.name} × {item.quantity}
                </p>
                <p>Formulation: {item.formulation}</p>
                <p>CBD Type: {item.cbdType}</p>
                <p>Strength: {item.strength}</p>
                <p>Subtotal: ${item.subtotal.toFixed(2)}</p>
              </div>
            ))}
            <p>
              Coupon: {coupon.code} -${coupon.discount.toFixed(2)}
            </p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p className='font-bold text-base pt-2 border-t'>
              Total: ${total.toFixed(2)}
            </p>
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

          <div className='flex items-center gap-2 mt-3'>
            <Checkbox
              id='terms'
              checked={agree}
              onCheckedChange={() => setAgree(!agree)}
            />
            <label htmlFor='terms' className='text-sm'>
              You agree to our privacy policy and terms *
            </label>
          </div>

          <Button
            className='w-full mt-4 bg-primary hover:bg-teal-700'
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;


export const checkoutData = {
  products: [
    {
      id: 1,
      name: 'Energy Gummies',
      quantity: 2,
      formulation: 'Energy',
      cbdType: 'Pure Isolate (Zero THC)',
      strength: 'Regular (20mg/serving)',
      price: 30,
      subtotal: 60,
    },
  ],
  coupon: {
    code: 'gummy23',
    discount: 12, 
  },
  tax: 0,
};