import { z } from 'zod'

export const donationSchema = z.object({
  amount: z.number().min(100, 'Minimum donation is $1.00').max(100000000, 'Maximum donation is $1,000,000'),
  frequency: z.enum(['ONE_TIME', 'MONTHLY']),
  method: z.enum(['STRIPE', 'PAYPAL']),
  isAnonymous: z.boolean().default(false),
  donorName: z.string().optional(),
  donorEmail: z.string().email().optional(),
  message: z.string().max(500, 'Message must be less than 500 characters').optional(),
})

export const customAmountSchema = z.object({
  customAmount: z.string().refine((val) => {
    const num = parseFloat(val)
    return !isNaN(num) && num >= 1 && num <= 1000000
  }, 'Please enter a valid amount between $1 and $1,000,000'),
})

export type DonationFormData = z.infer<typeof donationSchema>