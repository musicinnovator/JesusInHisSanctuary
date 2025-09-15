import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { sendReceiptEmail } from '@/lib/email'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    // Log webhook event
    await prisma.webhookEvent.create({
      data: {
        provider: 'STRIPE',
        eventType: event.type,
        payload: JSON.stringify(event),
      },
    })

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const donationId = paymentIntent.metadata.donationId

        if (donationId) {
          const donation = await prisma.donation.update({
            where: { id: donationId },
            data: { 
              status: 'SUCCEEDED',
              receiptUrl: paymentIntent.charges.data[0]?.receipt_url,
            },
          })

          // Send receipt email
          if (donation.donorEmail) {
            try {
              await sendReceiptEmail({
                to: donation.donorEmail,
                donorName: donation.donorName,
                amount: donation.amount,
                currency: donation.currency,
                transactionId: paymentIntent.id,
                method: 'Stripe',
                date: new Date(),
              })
            } catch (emailError) {
              console.error('Failed to send receipt email:', emailError)
            }
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

      case 'charge.dispute.created':
      case 'payment_intent.canceled': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const donationId = paymentIntent.metadata?.donationId

        if (donationId) {
          await prisma.donation.update({
            where: { id: donationId },
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
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}