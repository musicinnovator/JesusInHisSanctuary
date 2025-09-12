import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendReceiptEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Log webhook event
    await prisma.webhookEvent.create({
      data: {
        provider: 'PAYPAL',
        eventType: body.event_type,
        payload: JSON.stringify(body),
      },
    })

    // Handle the event
    switch (body.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED': {
        const resource = body.resource
        const customId = resource.custom_id
        
        if (customId) {
          const donation = await prisma.donation.update({
            where: { id: customId },
            data: { status: 'SUCCEEDED' },
          })
          
          // Send receipt email
          if (donation.donorEmail) {
            await sendReceiptEmail(donation)
          }
        }
        break
      }
      
      case 'BILLING.SUBSCRIPTION.ACTIVATED': {
        const resource = body.resource
        // Handle subscription activation
        console.log('PayPal subscription activated:', resource.id)
        break
      }
      
      case 'BILLING.SUBSCRIPTION.CANCELLED': {
        const resource = body.resource
        // Handle subscription cancellation
        console.log('PayPal subscription cancelled:', resource.id)
        break
      }
      
      default:
        console.log(`Unhandled PayPal event type: ${body.event_type}`)
    }

    // Mark webhook as processed
    await prisma.webhookEvent.updateMany({
      where: {
        provider: 'PAYPAL',
        eventType: body.event_type,
        processedAt: null,
      },
      data: {
        processedAt: new Date(),
      },
    })

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('PayPal webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}