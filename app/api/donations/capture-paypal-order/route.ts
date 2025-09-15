import { NextRequest, NextResponse } from 'next/server'
import { capturePayPalOrder } from '@/lib/paypal'
import { prisma } from '@/lib/prisma'
import { sendReceiptEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json()

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Capture the PayPal order
    const captureData = await capturePayPalOrder(orderId)

    // Find the donation record
    const donation = await prisma.donation.findFirst({
      where: { externalId: orderId },
    })

    if (!donation) {
      return NextResponse.json(
        { error: 'Donation not found' },
        { status: 404 }
      )
    }

    // Update donation status
    await prisma.donation.update({
      where: { id: donation.id },
      data: { status: 'SUCCEEDED' },
    })

    // Send receipt email if email provided
    if (donation.donorEmail) {
      try {
        await sendReceiptEmail({
          to: donation.donorEmail,
          donorName: donation.donorName,
          amount: donation.amount,
          currency: donation.currency,
          transactionId: orderId,
          method: 'PayPal',
          date: new Date(),
        })
      } catch (emailError) {
        console.error('Failed to send receipt email:', emailError)
      }
    }

    return NextResponse.json({ success: true, captureData })
  } catch (error) {
    console.error('Error capturing PayPal order:', error)
    return NextResponse.json(
      { error: 'Failed to capture PayPal order' },
      { status: 500 }
    )
  }
}