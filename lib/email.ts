import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendReceiptEmail({
  to,
  donorName,
  amount,
  currency,
  transactionId,
  method,
  date,
}: {
  to: string
  donorName?: string
  amount: number
  currency: string
  transactionId: string
  method: string
  date: Date
}) {
  const orgName = process.env.ORG_NAME || 'Your Organization'
  const orgAddress = process.env.ORG_ADDRESS || '123 Main St, City, State 12345'
  const fromEmail = process.env.FROM_EMAIL || 'donations@yourorg.com'

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100)

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Donation Receipt</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { padding: 20px; font-size: 12px; color: #666; }
        .amount { font-size: 24px; font-weight: bold; color: #4F46E5; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your Donation!</h1>
        </div>
        <div class="content">
          <p>Dear ${donorName || 'Donor'},</p>
          <p>Thank you for your generous donation to ${orgName}. Your support makes a difference!</p>
          
          <h3>Donation Details:</h3>
          <ul>
            <li><strong>Amount:</strong> <span class="amount">${formattedAmount}</span></li>
            <li><strong>Date:</strong> ${formattedDate}</li>
            <li><strong>Transaction ID:</strong> ${transactionId}</li>
            <li><strong>Payment Method:</strong> ${method}</li>
          </ul>
          
          <p>This email serves as your receipt for tax purposes. Please keep it for your records.</p>
          
          <p>If you have any questions about your donation, please contact us.</p>
          
          <p>With gratitude,<br>The ${orgName} Team</p>
        </div>
        <div class="footer">
          <p>${orgName}<br>${orgAddress}</p>
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `

  await transporter.sendMail({
    from: fromEmail,
    to,
    subject: `Donation Receipt - ${formattedAmount}`,
    html,
  })
}