import { NextRequest, NextResponse } from 'next/server'
import { paypalClient } from '@/lib/paypal'
import { prisma } from '@/lib/prisma'
import { donationFormSchema } from '@/lib/validation/donation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import checkoutNodeJssdk from '@paypal/checkout-server-sdk'

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
        method: 'PAYPAL',
        status: 'PENDING',
        isAnonymous: validatedData.isAnonymous,
        donorName: validatedData.donorName,
        donorEmail: validatedData.donorEmail,
        message: validatedData.message,
        externalId: '', // Will be updated with Order ID
      },
    })

    // Create PayPal order
    const orderRequest = new checkoutNodeJssdk.orders.OrdersCreateRequest()
    orderRequest.prefer('return=representation')
    orderRequest.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: validatedData.currency,
          value: validatedData.amount.toFixed(2),
        },
        description: `Donation to ${process.env.ORG_NAME || 'Sanctuary Studies'}`,
        custom_id: donation.id,
      }],
      application_context: {
        return_url: `${process.env.APP_URL}/donate/success`,
        cancel_url: `${process.env.APP_URL}/donate/cancel`,
        brand_name: process.env.ORG_NAME || 'Sanctuary Studies',
        user_action: 'PAY_NOW',
      },
    })

    const order = await paypalClient.execute(orderRequest)
    
    // Update donation with Order ID
    await prisma.donation.update({
      where: { id: donation.id },
      data: { externalId: order.result.id },
    })

    return NextResponse.json({
      orderID: order.result.id,
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