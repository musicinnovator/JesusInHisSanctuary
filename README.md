# Sanctuary Studies - Donations System

A secure, production-ready donations platform built with Next.js, supporting both Stripe and PayPal payments with comprehensive webhook handling and admin features.

## Features

- **Payment Methods**: Stripe (Cards, Apple Pay, Google Pay) and PayPal
- **Donation Types**: One-time and monthly recurring donations
- **Security**: Server-side validation, webhook verification, rate limiting, CSRF protection
- **Email Receipts**: Automatic tax receipt emails for successful donations
- **Admin Dashboard**: Donation management and CSV export
- **User Dashboard**: Personal donation history for authenticated users
- **Responsive Design**: Mobile-first UI with accessibility features

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Prisma with SQLite (dev) / PostgreSQL (prod)
- **Authentication**: NextAuth.js
- **Payments**: Stripe & PayPal APIs
- **Validation**: Zod
- **Styling**: Tailwind CSS
- **Email**: Nodemailer
- **Testing**: Playwright

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

### 2. Database Setup

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Seed admin user (optional)
npx prisma db seed
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

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
# Install Playwright
npx playwright install

# Run tests
npm run test:e2e
```

### Test Cards

Use these test cards for Stripe:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

## Deployment

### Environment Variables for Production

```env
DATABASE_URL="postgresql://user:password@host:port/database"
NEXTAUTH_URL="https://yourdomain.com"
APP_URL="https://yourdomain.com"
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

### Webhook Endpoints

Set up these webhook endpoints in your payment providers:

- **Stripe**: `https://yourdomain.com/api/webhooks/stripe`
- **PayPal**: `https://yourdomain.com/api/webhooks/paypal`

### Database Migration

```bash
# Generate and apply migrations
npx prisma migrate deploy
```

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
- CSRF protection on forms
- Input sanitization
- Secure payment processing (no client-side secrets)

## Admin Features

- View all donations with filters
- Export donations to CSV
- Manage recurring subscriptions
- View webhook event logs

## User Features

- Anonymous or named donations
- Custom donation amounts
- Monthly recurring donations
- Donation history (authenticated users)
- Email receipts
- Multiple payment methods

## Compliance

- PCI DSS compliant (payments handled by Stripe/PayPal)
- Tax receipt generation
- Audit trail for all transactions
- GDPR considerations for data handling

## Support

For questions or issues:

- Email: support@sanctuarystudies.org
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

## License

[Your License Here]