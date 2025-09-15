'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { DonationForm } from '@/components/DonationForm'
import { getStripePublishableKey, getPayPalClientId } from '@/lib/stripe'
import { Heart, Shield, Lock, Users } from 'lucide-react'

const stripePromise = loadStripe(getStripePublishableKey())

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-sanctuary-linen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
          <h1 className="text-4xl font-bold mb-4">Support Our Mission</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Your generous donation helps us provide comprehensive sanctuary doctrine resources 
            and educational materials to students and scholars worldwide.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Make a Donation</h2>
                <p className="text-gray-600 mt-1">Choose your donation amount and payment method</p>
              </div>
              
              <div className="p-6">
                <Elements stripe={stripePromise}>
                  <PayPalScriptProvider options={{ 
                    clientId: getPayPalClientId(),
                    currency: 'USD',
                    intent: 'capture'
                  }}>
                    <DonationForm />
                  </PayPalScriptProvider>
                </Elements>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trust Indicators */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Secure & Trusted</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">SSL Encrypted</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">PCI Compliant</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Trusted by 1000+ donors</span>
                </div>
              </div>
            </div>

            {/* Impact */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Impact</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="font-semibold text-blue-900">$25</div>
                  <div className="text-sm text-gray-600">Provides access to digital resources for 5 students</div>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <div className="font-semibold text-purple-900">$50</div>
                  <div className="text-sm text-gray-600">Supports development of new interactive content</div>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="font-semibold text-green-900">$100</div>
                  <div className="text-sm text-gray-600">Funds research and scholarly publications</div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <details className="group">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                    Is my donation tax-deductible?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600">
                    Yes, we are a registered non-profit organization. You will receive a receipt for tax purposes.
                  </p>
                </details>
                <details className="group">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                    How is my donation used?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600">
                    Your donation directly supports our educational mission, including content development, 
                    research, and platform maintenance.
                  </p>
                </details>
                <details className="group">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                    Can I cancel my recurring donation?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600">
                    Yes, you can cancel your recurring donation at any time from your account dashboard 
                    or by contacting us.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}