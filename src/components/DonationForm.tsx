import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { getStripePublishableKey, getPayPalClientId } from '@/lib/stripe'
import { DonationFormData, donationFormSchema } from '@/lib/validation/donation'
import { CreditCard, Heart, DollarSign } from 'lucide-react'

const stripePromise = loadStripe(getStripePublishableKey())

const presetAmounts = [5, 10, 25, 50, 100]

interface DonationFormProps {
  onSuccess?: () => void
}

export default function DonationForm({ onSuccess }: DonationFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe')
  const [formData, setFormData] = useState<DonationFormData>({
    amount: 25,
    frequency: 'ONE_TIME',
    donorName: '',
    donorEmail: '',
    message: '',
    isAnonymous: false,
    currency: 'USD',
  })
  const [customAmount, setCustomAmount] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAmountSelect = (amount: number) => {
    setFormData(prev => ({ ...prev, amount }))
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue > 0) {
      setFormData(prev => ({ ...prev, amount: numValue }))
    }
  }

  const handleInputChange = (field: keyof DonationFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const createPaymentIntent = async () => {
    try {
      setIsLoading(true)
      setError('')

      const validatedData = donationFormSchema.parse(formData)
      
      const response = await fetch('/api/donations/stripe/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      })

      if (!response.ok) {
        throw new Error('Failed to create payment intent')
      }

      const { clientSecret } = await response.json()
      setClientSecret(clientSecret)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const createPayPalOrder = async () => {
    try {
      setIsLoading(true)
      setError('')

      const validatedData = donationFormSchema.parse(formData)
      
      const response = await fetch('/api/donations/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      })

      if (!response.ok) {
        throw new Error('Failed to create PayPal order')
      }

      const { orderID } = await response.json()
      
      // Redirect to PayPal for approval
      window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${orderID}`
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden">
      <div className="bg-gradient-to-r from-sanctuary-blue to-sanctuary-purple text-white p-6">
        <div className="flex items-center space-x-3">
          <Heart className="w-8 h-8 text-sanctuary-gold" />
          <div>
            <h2 className="text-2xl font-bold">Support Our Mission</h2>
            <p className="text-sanctuary-linen">Help us continue providing biblical sanctuary education</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Amount Selection */}
        <div>
          <label className="block text-lg font-semibold text-sanctuary-purple mb-4">
            Donation Amount
          </label>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountSelect(amount)}
                className={`p-3 rounded-lg border-2 font-semibold transition-colors ${
                  formData.amount === amount && !customAmount
                    ? 'border-sanctuary-blue bg-sanctuary-blue text-white'
                    : 'border-sanctuary-silver text-sanctuary-purple hover:border-sanctuary-blue'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sanctuary-brass" />
            <input
              type="number"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-sanctuary-blue"
              min="1"
              max="10000"
            />
          </div>
        </div>

        {/* Frequency Selection */}
        <div>
          <label className="block text-lg font-semibold text-sanctuary-purple mb-4">
            Donation Frequency
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleInputChange('frequency', 'ONE_TIME')}
              className={`p-3 rounded-lg border-2 font-semibold transition-colors ${
                formData.frequency === 'ONE_TIME'
                  ? 'border-sanctuary-blue bg-sanctuary-blue text-white'
                  : 'border-sanctuary-silver text-sanctuary-purple hover:border-sanctuary-blue'
              }`}
            >
              One-time
            </button>
            <button
              onClick={() => handleInputChange('frequency', 'MONTHLY')}
              className={`p-3 rounded-lg border-2 font-semibold transition-colors ${
                formData.frequency === 'MONTHLY'
                  ? 'border-sanctuary-blue bg-sanctuary-blue text-white'
                  : 'border-sanctuary-silver text-sanctuary-purple hover:border-sanctuary-blue'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Donor Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-sanctuary-purple">Donor Information (Optional)</h3>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="anonymous"
              checked={formData.isAnonymous}
              onChange={(e) => handleInputChange('isAnonymous', e.target.checked)}
              className="w-4 h-4 text-sanctuary-blue"
            />
            <label htmlFor="anonymous" className="text-sanctuary-purple">
              Make this donation anonymous
            </label>
          </div>

          {!formData.isAnonymous && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.donorName}
                onChange={(e) => handleInputChange('donorName', e.target.value)}
                className="w-full p-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-sanctuary-blue"
              />
              <input
                type="email"
                placeholder="Email Address (for receipt)"
                value={formData.donorEmail}
                onChange={(e) => handleInputChange('donorEmail', e.target.value)}
                className="w-full p-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-sanctuary-blue"
              />
            </>
          )}

          <textarea
            placeholder="Optional message or dedication"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={3}
            maxLength={500}
            className="w-full p-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-sanctuary-blue"
          />
        </div>

        {/* Payment Method Selection */}
        <div>
          <label className="block text-lg font-semibold text-sanctuary-purple mb-4">
            Payment Method
          </label>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setPaymentMethod('stripe')}
              className={`p-4 rounded-lg border-2 font-semibold transition-colors flex items-center justify-center space-x-2 ${
                paymentMethod === 'stripe'
                  ? 'border-sanctuary-blue bg-sanctuary-blue text-white'
                  : 'border-sanctuary-silver text-sanctuary-purple hover:border-sanctuary-blue'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>Credit Card</span>
            </button>
            <button
              onClick={() => setPaymentMethod('paypal')}
              className={`p-4 rounded-lg border-2 font-semibold transition-colors flex items-center justify-center space-x-2 ${
                paymentMethod === 'paypal'
                  ? 'border-sanctuary-blue bg-sanctuary-blue text-white'
                  : 'border-sanctuary-silver text-sanctuary-purple hover:border-sanctuary-blue'
              }`}
            >
              <span>PayPal</span>
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Payment Forms */}
        {paymentMethod === 'stripe' && (
          <div className="space-y-4">
            {!clientSecret ? (
              <button
                onClick={createPaymentIntent}
                disabled={isLoading}
                className="w-full bg-sanctuary-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-sanctuary-blue-dark transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : `Donate $${formData.amount}`}
              </button>
            ) : (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <StripePaymentForm onSuccess={onSuccess} />
              </Elements>
            )}
          </div>
        )}

        {paymentMethod === 'paypal' && (
          <button
            onClick={createPayPalOrder}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : `Donate $${formData.amount} with PayPal`}
          </button>
        )}

        {/* Trust Indicators */}
        <div className="bg-sanctuary-linen rounded-lg p-4 text-center">
          <p className="text-sanctuary-brass text-sm">
            🔒 Your donation is secure and encrypted. We never store your payment information.
          </p>
        </div>
      </div>
    </div>
  )
}

function StripePaymentForm({ onSuccess }: { onSuccess?: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setError('')

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message || 'An error occurred')
      setIsLoading(false)
      return
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/donate/success`,
      },
    })

    if (confirmError) {
      setError(confirmError.message || 'Payment failed')
    } else {
      onSuccess?.()
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-sanctuary-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-sanctuary-blue-dark transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : 'Complete Donation'}
      </button>
    </form>
  )
}