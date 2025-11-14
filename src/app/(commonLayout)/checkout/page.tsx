// 'use client';

// import OrderForm from '@/components/modules/checkout/OrderForm';
// import OrderSummary from '@/components/modules/checkout/OrderSummary';
// import { useState } from 'react';

// export interface CartItem {
//   product_id: number;
//   quantity: number;
//   size_id: number;
//   original_price: number;
//   discount_amount: number;
// }

// const Checkout = () => {
//   const [cartItems] = useState<CartItem[]>([
//     {
//       product_id: 1,
//       quantity: 6,
//       size_id: 1,
//       original_price: 1000,
//       discount_amount: 100,
//     },
//     {
//       product_id: 2,
//       quantity: 2,
//       size_id: 1,
//       original_price: 700,
//       discount_amount: 0,
//     },
//   ]);

//   const [deliveryCharge, setDeliveryCharge] = useState(100);
//   const [totalPayable, setTotalPayable] = useState(0);

//   const [formData, setFormData] = useState<any>(null); // save form data

//   // Form submit from OrderForm
//   const handleFormSubmit = (data: any) => {
//     setFormData(data);

//     // calculate subtotal
//     const subtotal = cartItems.reduce(
//       (sum, item) =>
//         sum + item.original_price * item.quantity - item.discount_amount,
//       0
//     );

//     const total = subtotal + data.deliveryCharge;
//     setTotalPayable(total);
//   };

//   // Place order button from OrderSummary
//   const handlePlaceOrder = () => {
//     if (!formData) {
//       return console.log('❌ Please fill the form first');
//     }

//     const subtotal = cartItems.reduce(
//       (sum, item) =>
//         sum + item.original_price * item.quantity - item.discount_amount,
//       0
//     );

//     const total = subtotal + formData.deliveryCharge;

//     const payload = {
//       phone_number: formData.phoneNumber,
//       items: cartItems,
//       shipping_address: formData.shippingAddress,
//       billing_address: formData.billingAddress,
//       notes: formData.notes || '',
//       delivery_charge: formData.deliveryCharge,
//       total_payable_amount: total,
//       payment_method: formData.paymentMethod,
//     };

//     console.log('✅ FINAL ORDER PAYLOAD:', payload);
//   };

//   return (
//     <div className='container mx-auto px-4 py-8 max-w-7xl'>
//       <h1 className='text-3xl md:text-4xl font-bold text-foreground mb-8'>
//         Checkout
//       </h1>

//       <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
//         <div className='lg:col-span-2'>
//           <OrderForm onFormSubmit={handleFormSubmit} />
//         </div>

//         <div className='lg:col-span-1'>
//           <OrderSummary
//             items={cartItems}
//             deliveryCharge={deliveryCharge}
//             totalPayableAmount={totalPayable}
//             onPlaceOrder={handlePlaceOrder}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;



'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { HandCoins, Package, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartItem {
  product_id: number;
  quantity: number;
  size_id: number;
  original_price: number;
  discount_amount: number;
}

const formSchema = z.object({
  paymentMethod: z.enum(['delivery', 'pickup']),
  fullName: z.string().min(1, 'Full name is required'),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  notes: z.string().optional(),
  shippingAddress: z.object({
    address: z.string().min(1, 'Address required'),
    zone_id: z.number(),
    area: z.string().min(1, 'Area required'),
  }),
  billingAddress: z.object({
    address: z.string().min(1, 'Address required'),
    zone_id: z.number(),
    area: z.string().min(1, 'Area required'),
  }),
  sameAsShipping: z.boolean().optional(),
  deliveryCharge: z.number(),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, 'You must agree to terms'),
});

