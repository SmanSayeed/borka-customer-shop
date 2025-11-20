import z from 'zod';

export const checkoutFormSchema = z.object({
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
