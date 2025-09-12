import checkoutNodeJssdk from '@paypal/checkout-server-sdk'

if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
  throw new Error('PayPal credentials are not set')
}

const environment = process.env.PAYPAL_ENVIRONMENT === 'live' 
  ? new checkoutNodeJssdk.core.LiveEnvironment(
      process.env.PAYPAL_CLIENT_ID,
      process.env.PAYPAL_CLIENT_SECRET
    )
  : new checkoutNodeJssdk.core.SandboxEnvironment(
      process.env.PAYPAL_CLIENT_ID,
      process.env.PAYPAL_CLIENT_SECRET
    )

export const paypalClient = new checkoutNodeJssdk.core.PayPalHttpClient(environment)

export const getPayPalClientId = () => {
  if (!process.env.PAYPAL_CLIENT_ID) {
    throw new Error('PAYPAL_CLIENT_ID is not set')
  }
  return process.env.PAYPAL_CLIENT_ID
}