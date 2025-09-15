import { NextRequest, NextResponse } from 'next/server'
import { createPayPalOrder } from '@/lib/paypal'
import { prisma } from '@/lib/prisma'
import { donationSchema } from '@/lib/validations'
import { rateLimit, getClientIP } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`paypal-${clientIP}`, 10, 60 * 1000)
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validatedData = donationSchema.parse(body)

    // Create PayPal order
    const order = await createPayPalOrder(validatedData.amount)

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
        externalId: order.id,
        status: 'PENDING',
      },
    })

    return NextResponse.json({
      orderId: order.id,
      donationId: donation.id,
    })
  } catch (error) {
    console.error('Error creating PayPal order:', error)
    return NextResponse.json(
      { error: 'Failed to create PayPal order' },
      { status: 500 }
    )
  }
}