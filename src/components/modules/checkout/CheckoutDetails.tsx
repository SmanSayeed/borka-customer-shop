'use client';

import { createOrder } from '@/actions/order';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useCart from '@/hooks/useCart';
import { useDeliveryZones } from '@/hooks/useOrder';
import { cn } from '@/lib/utils';
import { ICartProduct } from '@/types/cart';
import { IZone } from '@/types/order';
import { ISize } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { HandCoins, Package } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import SearchableSelect from './SearchableSelect';

/* -------------------- ZOD SCHEMA -------------------- */
const checkoutFormSchema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  phoneNumber: z.string().min(1, 'Phone Number is required'),

  shippingAddress: z.object({
    address: z.string().min(1, 'Shipping Address is required'),
    area: z.string().min(1, 'Shipping Area is required'),
    zone_id: z.number().min(1, 'Zone ID is required'),
  }),

  billingAddress: z.object({
    address: z.string().min(1, 'Billing Address is required'),
    area: z.string().min(1, 'Billing Area is required'),
    zone_id: z.number().min(1, 'Zone ID is required'),
  }),

  notes: z.string().optional(),
  paymentMethod: z.string().min(1, 'Payment Method is required'),
  deliveryCharge: z.number().optional(),
});

export const defaultCheckoutForm = {
  fullName: '',
  phoneNumber: '',
  shippingAddress: { address: '', area: '', zone_id: 0 },
  billingAddress: { address: '', area: '', zone_id: 0 },
  deliveryCharge: 0,
  paymentMethod: '',
  notes: '',
};

type FormData = z.infer<typeof checkoutFormSchema>;

