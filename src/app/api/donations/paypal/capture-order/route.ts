import { NextRequest, NextResponse } from 'next/server'
import { paypalClient } from '@/lib/paypal'
import { prisma } from '@/lib/prisma'
import checkoutNodeJssdk from '@paypal/checkout-server-sdk'

export async function POST(request: NextRequest) {
  try {
    const { orderID } = await request.json()
    
    if (!orderID) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Capture the PayPal order
    const captureRequest = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID)
    captureRequest.requestBody({})
    
    const capture = await paypalClient.execute(captureRequest)
    
    if (capture.result.status === 'COMPLETED') {
      // Find and update the donation
      const donation = await prisma.donation.findFirst({
        where: { externalId: orderID },
      })
      
      if (donation) {
        await prisma.donation.update({
          where: { id: donation.id },
          data: { status: 'SUCCEEDED' },
        })
      }
      
      return NextResponse.json({
        success: true,
        captureID: capture.result.id,
      })
    } else {
      return NextResponse.json(
        { error: 'Payment capture failed' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error capturing PayPal order:', error)
    return NextResponse.json(
      { error: 'Failed to capture PayPal order' },
      { status: 500 }
    )
  }
}