import { z } from 'zod';

// ── Step 1: Customer info ──────────────────────────────────

export const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Enter a valid phone number')
    .max(14, 'Phone number too long')
    .regex(/^[0-9+\-\s]+$/, 'Invalid phone number'),
  email: z
    .string()
    .email('Invalid email address')
    .optional()
    .or(z.literal('')),
});

// ── Step 2: Delivery ───────────────────────────────────────

export const deliverySchema = z.object({
  district: z.string().min(1, 'Please select a district'),
  upazila:  z.string().min(1, 'Please select an upazila'),
  area:     z.string().min(2, 'Please enter your area'),
  address:  z.string().min(5, 'Please enter your full address'),
});

// ── Step 3: Payment ────────────────────────────────────────

export const paymentSchema = z.object({
  method:       z.enum(['cod', 'bkash', 'nagad']),
  bkashNumber:  z.string().optional(),
  nagadNumber:  z.string().optional(),
});

// ── Types ──────────────────────────────────────────────────

export type CustomerFormData = z.infer<typeof customerSchema>;
export type DeliveryFormData  = z.infer<typeof deliverySchema>;
export type PaymentFormData   = z.infer<typeof paymentSchema>;
