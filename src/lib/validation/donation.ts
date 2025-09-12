import { z } from 'zod'

export const donationFormSchema = z.object({
  amount: z.number().min(1, 'Amount must be at least $1').max(10000, 'Amount cannot exceed $10,000'),
  frequency: z.enum(['ONE_TIME', 'MONTHLY']),
  donorName: z.string().optional(),
  donorEmail: z.string().email('Invalid email address').optional(),
  message: z.string().max(500, 'Message cannot exceed 500 characters').optional(),
  isAnonymous: z.boolean().default(false),
  currency: z.string().default('USD'),
})

export const stripeWebhookSchema = z.object({
  id: z.string(),
  object: z.string(),
  type: z.string(),
  data: z.object({
    object: z.any(),
  }),
})

export const paypalWebhookSchema = z.object({
  id: z.string(),
  event_type: z.string(),
  resource: z.any(),
})

export type DonationFormData = z.infer<typeof donationFormSchema>