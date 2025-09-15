'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { donationSchema, customAmountSchema, type DonationFormData } from '@/lib/validations'
import { StripePaymentForm } from './StripePaymentForm'
import { PayPalPaymentForm } from './PayPalPaymentForm'
import { CreditCard, DollarSign } from 'lucide-react'

const presetAmounts = [500, 1000, 2500, 5000, 10000] // in cents

export function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number>(2500)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [useCustomAmount, setUseCustomAmount] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'STRIPE' | 'PAYPAL'>('STRIPE')
  const [isProcessing, setIsProcessing] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: selectedAmount,
      frequency: 'ONE_TIME',
      method: 'STRIPE',
      isAnonymous: false,
    },
  })

  const watchedFrequency = watch('frequency')
  const watchedIsAnonymous = watch('isAnonymous')

  const handleAmountChange = (amount: number) => {
    setSelectedAmount(amount)
    setUseCustomAmount(false)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setUseCustomAmount(true)
    const parsed = parseFloat(value)
    if (!isNaN(parsed)) {
      setSelectedAmount(Math.round(parsed * 100))
    }
  }

  const finalAmount = useCustomAmount && customAmount ? 
    Math.round(parseFloat(customAmount) * 100) : selectedAmount

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100)
  }

  return (
    <form className="space-y-8">
      {/* Amount Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Donation Amount
        </label>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handleAmountChange(amount)}
              className={`p-3 text-center rounded-lg border-2 transition-colors ${
                selectedAmount === amount && !useCustomAmount
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {formatCurrency(amount)}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="number"
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              useCustomAmount ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            min="1"
            max="1000000"
            step="0.01"
          />
        </div>
        {useCustomAmount && customAmount && (
          <p className="mt-2 text-sm text-gray-600">
            Custom amount: {formatCurrency(finalAmount)}
          </p>
        )}
      </div>

      {/* Frequency Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Donation Frequency
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="relative">
            <input
              {...register('frequency')}
              type="radio"
              value="ONE_TIME"
              className="sr-only"
            />
            <div className={`p-4 text-center rounded-lg border-2 cursor-pointer transition-colors ${
              watchedFrequency === 'ONE_TIME'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <div className="font-medium">One-time</div>
              <div className="text-sm text-gray-500">Single donation</div>
            </div>
          </label>
          <label className="relative">
            <input
              {...register('frequency')}
              type="radio"
              value="MONTHLY"
              className="sr-only"
            />
            <div className={`p-4 text-center rounded-lg border-2 cursor-pointer transition-colors ${
              watchedFrequency === 'MONTHLY'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <div className="font-medium">Monthly</div>
              <div className="text-sm text-gray-500">Recurring donation</div>
            </div>
          </label>
        </div>
      </div>

      {/* Donor Information */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            {...register('isAnonymous')}
            type="checkbox"
            id="anonymous"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="anonymous" className="text-sm font-medium text-gray-700">
            Make this donation anonymous
          </label>
        </div>

        {!watchedIsAnonymous && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="donorName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                {...register('donorName')}
                type="text"
                id="donorName"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="donorEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                {...register('donorEmail')}
                type="email"
                id="donorEmail"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
              />
              <p className="mt-1 text-xs text-gray-500">For donation receipt</p>
            </div>
          </div>
        )}

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message (Optional)
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Leave a message with your donation..."
            maxLength={500}
          />
        </div>
      </div>

      {/* Payment Method Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Payment Method
        </label>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setPaymentMethod('STRIPE')}
            className={`p-4 text-center rounded-lg border-2 transition-colors ${
              paymentMethod === 'STRIPE'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <CreditCard className="w-6 h-6 mx-auto mb-2" />
            <div className="font-medium">Card Payment</div>
            <div className="text-xs text-gray-500">Visa, Mastercard, Apple Pay</div>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('PAYPAL')}
            className={`p-4 text-center rounded-lg border-2 transition-colors ${
              paymentMethod === 'PAYPAL'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="w-6 h-6 mx-auto mb-2 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
              PP
            </div>
            <div className="font-medium">PayPal</div>
            <div className="text-xs text-gray-500">PayPal account</div>
          </button>
        </div>

        {/* Payment Forms */}
        {paymentMethod === 'STRIPE' ? (
          <StripePaymentForm
            amount={finalAmount}
            frequency={watchedFrequency}
            donorName={watch('donorName')}
            donorEmail={watch('donorEmail')}
            message={watch('message')}
            isAnonymous={watchedIsAnonymous}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
          />
        ) : (
          <PayPalPaymentForm
            amount={finalAmount}
            frequency={watchedFrequency}
            donorName={watch('donorName')}
            donorEmail={watch('donorEmail')}
            message={watch('message')}
            isAnonymous={watchedIsAnonymous}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
          />
        )}
      </div>
    </form>
  )
}