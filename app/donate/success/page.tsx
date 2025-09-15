'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Mail, ArrowRight, Home } from 'lucide-react'

export default function DonateSuccessPage() {
  const searchParams = useSearchParams()
  const donationId = searchParams.get('donation_id')
  const orderId = searchParams.get('order_id')
  const [donation, setDonation] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you'd fetch the donation details
    // For now, we'll simulate the data
    setTimeout(() => {
      setDonation({
        id: donationId || orderId,
        amount: 2500, // $25.00
        frequency: 'ONE_TIME',
        method: donationId ? 'Stripe' : 'PayPal',
        donorEmail: 'donor@example.com',
      })
      setLoading(false)
    }, 1000)
  }, [donationId, orderId])

  if (loading) {
    return (
      <div className="min-h-screen bg-sanctuary-linen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Confirming your donation...</p>
        </div>
      </div>
    )
  }

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100)
  }

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
            <p className="text-green-100 text-lg">Your donation has been received</p>
          </div>

          {/* Donation Details */}
          <div className="p-8">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Donation Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(donation.amount)}
                    {donation.frequency === 'MONTHLY' && '/month'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold text-gray-900">{donation.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-sm text-gray-700">{donation.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold text-gray-900">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Receipt Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Receipt Sent</h3>
                  <p className="text-blue-700 text-sm">
                    A donation receipt has been sent to your email address for tax purposes. 
                    Please keep this for your records.
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Message */}
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                Your generous donation helps us provide comprehensive sanctuary doctrine resources 
                and educational materials to students and scholars worldwide. Thank you for 
                supporting our mission!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </Link>
              <Link
                href="/account/donations"
                className="flex-1 bg-gray-100 text-gray-700 text-center py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
              >
                <span>View Donations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Questions about your donation? Contact us at{' '}
            <a href="mailto:donations@sanctuarystudies.org" className="text-blue-600 hover:underline">
              donations@sanctuarystudies.org
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}