const CheckoutDetails = () => {
  const router = useRouter();
  const { cartDetails, clearCart } = useCart();
  const carts = cartDetails.products || [];

  const subtotal = cartDetails.cart_total || 0;
  const discountAmount = cartDetails.discount_amount || 0;

  const { data: zones = [] } = useDeliveryZones();

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

  const shippingAddress = watch('shippingAddress');
  const billingAddress = watch('billingAddress');
  const deliveryCharge = watch('deliveryCharge');

  const [totalPayable, setTotalPayable] = useState(0);

  useEffect(() => {
    const total = subtotal - discountAmount + Number(deliveryCharge || 0);

    setTotalPayable(total);
  }, [subtotal, discountAmount, deliveryCharge]);

  const handleAreaSelect = (
    type: 'shipping' | 'billing',
    areaLabel: string
  ) => {
    const selectedZone = zones.find((z: IZone) => z.label === areaLabel);

    if (!selectedZone) return;

    setValue(`${type}Address.area` as any, selectedZone.label);
    setValue(`${type}Address.zone_id` as any, Number(selectedZone.id));

    if (type === 'shipping') {
      setValue('deliveryCharge', Number(selectedZone.delivery_charge));
    }
  };

  const cartItems = carts.map((cart: ICartProduct) => ({
    product_id: cart.id,
    quantity: cart.quantity,
    size_id: cart.size_id,
    original_price: cart.price_info.original_price,
    discount_amount: cart.price_info.discount_amount || 0,
  }));

  const onPlaceOrder: SubmitHandler<FormData> = async (data) => {
    try {
      const orderPayload = {
        phone_number: data.phoneNumber,
        name: data.fullName,
        items: cartItems,
        shipping_address: { ...data.shippingAddress, name: data.fullName },
        billing_address: { ...data.billingAddress, name: data.fullName },
        notes: data.notes || '',
        delivery_charge: data.deliveryCharge,
        total_payable_amount: data.paymentMethod === 'pickup' ? 500 : 0,
        payment_method: data.paymentMethod,
      };

      const created = await createOrder(orderPayload);

      if (created?.success) {
        toast.success(created.message);
        
        console.log(created, 'in success');
        
        if (created.data?.gateway_status) {
          window.location.href = created.data.gateway_url;
        } else {
          router.push(
            `/success?order_number=${created.data.order_number}&phone_number=${created.data.phone_number}`
          );
        }
        clearCart();
      }
    } catch (err) {
      toast.error('Failed to place order');
      console.error(err);
    } finally {
      clearCart();
    }
  };

  return (
    <div className='container mx-auto mb-6 lg:mb-12'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 bg-white rounded-xl p-6 md:p-8'>
          <h2 className='text-xl font-semibold mb-6'>
            Shipping & Billing Information
          </h2>

          <form className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label>Full Name *</Label>
                <Input {...register('fullName')} />
                {errors.fullName && (
                  <p className='text-red-500 text-sm'>
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Phone Number *</Label>
                <Input {...register('phoneNumber')} />
                {errors.phoneNumber && (
                  <p className='text-red-500 text-sm'>
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label>Shipping Address *</Label>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <Input
                  placeholder='Address'
                  {...register('shippingAddress.address')}
                />

                <Controller
                  control={control}
                  name='shippingAddress.area'
                  render={({ field }) => (
                    <SearchableSelect
                      value={field.value}
                      items={zones.map((z: ISize) => z.label)}
                      placeholder='Select Area'
                      onChange={(val) => handleAreaSelect('shipping', val)}
                    />
                  )}
                />
              </div>

              {errors.shippingAddress?.area && (
                <p className='text-red-500 text-sm'>
                  {errors.shippingAddress.area.message}
                </p>
              )}
            </div>

            <div>
              <Label>Billing Address *</Label>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <Input
                  placeholder='Address'
                  {...register('billingAddress.address')}
                />

                <Controller
                  control={control}
                  name='billingAddress.area'
                  render={({ field }) => (
                    <SearchableSelect
                      value={field.value}
                      items={zones.map((z: ISize) => z.label)}
                      placeholder='Select Area'
                      onChange={(val) => handleAreaSelect('billing', val)}
                    />
                  )}
                />
              </div>

              {errors.billingAddress?.area && (
                <p className='text-red-500 text-sm'>
                  {errors.billingAddress.area.message}
                </p>
              )}
            </div>

            {/* NOTES */}
            <div>
              <Label>Notes</Label>
              <Textarea className='h-24' {...register('notes')} />
            </div>

            <div>
              <Label>Payment Method</Label>
              <Controller
                control={control}
                name='paymentMethod'
                render={({ field }) => (
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div
                      onClick={() => field.onChange('delivery')}
                      className={cn(
                        'flex items-center gap-2 p-4 rounded-lg border cursor-pointer',
                        field.value === 'delivery'
                          ? 'border-primary bg-primary/10'
                          : 'border-muted hover:border-primary/50'
                      )}
                    >
                      <HandCoins className='w-6 h-6' />
                      Cash On Delivery
                    </div>

                    <div
                      onClick={() => field.onChange('pickup')}
                      className={cn(
                        'flex items-center gap-2 p-4 rounded-lg border cursor-pointer',
                        field.value === 'pickup'
                          ? 'border-primary bg-primary/10'
                          : 'border-muted hover:border-primary/50'
                      )}
                    >
                      <Package className='w-6 h-6' />
                      Advance Payment
                    </div>
                  </div>
                )}
              />
            </div>
          </form>
        </div>

        <div className='lg:col-span-1 bg-white rounded-xl p-6 sticky top-12 h-fit'>
          <h2 className='text-xl font-semibold mb-6'>Review your order</h2>

          <div className='space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2'>
            {carts.map((cart: ICartProduct) => (
              <div key={cart.id} className='flex gap-4 border-b pb-4'>
                <div className='w-16 h-16 relative rounded-md overflow-hidden border'>
                  <Image
                    src={cart.thumbnail_url}
                    alt={cart.product_label}
                    fill
                    className='object-cover'
                  />
                </div>

                <div className='flex-1'>
                  <div className='flex justify-between'>
                    <p className='text-sm font-medium line-clamp-2'>
                      {cart.product_label}
                    </p>
                    <span className='text-sm font-semibold'>
                      ৳{cart.price_info.sale_price * cart.quantity}
                    </span>
                  </div>

                  <p className='text-xs text-muted-foreground'>
                    Qty: {cart.quantity} | Size: {cart.size_name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className='space-y-2 border-t pt-4'>
            <div className='flex justify-between text-sm'>
              <span>Subtotal</span>
              <span>৳{subtotal}</span>
            </div>

            {discountAmount > 0 && (
              <div className='flex justify-between text-sm text-green-600'>
                <span>Discount</span>
                <span>-৳{discountAmount}</span>
              </div>
            )}

            <div className='flex justify-between text-sm'>
              <span>Delivery Charge</span>
              <span>৳{deliveryCharge ?? 0}</span>
            </div>

            <div className='flex justify-between text-lg font-bold border-t pt-2'>
              <span>Total</span>
              <span className='text-primary'>৳{totalPayable}</span>
            </div>
          </div>

          <Button
            className='w-full mt-4'
            disabled={isSubmitting}
            onClick={handleSubmit(onPlaceOrder)}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
