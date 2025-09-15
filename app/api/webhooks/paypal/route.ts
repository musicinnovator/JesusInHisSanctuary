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

    switch (body.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED': {
        const resource = body.resource
        const orderId = resource.supplementary_data?.related_ids?.order_id

        if (orderId) {
          const donation = await prisma.donation.findFirst({
            where: { externalId: orderId },
          })

          if (donation && donation.status === 'PENDING') {
            await prisma.donation.update({
              where: { id: donation.id },
              data: { status: 'SUCCEEDED' },
            })

            // Send receipt email
            if (donation.donorEmail) {
              try {
                await sendReceiptEmail({
                  to: donation.donorEmail,
                  donorName: donation.donorName,
                  amount: donation.amount,
                  currency: donation.currency,
                  transactionId: resource.id,
                  method: 'PayPal',
                  date: new Date(),
                })
              } catch (emailError) {
                console.error('Failed to send receipt email:', emailError)
              }
            }
          }
        }
        break
      }

      case 'PAYMENT.CAPTURE.DENIED':
      case 'PAYMENT.CAPTURE.DECLINED': {
        const resource = body.resource
        const orderId = resource.supplementary_data?.related_ids?.order_id

        if (orderId) {
          await prisma.donation.updateMany({
            where: { externalId: orderId },
            data: { status: 'FAILED' },
          })
        }
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
    console.error('Error processing PayPal webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}