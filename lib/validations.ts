import { z } from 'zod'

export const donationSchema = z.object({
  amount: z.number().min(100, 'Minimum donation is $1.00').max(1000000, 'Maximum donation is $10,000'),
  frequency: z.enum(['ONE_TIME', 'MONTHLY']),
  method: z.enum(['STRIPE', 'PAYPAL']),
  isAnonymous: z.boolean().default(false),
  donorName: z.string().optional(),
  donorEmail: z.string().email().optional(),
  message: z.string().max(500).optional(),
})

export type DonationData = z.infer<typeof donationSchema>