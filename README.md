# Simple Donations System

A secure, lightweight donations platform built with Next.js, supporting both Stripe and PayPal payments without database dependencies.

## Features

- **Payment Methods**: Stripe (Cards, Apple Pay, Google Pay) and PayPal
- **Donation Types**: One-time donations (monthly recurring can be added)
- **Security**: Server-side validation, webhook verification, rate limiting
- **Email Receipts**: Automatic tax receipt emails for successful donations
- **Responsive Design**: Mobile-first UI with accessibility features
- **No Database**: Simplified architecture without database dependencies

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Payments**: Stripe & PayPal APIs
- **Validation**: Zod
- **Styling**: Tailwind CSS
- **Email**: Nodemailer

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Stripe Setup

1. Create a [Stripe account](https://dashboard.stripe.com/register)
2. Get your API keys from the [Developers section](https://dashboard.stripe.com/apikeys)
3. Set up webhooks:

```bash
# Install Stripe CLI
npm install -g stripe-cli

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret to your `.env` file.

### 4. PayPal Setup

1. Create a [PayPal Developer account](https://developer.paypal.com/)
2. Create a new app in the PayPal Developer Dashboard
3. Get your Client ID and Client Secret
4. Set up webhooks pointing to `https://yourdomain.com/api/webhooks/paypal`

### 5. Email Setup (Optional)

Configure SMTP settings in `.env` for receipt emails:

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
FROM_EMAIL="donations@yourorg.com"
ORG_NAME="Your Organization"
ORG_ADDRESS="123 Main St, City, State 12345"
```

### 6. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/donate` to test the donation form.

## Testing

### Test Cards

Use these test cards for Stripe:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

### PayPal Testing

Use PayPal sandbox accounts for testing PayPal payments.

## Deployment

### Environment Variables for Production

```env
APP_URL="https://yourdomain.com"
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
PAYPAL_CLIENT_ID="your_live_client_id"
PAYPAL_CLIENT_SECRET="your_live_client_secret"
PAYPAL_ENVIRONMENT="live"
```

### Webhook Endpoints

Set up these webhook endpoints in your payment providers:

- **Stripe**: `https://yourdomain.com/api/webhooks/stripe`
- **PayPal**: `https://yourdomain.com/api/webhooks/paypal`

## API Routes

- `POST /api/donations/create-intent` - Create Stripe PaymentIntent
- `POST /api/donations/create-paypal-order` - Create PayPal Order
- `POST /api/donations/capture-paypal-order` - Capture PayPal Order
- `POST /api/webhooks/stripe` - Handle Stripe webhooks
- `POST /api/webhooks/paypal` - Handle PayPal webhooks

## Security Features

- Server-side validation with Zod
- Rate limiting (10 requests/minute per IP)
- Webhook signature verification
- Input sanitization
- Secure payment processing (no client-side secrets)

## Pages

- `/donate` - Main donation form
- `/donate/success` - Success page with receipt confirmation
- `/donate/cancel` - Cancellation/failure page

## Compliance

- PCI DSS compliant (payments handled by Stripe/PayPal)
- Tax receipt generation
- Audit trail through webhook logs

## Support

For questions or issues:

- Email: support@yourorg.com

## License

MIT License