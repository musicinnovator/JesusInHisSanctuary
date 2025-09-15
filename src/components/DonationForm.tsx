import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from './StripePaymentForm';
import PayPalPaymentForm from './PayPalPaymentForm';
import { CreditCard, DollarSign } from 'lucide-react';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const PRESET_AMOUNTS = [5, 10, 25, 50, 100];

export default function DonationForm() {
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    message: '',
    anonymous: false
  });

  const finalAmount = customAmount ? parseFloat(customAmount) : amount;

  const handlePresetAmount = (presetAmount: number) => {
    setAmount(presetAmount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    if (value) {
      setAmount(0);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Amount Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Donation Amount (USD)
        </label>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {PRESET_AMOUNTS.map((presetAmount) => (
            <button
              key={presetAmount}
              onClick={() => handlePresetAmount(presetAmount)}
              className={`p-3 rounded-lg border-2 font-medium transition-colors ${
                amount === presetAmount && !customAmount
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              ${presetAmount}
            </button>
          ))}
        </div>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="number"
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            step="0.01"
          />
        </div>
      </div>

      {/* Frequency Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Frequency
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setFrequency('one-time')}
            className={`p-3 rounded-lg border-2 font-medium transition-colors ${
              frequency === 'one-time'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            One-time
          </button>
          <button
            onClick={() => setFrequency('monthly')}
            className={`p-3 rounded-lg border-2 font-medium transition-colors ${
              frequency === 'monthly'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Donor Information */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Donor Information (Optional)
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={donorInfo.anonymous}
              onChange={(e) => setDonorInfo(prev => ({ ...prev, anonymous: e.target.checked }))}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">Anonymous</span>
          </label>
        </div>
        
        {!donorInfo.anonymous && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={donorInfo.name}
              onChange={(e) => setDonorInfo(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={donorInfo.email}
              onChange={(e) => setDonorInfo(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <textarea
              placeholder="Message (Optional)"
              value={donorInfo.message}
              onChange={(e) => setDonorInfo(prev => ({ ...prev, message: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Payment Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setPaymentMethod('stripe')}
            className={`p-4 rounded-lg border-2 font-medium transition-colors flex items-center justify-center ${
              paymentMethod === 'stripe'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Card
          </button>
          <button
            onClick={() => setPaymentMethod('paypal')}
            className={`p-4 rounded-lg border-2 font-medium transition-colors flex items-center justify-center ${
              paymentMethod === 'paypal'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            PayPal
          </button>
        </div>
      </div>

      {/* Payment Forms */}
      {finalAmount > 0 && (
        <div className="border-t pt-6">
          {paymentMethod === 'stripe' ? (
            <Elements stripe={stripePromise}>
              <StripePaymentForm
                amount={finalAmount}
                frequency={frequency}
                donorInfo={donorInfo}
              />
            </Elements>
          ) : (
            <PayPalPaymentForm
              amount={finalAmount}
              frequency={frequency}
              donorInfo={donorInfo}
            />
          )}
        </div>
      )}

      {/* Trust Indicators */}
      <div className="mt-6 pt-6 border-t">
        <div className="text-center text-sm text-gray-500">
          <p className="mb-2">🔒 Your payment information is secure and encrypted</p>
          <p>We never store your payment details</p>
        </div>
      </div>
    </div>
  );
}