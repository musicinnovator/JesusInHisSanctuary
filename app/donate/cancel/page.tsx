import Link from 'next/link'
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'

export default function DonateCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Cancel Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8 text-center">
            <XCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Donation Cancelled</h1>
            <p className="text-red-100 text-lg">Your donation was not completed</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What happened?</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Your donation was cancelled or failed to process. This could happen for several reasons:
              </p>
              <ul className="text-left text-gray-600 space-y-2 mb-6">
                <li>• You cancelled the payment process</li>
                <li>• Your payment method was declined</li>
                <li>• There was a technical issue</li>
                <li>• The payment timed out</li>
              </ul>
              <p className="text-gray-600">
                Don't worry - no charges were made to your account.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/donate"
                className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </Link>
              <Link
                href="/"
                className="flex-1 bg-gray-100 text-gray-700 text-center py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Support Information */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Need help with your donation? Contact us at{' '}
            <a href="mailto:support@yourorg.com" className="text-blue-600 hover:underline">
              support@yourorg.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}