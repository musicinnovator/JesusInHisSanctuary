'use client'

import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface StripePaymentFormProps {
  amount: number
  frequency: 'ONE_TIME' | 'MONTHLY'
  donorName?: string
  donorEmail?: string
  message?: string
  isAnonymous: boolean
  isProcessing: boolean
  setIsProcessing: (processing: boolean) => void
}

export function StripePaymentForm({
  amount,
  frequency,
  donorName,
  donorEmail,
  message,
  isAnonymous,
  isProcessing,
  setIsProcessing,
}: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [clientSecret, setClientSecret] = useState<string>('')
  const [paymentIntentId, setPaymentIntentId] = useState<string>('')
  const [error, setError] = useState<string>('')

  const createPaymentIntent = async () => {
    try {
      const response = await fetch('/api/donations/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          frequency,
          method: 'STRIPE',
          isAnonymous,
          donorName: isAnonymous ? undefined : donorName,
          donorEmail: isAnonymous ? undefined : donorEmail,
          message,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create payment intent')
      }

      const data = await response.json()
      setClientSecret(data.clientSecret)
      setPaymentIntentId(data.paymentIntentId)
    } catch (error) {
      console.error('Error creating payment intent:', error)
      setError('Failed to initialize payment. Please try again.')
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      if (!clientSecret) {
        await createPaymentIntent()
        return
      }

      const { error: submitError } = await elements.submit()
      if (submitError) {
        setError(submitError.message || 'Payment failed')
        return
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/donate/success?payment_intent=${paymentIntentId}&amount=${amount}`,
        },
      })

      if (confirmError) {
        setError(confirmError.message || 'Payment failed')
      }
    } catch (error) {
      console.error('Payment error:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (!clientSecret) {
    return (
      <div className="space-y-4">
        <button
          onClick={createPaymentIntent}
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Initializing...</span>
            </>
          ) : (
            <span>Continue to Payment</span>
          )}
        </button>
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border border-gray-200 rounded-lg">
        <PaymentElement />
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <span>
            Donate {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(amount / 100)}
            {frequency === 'MONTHLY' ? '/month' : ''}
          </span>
        )}
      </button>

      <div className="text-xs text-gray-500 text-center">
        Your payment is secured by Stripe. We never store your card details.
      </div>
    </form>
  )
}