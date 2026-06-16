import { z } from 'zod';

export const loginSchema = z.object({
  email:    z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z
  .object({
    name:            z.string().min(2, 'Name must be at least 2 characters'),
    email:           z.string().email('Invalid email address'),
    password:        z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine(d => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const profileSchema = z.object({
  name:  z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Enter a valid phone number')
    .optional()
    .or(z.literal('')),
});

export const addressSchema = z.object({
  label:    z.string().min(1, 'Please enter a label (e.g. Home, Office)'),
  name:     z.string().min(2, 'Name is required'),
  phone:    z.string().min(10, 'Enter a valid phone number'),
  district: z.string().min(1, 'Select a district'),
  upazila:  z.string().min(1, 'Select an upazila'),
  area:     z.string().min(2, 'Enter your area'),
  address:  z.string().min(5, 'Enter your full address'),
});

export type LoginFormData    = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProfileFormData  = z.infer<typeof profileSchema>;
export type AddressFormData  = z.infer<typeof addressSchema>;
