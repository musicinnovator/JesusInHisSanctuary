'use client'

import { useState } from 'react'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface PayPalPaymentFormProps {
  amount: number
  frequency: 'ONE_TIME' | 'MONTHLY'
  donorName?: string
  donorEmail?: string
  message?: string
  isAnonymous: boolean
  isProcessing: boolean
  setIsProcessing: (processing: boolean) => void
}

export function PayPalPaymentForm({
  amount,
  frequency,
  donorName,
  donorEmail,
  message,
  isAnonymous,
  isProcessing,
  setIsProcessing,
}: PayPalPaymentFormProps) {
  const [{ isPending }] = usePayPalScriptReducer()
  const router = useRouter()
  const [error, setError] = useState<string>('')

  const createOrder = async () => {
    try {
      const response = await fetch('/api/donations/create-paypal-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          frequency,
          method: 'PAYPAL',
          isAnonymous,
          donorName: isAnonymous ? undefined : donorName,
          donorEmail: isAnonymous ? undefined : donorEmail,
          message,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create PayPal order')
      }

      const data = await response.json()
      return data.orderId
    } catch (error) {
      console.error('Error creating PayPal order:', error)
      setError('Failed to create PayPal order. Please try again.')
      throw error
    }
  }

  const onApprove = async (data: any) => {
    try {
      setIsProcessing(true)
      
      const response = await fetch('/api/donations/capture-paypal-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: data.orderID,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to capture PayPal order')
      }

      const result = await response.json()
      
      if (result.success) {
        router.push(`/donate/success?order_id=${data.orderID}`)
      } else {
        throw new Error('Payment capture failed')
      }
    } catch (error) {
      console.error('Error capturing PayPal order:', error)
      setError('Payment processing failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const onError = (error: any) => {
    console.error('PayPal error:', error)
    setError('PayPal payment failed. Please try again.')
    setIsProcessing(false)
  }

  const onCancel = () => {
    router.push('/donate/cancel')
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="ml-2">Loading PayPal...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="border border-gray-200 rounded-lg p-4">
        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'donate',
          }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          onCancel={onCancel}
          disabled={isProcessing}
        />
      </div>

      {isProcessing && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          <span className="text-sm text-gray-600">Processing your donation...</span>
        </div>
      )}

      <div className="text-xs text-gray-500 text-center">
        Your payment is secured by PayPal. We never store your payment details.
      </div>
    </div>
  )
}