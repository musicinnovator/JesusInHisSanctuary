import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { donationSchema } from '@/lib/validations'
import { rateLimit, getClientIP } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`donation-${clientIP}`, 10, 60 * 1000)
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validatedData = donationSchema.parse(body)

    // Create donation record
    const donation = await prisma.donation.create({
      data: {
        amount: validatedData.amount,
        frequency: validatedData.frequency,
        method: validatedData.method,
        isAnonymous: validatedData.isAnonymous,
        donorName: validatedData.donorName,
        donorEmail: validatedData.donorEmail,
        message: validatedData.message,
        externalId: '', // Will be updated with PaymentIntent ID
        status: 'PENDING',
      },
    })

    if (validatedData.method === 'STRIPE') {
      // Create Stripe PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: validatedData.amount,
        currency: 'usd',
        metadata: {
          donationId: donation.id,
          frequency: validatedData.frequency,
        },
        receipt_email: validatedData.donorEmail,
        automatic_payment_methods: {
          enabled: true,
        },
      })

      // Update donation with PaymentIntent ID
      await prisma.donation.update({
        where: { id: donation.id },
        data: { externalId: paymentIntent.id },
      })

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        donationId: donation.id,
      })
    }

    return NextResponse.json({ donationId: donation.id })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}