type FormData = z.infer<typeof formSchema>;

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

  const [totalPayable, setTotalPayable] = useState(0);
  const [formData, setFormData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: 'delivery',
      fullName: '',
      phoneNumber: '',
      notes: '',
      shippingAddress: { address: '', zone_id: 0, area: '' },
      billingAddress: { address: '', zone_id: 0, area: '' },
      sameAsShipping: false,
      deliveryCharge: 100,
      agreeToTerms: false,
    },
  });

  const sameAsShipping = watch('sameAsShipping');
  const shippingAddress = watch('shippingAddress');

  useEffect(() => {
    if (sameAsShipping) {
      setValue('billingAddress', { ...shippingAddress });
    }
  }, [sameAsShipping, shippingAddress, setValue]);

  // Calculate subtotal and total
  const calculateSubtotal = () =>
    cartItems.reduce(
      (sum, item) =>
        sum + item.original_price * item.quantity - item.discount_amount,
      0
    );

  const calculateTotal = (deliveryCharge: number) => {
    return calculateSubtotal() + deliveryCharge;
  };

  // This runs when user clicks "Save & Update Summary"
  const onSaveSummary = (data: FormData) => {
    setFormData(data);
    const total = calculateTotal(data.deliveryCharge);
    setTotalPayable(total);
    // optional: show toast/feedback here
    console.log('📝 Form saved — summary updated', { data, total });
  };

  // This runs when user clicks "Place Order"
  // We use handleSubmit so the form gets validated before placing the order.
  const onPlaceOrder = (data: FormData) => {
    // ensure state is in sync
    setFormData(data);
    const total = calculateTotal(data.deliveryCharge);
    setTotalPayable(total);

    const payload = {
      phone_number: data.phoneNumber,
      items: cartItems,
      shipping_address: data.shippingAddress,
      billing_address: data.billingAddress,
      notes: data.notes || '',
      delivery_charge: data.deliveryCharge,
      total_payable_amount: total,
      payment_method: data.paymentMethod,
    };

    // FINAL: place order (for now just console.log)
    console.log('✅ FINAL ORDER PAYLOAD:', payload);

    // TODO: call API here (fetch/axios) and handle success/error
  };

  return (
    <div className='container mx-auto px-4 py-8 max-w-7xl'>
      <h1 className='text-3xl md:text-4xl font-bold text-foreground mb-8'>
        Checkout
      </h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* LEFT: FORM */}
        <div className='lg:col-span-2 bg-white rounded-xl p-6 md:p-8'>
          <h2 className='text-xl font-semibold mb-6'>
            Shipping & Billing Information
          </h2>

          <form onSubmit={handleSubmit(onSaveSummary)} className='space-y-6'>
            {/* Full Name / Phone */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label>Full Name *</Label>
                <Input {...register('fullName')} />
                {errors.fullName && (
                  <p className='text-sm text-red-500'>
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Phone Number *</Label>
                <Input {...register('phoneNumber')} />
                {errors.phoneNumber && (
                  <p className='text-sm text-red-500'>
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>

            {/* Shipping */}
            <div>
              <Label>Shipping Address *</Label>
              <Input
                placeholder='Address'
                {...register('shippingAddress.address')}
              />
              <Input placeholder='Area' {...register('shippingAddress.area')} />
              <Input
                type='number'
                placeholder='Zone ID'
                {...register('shippingAddress.zone_id', {
                  valueAsNumber: true,
                })}
              />
            </div>

            {/* Billing */}
            <div className='flex items-center gap-2 mb-4'>
              <Checkbox id='sameAsShipping' {...register('sameAsShipping')} />
              <Label
                htmlFor='sameAsShipping'
                className='text-sm text-muted-foreground'
              >
                Billing address same as shipping
              </Label>
            </div>

            {!sameAsShipping && (
              <div>
                <Label>Billing Address *</Label>
                <Input
                  placeholder='Address'
                  {...register('billingAddress.address')}
                />
                <Input
                  placeholder='Area'
                  {...register('billingAddress.area')}
                />
                <Input
                  type='number'
                  placeholder='Zone ID'
                  {...register('billingAddress.zone_id', {
                    valueAsNumber: true,
                  })}
                />
              </div>
            )}

            {/* Notes */}
            <div>
              <Label>Notes</Label>
              <Textarea className='h-24' {...register('notes')} />
            </div>

            {/* Payment Method */}
            <div className='space-y-2'>
              <Label>Payment Method</Label>

              <Controller
                control={control}
                name='paymentMethod'
                render={({ field }) => (
                  <div className='flex gap-4'>
                    <div
                      onClick={() => field.onChange('delivery')}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border cursor-pointer',
                        field.value === 'delivery'
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <HandCoins className='w-7 h-7' />
                      <span className='font-medium'>Cash On Delivery</span>
                    </div>

                    <div
                      onClick={() => field.onChange('pickup')}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border cursor-pointer',
                        field.value === 'pickup'
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <Package className='w-7 h-7' />
                      <span className='font-medium'>Advance Payment</span>
                    </div>
                  </div>
                )}
              />
            </div>

            {/* Terms */}
            <div className='flex items-start gap-2'>
              <Checkbox
                id='terms'
                onCheckedChange={(checked) =>
                  setValue('agreeToTerms', checked as boolean)
                }
              />
              <Label htmlFor='terms' className='text-sm text-muted-foreground'>
                I have read and agree to the Terms and Conditions.
              </Label>
            </div>

            {errors.agreeToTerms && (
              <p className='text-sm text-red-500'>
                {errors.agreeToTerms.message}
              </p>
            )}
          </form>
        </div>

        {/* RIGHT: SUMMARY */}
        <div className='lg:col-span-1 bg-white rounded-xl p-6 sticky top-12 h-fit'>
          <h2 className='text-xl font-semibold mb-6'>Review your order</h2>

          <div className='space-y-4 mb-6'>
            {cartItems.map((item) => (
              <div key={item.product_id} className='flex justify-between'>
                <div>
                  <p className='font-medium text-sm'>
                    Product ID: {item.product_id}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    Qty: {item.quantity} | Size: {item.size_id}
                  </p>
                </div>
                <span className='font-semibold'>
                  ${item.original_price - item.discount_amount}
                </span>
              </div>
            ))}
          </div>

          <div className='py-4 border-t border-border space-y-2'>
            <div className='flex justify-between text-sm'>
              <span>Subtotal</span>
              <span className='font-medium'>${calculateSubtotal()}</span>
            </div>

            <div className='flex justify-between text-sm'>
              <span>Delivery Charge</span>
              <span className='font-medium'>${watch('deliveryCharge')}</span>
            </div>

            <div className='flex justify-between text-lg font-semibold pt-2'>
              <span>Total Payable</span>
              <span>${totalPayable}</span>
            </div>
          </div>

          {/* IMPORTANT: use handleSubmit(onPlaceOrder) so clicking Place Order validates form first */}
          <Button
            className='w-full mt-4'
            onClick={() => {
              // triggers form validation; if valid, onPlaceOrder gets called with form values
              handleSubmit(onPlaceOrder, (formErrs) => {
                // optional: you can show a toast here for invalid form
                console.log('🛑 Validation failed on place order', formErrs);
              })();
            }}
            disabled={isSubmitting}
          >
            Place Order
          </Button>

          <div className='flex items-center justify-center gap-2 text-xs text-muted-foreground mt-3'>
            <Lock className='w-4 h-4' />
            Secure Checkout – SSL Encrypted
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;



