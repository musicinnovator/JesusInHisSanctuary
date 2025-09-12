import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { donationFormSchema } from '@/lib/validation/donation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()
    
    // Validate input
    const validatedData = donationFormSchema.parse(body)
    
    // Create donation record
    const donation = await prisma.donation.create({
      data: {
        userId: session?.user?.id || null,
        amountCents: Math.round(validatedData.amount * 100),
        currency: validatedData.currency,
        frequency: validatedData.frequency,
        method: 'STRIPE',
        status: 'PENDING',
        isAnonymous: validatedData.isAnonymous,
        donorName: validatedData.donorName,
        donorEmail: validatedData.donorEmail,
        message: validatedData.message,
        externalId: '', // Will be updated with PaymentIntent ID
      },
    })

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(validatedData.amount * 100),
      currency: validatedData.currency.toLowerCase(),
      metadata: {
        donationId: donation.id,
        frequency: validatedData.frequency,
      },
      receipt_email: validatedData.donorEmail || undefined,
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
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}