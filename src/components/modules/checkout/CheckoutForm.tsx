'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { HandCoins, Package, Lock } from 'lucide-react';

const formSchema = z.object({
  paymentMethod: z.enum(['delivery', 'pickup']),
  fullName: z.string().min(1, 'Full name is required'),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Invalid email address').optional(),
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

// Types
type FormData = z.infer<typeof formSchema>;

interface OrderItem {
  product_id: number;
  quantity: number;
  size_id: number;
  original_price: number;
  discount_amount: number;
}

interface CheckoutFormProps {
  items: OrderItem[];
  deliveryCharge: number;
  onPlaceOrder: (data: FormData & { totalPayable: number }) => void;
}

const CheckoutForm = ({
  items,
  deliveryCharge,
  onPlaceOrder,
}: CheckoutFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: 'delivery',
      fullName: '',
      phoneNumber: '',
      email: '',
      notes: '',
      shippingAddress: { address: '', zone_id: 0, area: '' },
      billingAddress: { address: '', zone_id: 0, area: '' },
      sameAsShipping: false,
      deliveryCharge: deliveryCharge,
      agreeToTerms: false,
    },
  });

  const sameAsShipping = watch('sameAsShipping');
  const shippingAddress = watch('shippingAddress');

  // Sync billing address with shipping
  useEffect(() => {
    if (sameAsShipping) {
      setValue('billingAddress', { ...shippingAddress });
    }
  }, [sameAsShipping, shippingAddress, setValue]);

  // Calculate prices
  const subtotal = items.reduce(
    (sum, item) =>
      sum + item.original_price * item.quantity - item.discount_amount,
    0
  );
  const totalPayable = subtotal + deliveryCharge;

  const submitHandler = (data: FormData) => {
    onPlaceOrder({ ...data, totalPayable });
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
      {/* LEFT SIDE — FORM */}
      <div className='lg:col-span-2 bg-white rounded-xl p-6 md:p-8'>
        <h2 className='text-xl font-semibold mb-6'>
          Shipping & Billing Information
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className='space-y-6'>
          {/* Name & Phone */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label>Full Name *</Label>
              <Input {...register('fullName')} />
              {errors.fullName && (
                <p className='text-red-500 text-sm'>
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label>Phone Number *</Label>
              <Input {...register('phoneNumber')} />
              {errors.phoneNumber && (
                <p className='text-red-500 text-sm'>
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          <div className='space-y-2'>
            <Label>Shipping Address *</Label>
            <Input
              placeholder='Address'
              {...register('shippingAddress.address')}
            />
            <Input placeholder='Area' {...register('shippingAddress.area')} />
            <Input
              type='number'
              placeholder='Zone ID'
              {...register('shippingAddress.zone_id', { valueAsNumber: true })}
            />
          </div>

          {/* Billing */}
          <div className='flex gap-2'>
            <Checkbox id='sameAsShipping' {...register('sameAsShipping')} />
            <Label htmlFor='sameAsShipping'>
              Billing address same as shipping
            </Label>
          </div>

          {!sameAsShipping && (
            <div className='space-y-2'>
              <Label>Billing Address *</Label>
              <Input
                placeholder='Address'
                {...register('billingAddress.address')}
              />
              <Input placeholder='Area' {...register('billingAddress.area')} />
              <Input
                type='number'
                placeholder='Zone ID'
                {...register('billingAddress.zone_id', { valueAsNumber: true })}
              />
            </div>
          )}

          {/* Notes */}
          <div className='space-y-2'>
            <Label>Notes</Label>
            <Textarea {...register('notes')} className='h-24' />
          </div>

          {/* Payment Method (BOX STYLE) */}
          <div className='space-y-2'>
            <Label>Payment Method</Label>

            <Controller
              control={control}
              name='paymentMethod'
              render={({ field }) => (
                <div className='flex gap-4'>
                  {/* COD */}
                  <div
                    onClick={() => field.onChange('delivery')}
                    className={cn(
                      'flex-1 p-4 rounded-lg border cursor-pointer flex items-center justify-center gap-3',
                      field.value === 'delivery'
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary'
                    )}
                  >
                    <HandCoins className='w-7 h-7' />
                    <span className='font-medium text-lg'>
                      Cash On Delivery
                    </span>
                  </div>

                  {/* Advance */}
                  <div
                    onClick={() => field.onChange('pickup')}
                    className={cn(
                      'flex-1 p-4 rounded-lg border cursor-pointer flex items-center justify-center gap-3',
                      field.value === 'pickup'
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary'
                    )}
                  >
                    <Package className='w-7 h-7' />
                    <span className='font-medium text-lg'>Advance Payment</span>
                  </div>
                </div>
              )}
            />
          </div>

          {/* Terms */}
          <div className='flex gap-2'>
            <Checkbox
              id='terms'
              onCheckedChange={(checked) =>
                setValue('agreeToTerms', checked as boolean)
              }
            />
            <Label htmlFor='terms'>I agree to the Terms and Conditions</Label>
          </div>
          {errors.agreeToTerms && (
            <p className='text-red-500 text-sm'>
              {errors.agreeToTerms.message}
            </p>
          )}

          {/* Submit Button */}
          <Button type='submit' className='w-full py-6 text-lg'>
            Place Order
          </Button>

          <div className='flex items-center justify-center gap-2 text-sm text-muted-foreground'>
            <Lock className='w-4 h-4' /> Secure Checkout
          </div>
        </form>
      </div>

      {/* RIGHT SIDE — SUMMARY */}
      <div className='bg-white rounded-xl p-6 h-fit'>
        <h2 className='text-xl font-semibold mb-6'>Order Summary</h2>

        <div className='space-y-3'>
          <div className='flex justify-between text-sm'>
            <span className='text-muted-foreground'>Subtotal</span>
            <span className='font-medium'>${subtotal}</span>
          </div>

          <div className='flex justify-between text-sm'>
            <span className='text-muted-foreground'>Delivery Charge</span>
            <span className='font-medium'>${deliveryCharge}</span>
          </div>

          <div className='border-t pt-3 flex justify-between items-center'>
            <span className='font-semibold'>Total Payable</span>
            <span className='text-2xl font-bold'>${totalPayable}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
