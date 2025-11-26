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
import { HandCoins, Package, Truck } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'; // ShadCN UI RadioGroup

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

type FormData = z.infer<typeof formSchema>;

const OrderForm = ({
  onFormSubmit,
}: {
  onFormSubmit: (data: FormData) => void;
}) => {
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
      deliveryCharge: 0,
      agreeToTerms: false,
    },
  });

  const paymentMethod = watch('paymentMethod');
  const sameAsShipping = watch('sameAsShipping');
  const shippingAddress = watch('shippingAddress');

  // Sync shipping -> billing when sameAsShipping is true
  useEffect(() => {
    if (sameAsShipping) {
      setValue('billingAddress', { ...shippingAddress });
    }
  }, [sameAsShipping, shippingAddress, setValue]);

  const onSubmit = (data: FormData) => {
    onFormSubmit(data);
  };

  return (
    <div className='bg-white rounded-xl p-6 md:p-8'>
      <h2 className='text-xl font-semibold text-foreground mb-6'>
        Shipping & Billing Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* Full Name & Phone */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='fullName'>Full Name *</Label>
            <Input id='fullName' {...register('fullName')} />
            {errors.fullName && (
              <p className='text-sm text-destructive'>
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='phoneNumber'>Phone Number *</Label>
            <Input id='phoneNumber' {...register('phoneNumber')} />
            {errors.phoneNumber && (
              <p className='text-sm text-destructive'>
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

        {/* Billing Address */}
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
          <Textarea
            placeholder='Additional notes...'
            {...register('notes')}
            className='h-24'
          />
        </div>

        {/* Payment Method Radio */}
        <div className='space-y-2'>
          <Label>Payment Method</Label>
          <Controller
            control={control}
            name='paymentMethod'
            render={({ field }) => (
              <div className='flex gap-4'>
                {/* Delivery Box */}
                <div
                  onClick={() => field.onChange('delivery')}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors',
                    field.value === 'delivery'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 bg-background'
                  )}
                >
                  <HandCoins className='w-8 h-8 text-foreground' />
                  <span className='font-medium text-lg text-foreground'>
                    Cash On Delivery
                  </span>
                </div>

                {/* Pickup Box */}
                <div
                  onClick={() => field.onChange('pickup')}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors',
                    field.value === 'pickup'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 bg-background'
                  )}
                >
                  <Package className='w-8 h-8 text-foreground' />
                  <span className='font-medium text-lg text-foreground'>
                    Advance Payment
                  </span>
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
          <p className='text-sm text-destructive'>
            {errors.agreeToTerms.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default OrderForm;
