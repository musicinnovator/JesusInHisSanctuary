import Link from 'next/link'
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'

export default function DonateCancelPage() {
  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Cancel Header */}
          <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-8 text-center">
            <XCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Donation Cancelled</h1>
            <p className="text-red-100 text-lg">Your donation was not processed</p>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            <p className="text-gray-600 text-lg mb-8">
              Your donation was cancelled and no payment was processed. 
              If this was unintentional, you can try again.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </Link>
              <Link
                href="/"
                className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Help Information */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Need help with your donation? Contact us at{' '}
            <a href="mailto:support@sanctuarystudies.org" className="text-blue-600 hover:underline">
              support@sanctuarystudies.org
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}