JesusInHisSanctuary

## Sanctuary Intra Comparative Studies Website

A comprehensive, interactive platform exploring biblical sanctuary doctrine through immersive digital experiences, scholarly resources, and comparative learning tools.

### Features

- **Interactive 3D Sanctuary Explorer**: Historically accurate 3D models of biblical sanctuaries
- **Scripture Navigator**: Link biblical texts directly to 3D model components
- **Symbolism Mode**: Discover theological meaning behind every furnishing
- **Timeline Module**: Animated comparison of Aaron's and Jesus' ministry
- **Digital Library**: Curated scholarly resources and academic materials
- **Secure Donations**: Support our mission with Stripe and PayPal integration
- **Discussion Forums**: Moderated community dialogue and study groups
- **Educational Resources**: Teaching tools and lesson plans for ministry leaders

### Donation Feature Setup

This project includes a comprehensive donation system with Stripe and PayPal integration.

#### Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: Your database connection string
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `PAYPAL_CLIENT_ID`: Your PayPal client ID
- `PAYPAL_CLIENT_SECRET`: Your PayPal client secret
- `RESEND_API_KEY`: Your Resend API key for sending emails
- `NEXTAUTH_SECRET`: A random secret for NextAuth

#### Database Setup

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma client:
```bash
npx prisma generate
```

3. Run database migrations:
```bash
npx prisma migrate dev --name init
```

4. Seed the database:
```bash
npx prisma db seed
```

#### Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Set up webhooks:
   - For local development: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
   - For production: Add webhook endpoint in Stripe Dashboard pointing to `https://yourdomain.com/api/webhooks/stripe`
   - Select these events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`

#### PayPal Setup

1. Create a PayPal Developer account at https://developer.paypal.com
2. Create an application to get your Client ID and Secret
3. Set up webhooks in PayPal Developer Dashboard:
   - Webhook URL: `https://yourdomain.com/api/webhooks/paypal`
   - Select events: `PAYMENT.CAPTURE.COMPLETED`, `BILLING.SUBSCRIPTION.ACTIVATED`, `BILLING.SUBSCRIPTION.CANCELLED`

#### Email Setup (Resend)

1. Create a Resend account at https://resend.com
2. Get your API key from the Resend Dashboard
3. Verify your domain for sending emails

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Testing Donations

#### Stripe Test Cards
- Success: `4242424242424242`
- Decline: `4000000000000002`
- 3D Secure: `4000002500003155`

#### PayPal Sandbox
Use PayPal sandbox accounts for testing in the PayPal Developer Dashboard.

### Deployment

1. Set up your production environment variables
2. Configure your production database
3. Set up production webhooks for Stripe and PayPal
4. Deploy to your preferred platform (Vercel, Netlify, etc.)

### Security Features

- Server-side payment processing
- Webhook signature verification
- Input validation with Zod
- CSRF protection
- Rate limiting
- Secure environment variable handling

### Support

For questions or support, please contact us at support@sanctuarystudies.org