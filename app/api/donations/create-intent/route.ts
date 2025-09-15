import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
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

    if (validatedData.method !== 'STRIPE') {
      return NextResponse.json(
        { error: 'Invalid payment method for this endpoint' },
        { status: 400 }
      )
    }

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: validatedData.amount,
      currency: 'usd',
      metadata: {
        frequency: validatedData.frequency,
        donorName: validatedData.donorName || 'Anonymous',
        donorEmail: validatedData.donorEmail || '',
        message: validatedData.message || '',
        isAnonymous: validatedData.isAnonymous.toString(),
      },
      receipt_email: validatedData.donorEmail,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}