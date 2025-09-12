import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { sendReceiptEmail } from '@/lib/email'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Log webhook event
    await prisma.webhookEvent.create({
      data: {
        provider: 'STRIPE',
        eventType: event.type,
        payload: JSON.stringify(event),
      },
    })

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const donationId = paymentIntent.metadata.donationId
        
        if (donationId) {
          const donation = await prisma.donation.update({
            where: { id: donationId },
            data: { 
              status: 'SUCCEEDED',
              receiptUrl: paymentIntent.charges.data[0]?.receipt_url || null,
            },
          })
          
          // Send receipt email
          if (donation.donorEmail) {
            await sendReceiptEmail(donation)
          }
        }
        break
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const donationId = paymentIntent.metadata.donationId
        
        if (donationId) {
          await prisma.donation.update({
            where: { id: donationId },
            data: { status: 'FAILED' },
          })
        }
        break
      }
      
      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const paymentIntentId = charge.payment_intent as string
        
        const donation = await prisma.donation.findFirst({
          where: { externalId: paymentIntentId },
        })
        
        if (donation) {
          await prisma.donation.update({
            where: { id: donation.id },
            data: { status: 'REFUNDED' },
          })
        }
        break
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    // Mark webhook as processed
    await prisma.webhookEvent.updateMany({
      where: {
        provider: 'STRIPE',
        eventType: event.type,
        processedAt: null,
      },
      data: {
        processedAt: new Date(),
      },
    })

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}