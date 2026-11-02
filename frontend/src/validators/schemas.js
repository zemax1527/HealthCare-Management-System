import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
    role: z.enum(['patient', 'doctor', 'healthcare_worker', 'admin'], {
      errorMap: () => ({ message: 'Please select a valid role' }),
    }),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must agree to the Terms of Service & Privacy Policy' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const appointmentBookingSchema = z.object({
  doctorId: z.string().min(1, 'Please select a physician'),
  date: z.string().min(1, 'Please select an appointment date'),
  timeSlot: z.string().min(1, 'Please select a time slot'),
  type: z.enum(['In-Person', 'Video Call', 'Follow-up', 'Lab Work']),
  reason: z.string().min(5, 'Please provide a brief reason for the consultation (min 5 chars)'),
});

export const prescriptionSchema = z.object({
  patientId: z.string().min(1, 'Please select a patient'),
  medicineName: z.string().min(2, 'Medicine name is required'),
  dosage: z.string().min(2, 'Dosage is required (e.g., 500mg, 10ml)'),
  frequency: z.string().min(2, 'Frequency is required (e.g., Twice daily)'),
  duration: z.string().min(2, 'Duration is required (e.g., 7 days, 1 month)'),
  instructions: z.string().min(5, 'Specific instructions are required'),
});

export const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  bloodType: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
});

