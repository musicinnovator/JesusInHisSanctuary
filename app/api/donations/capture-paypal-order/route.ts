import { NextRequest, NextResponse } from 'next/server'
import { capturePayPalOrder } from '@/lib/paypal'
import { sendReceiptEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { orderId, donationData } = await request.json()

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Capture the PayPal order
    const captureData = await capturePayPalOrder(orderId)

    // Send receipt email if email provided
    if (donationData?.donorEmail && !donationData.isAnonymous) {
      try {
        await sendReceiptEmail({
          to: donationData.donorEmail,
          donorName: donationData.donorName,
          amount: donationData.amount,
          currency: 'usd',
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