import z from 'zod';

export const checkoutFormSchema = z.object({
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
