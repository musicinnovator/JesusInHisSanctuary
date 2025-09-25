import { NextRequest, NextResponse } from 'next/server'
import { sendReceiptEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('PayPal webhook received:', body.event_type)

    switch (body.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED': {
        const resource = body.resource
        console.log('Payment capture completed:', resource.id)
        
        // Note: Without database, we can't retrieve original donation data
        // Receipt email would need to be sent during the capture process
        break
      }

      case 'PAYMENT.CAPTURE.DENIED':
      case 'PAYMENT.CAPTURE.DECLINED': {
        const resource = body.resource
        console.log('Payment capture failed:', resource.id)
        break
      }

      default:
        console.log(`Unhandled PayPal event type: ${body.event_type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing PayPal webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}