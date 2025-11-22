'use client';

import { createOrder } from '@/actions/order';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { defaultCheckoutForm } from '@/constants';
import useCart from '@/hooks/useCart';
import { cn } from '@/lib/utils';
import { checkoutFormSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { HandCoins, Package } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

type FormData = z.infer<typeof checkoutFormSchema>;

const Checkout = () => {
  const router = useRouter();
  const { cartDetails } = useCart();
  const carts = cartDetails.products || [];
  const subtotal = cartDetails.cart_total || 0;
  const discountAmount = cartDetails.discount_amount || 0;

  const [totalPayable, setTotalPayable] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: defaultCheckoutForm,
  });

  const sameAsShipping = watch('sameAsShipping');
  const shippingAddress = watch('shippingAddress');
  const deliveryCharge = watch('deliveryCharge');

  /** Sync Billing with Shipping */
  useEffect(() => {
    if (sameAsShipping) {
      setValue('billingAddress', { ...shippingAddress });
    }
  }, [sameAsShipping, shippingAddress, setValue]);

  const calculateSubtotal = () => subtotal;

  /** Total calculation */
  const calculateTotal = (delivery: number) => {
    return subtotal - discountAmount + (delivery || 0);
  };

  /** Save & Update Summary */
  const onSaveSummary = (data: FormData) => {
    const total = calculateTotal(data.deliveryCharge);
    setTotalPayable(total);

    console.log('📝 Summary Updated:', { data, total });
  };

  /** Cart item format for payload */
  /** Cart item format for payload */
  const cartItems = carts.map((cart) => ({
    product_id: cart.id,
    quantity: cart.quantity,
    size_id: cart.size_id,
    original_price: cart.price_info.original_price,
    discount_amount: cart.price_info.discount_amount || 0,
  }));

  // * Final order submit
  const onPlaceOrder = async (data: FormData) => {
    try {
      const total = calculateTotal(data.deliveryCharge);
      setTotalPayable(total);

      const orderPayload = {
        phone_number: data.phoneNumber,
        name: data.fullName,

        items: cartItems,

        shipping_address: {
          ...data.shippingAddress,
          name: data.fullName,
        },

        billing_address: {
          ...data.billingAddress,
          name: data.fullName,
        },

        notes: data.notes || '',
        delivery_charge: data.deliveryCharge,
        total_payable_amount: total,
        payment_method: data.paymentMethod,
      };

      const createdOrder = await createOrder(orderPayload);

      if (createdOrder?.success) {
        toast.success(`${createdOrder?.data || 'Order created successfully'}`);
      }
      router.push('/success');
    } catch (error: any) {
      console.error('Error placing order:', error);
    }
  };

  useEffect(() => {
    if (deliveryCharge !== undefined) {
      setTotalPayable(calculateTotal(deliveryCharge));
    }
  }, [deliveryCharge, carts]);

  return (
    <div className='container mx-auto px-4 py-8 max-w-7xl'>
      <h1 className='text-3xl md:text-4xl font-bold mb-8'>Checkout</h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* LEFT SIDE FORM */}
        <div className='lg:col-span-2 bg-white rounded-xl p-6 md:p-8 shadow-sm border'>
          <h2 className='text-xl font-semibold mb-6'>
            Shipping & Billing Information
          </h2>

          <form onSubmit={handleSubmit(onSaveSummary)} className='space-y-6'>
            {/* FULL NAME + PHONE */}
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

            {/* SHIPPING ADDRESS */}
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

            {/* BILLING SAME AS SHIPPING */}
            <div className='flex items-center gap-2 mb-4'>
              <Checkbox id='sameAsShipping' {...register('sameAsShipping')} />
              <Label htmlFor='sameAsShipping' className='text-sm'>
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

            {/* PAYMENT METHOD */}
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
                        'flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border cursor-pointer',
                        field.value === 'delivery'
                          ? 'border-primary bg-primary/10'
                          : 'border-muted hover:border-primary/50'
                      )}
                    >
                      <HandCoins className='w-7 h-7' />
                      <span className='font-medium'>Cash On Delivery</span>
                    </div>

                    {/* ADVANCE */}
                    <div
                      onClick={() => field.onChange('pickup')}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border cursor-pointer',
                        field.value === 'pickup'
                          ? 'border-primary bg-primary/10'
                          : 'border-muted hover:border-primary/50'
                      )}
                    >
                      <Package className='w-7 h-7' />
                      <span className='font-medium'>Advance Payment</span>
                    </div>
                  </div>
                )}
              />
            </div>

            {/* TERMS */}
            <div className='flex items-start gap-2'>
              <Checkbox
                id='terms'
                onCheckedChange={(checked) =>
                  setValue('agreeToTerms', checked as boolean)
                }
              />
              <Label className='text-sm'>
                I agree to the Terms and Conditions.
              </Label>
            </div>

            {errors.agreeToTerms && (
              <p className='text-sm text-red-500'>
                {errors.agreeToTerms.message}
              </p>
            )}
          </form>
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className='lg:col-span-1 bg-white rounded-xl p-6 sticky top-12 h-fit shadow-sm border'>
          <h2 className='text-xl font-semibold mb-6'>Review your order</h2>

          <div className='space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2'>
            {carts.map((cart) => (
              <div key={cart.id} className='flex gap-4 border-b pb-4 last:border-0'>
                <div className='relative w-16 h-16 rounded-md overflow-hidden border flex-shrink-0'>
                  <Image
                    src={cart.thumbnail_url}
                    alt={cart.product_label}
                    fill
                    className='object-cover'
                  />
                </div>
                <div className='flex-1'>
                  <div className='flex justify-between items-start'>
                    <p className='font-medium text-sm line-clamp-2'>{cart.product_label}</p>
                    <span className='font-semibold text-sm whitespace-nowrap'>
                      ৳{cart.price_info.sale_price * cart.quantity}
                    </span>
                  </div>
                  <div className='text-xs text-muted-foreground mt-1 space-y-0.5'>
                    <p>Qty: {cart.quantity}</p>
                    <p>Size: {cart.size_name}</p>
                    {/* <p>Color: {cart.color}</p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='py-4 border-t space-y-3'>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Subtotal</span>
              <span className='font-medium'>৳{subtotal}</span>
            </div>

            {discountAmount > 0 && (
              <div className='flex justify-between text-sm text-green-600'>
                <span>Discount</span>
                <span className='font-medium'>-৳{discountAmount}</span>
              </div>
            )}

            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Delivery Charge</span>
              <span className='font-medium'>৳{deliveryCharge || 0}</span>
            </div>

            <div className='flex justify-between text-lg font-bold pt-2 border-t mt-2'>
              <span>Total Payable</span>
              <span className='text-primary'>৳{totalPayable}</span>
            </div>
          </div>

          <Button
            className='w-full mt-4'
            onClick={() =>
              handleSubmit(onPlaceOrder, (err) =>
                console.log('Validation failed', err)
              )()
            }
            disabled={isSubmitting}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
