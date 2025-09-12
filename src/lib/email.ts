import { Resend } from 'resend'
import { Donation } from '@prisma/client'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set')
}

const resend = new Resend(process.env.RESEND_API_KEY)

const ORG_NAME = process.env.ORG_NAME || 'Sanctuary Intra Comparative Studies'
const ORG_ADDRESS = process.env.ORG_ADDRESS || '123 Study Lane, Research City, RC 12345'
const ORG_EMAIL = process.env.ORG_EMAIL || 'donations@sanctuarystudies.org'

export async function sendReceiptEmail(donation: Donation) {
  if (!donation.donorEmail) {
    console.log('No donor email provided for donation:', donation.id)
    return
  }

  const amount = (donation.amountCents / 100).toFixed(2)
  const date = donation.createdAt.toLocaleDateString()
  const method = donation.method === 'STRIPE' ? 'Credit Card' : 'PayPal'

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Donation Receipt</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4169E1; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { padding: 20px; font-size: 12px; color: #666; }
        .amount { font-size: 24px; font-weight: bold; color: #4169E1; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${ORG_NAME}</h1>
          <p>Thank you for your generous donation!</p>
        </div>
        <div class="content">
          <h2>Donation Receipt</h2>
          <p><strong>Amount:</strong> <span class="amount">$${amount} USD</span></p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Transaction ID:</strong> ${donation.externalId}</p>
          <p><strong>Payment Method:</strong> ${method}</p>
          <p><strong>Frequency:</strong> ${donation.frequency === 'ONE_TIME' ? 'One-time' : 'Monthly recurring'}</p>
          
          ${donation.message ? `<p><strong>Your Message:</strong><br>${donation.message}</p>` : ''}
          
          <p>Your donation helps support our mission to provide comprehensive biblical sanctuary education and research resources.</p>
          
          <p><strong>Important:</strong> Please keep this receipt for your tax records. ${ORG_NAME} is a registered non-profit organization.</p>
        </div>
        <div class="footer">
          <p>${ORG_NAME}<br>
          ${ORG_ADDRESS}<br>
          Email: ${ORG_EMAIL}</p>
          
          <p><em>This is an automated receipt. Please do not reply to this email.</em></p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    await resend.emails.send({
      from: `${ORG_NAME} <${ORG_EMAIL}>`,
      to: donation.donorEmail,
      subject: `Donation Receipt - $${amount}`,
      html: emailHtml,
    })
    
    console.log('Receipt email sent successfully for donation:', donation.id)
  } catch (error) {
    console.error('Failed to send receipt email:', error)
  }
}