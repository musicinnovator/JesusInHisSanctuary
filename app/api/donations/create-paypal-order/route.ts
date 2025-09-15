import { NextRequest, NextResponse } from 'next/server'
import { createPayPalOrder } from '@/lib/paypal'
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

    if (validatedData.method !== 'PAYPAL') {
      return NextResponse.json(
        { error: 'Invalid payment method for this endpoint' },
        { status: 400 }
      )
    }

    // Create PayPal order
    const order = await createPayPalOrder(validatedData.amount)

    return NextResponse.json({
      orderId: order.id,
      donationData: validatedData,
    })
  } catch (error) {
    console.error('Error creating PayPal order:', error)
    return NextResponse.json(
      { error: 'Failed to create PayPal order' },
      { status: 500 }
    )
  }
}