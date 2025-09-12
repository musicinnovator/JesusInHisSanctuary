import React from 'react'
import Link from 'next/link'
import { XCircle, ArrowLeft, Heart } from 'lucide-react'

export default function DonateCancelPage() {
  return (
    <div className="min-h-screen bg-sanctuary-linen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 p-8">
          <div className="mb-6">
            <XCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-sanctuary-purple mb-2">Donation Cancelled</h1>
            <p className="text-xl text-sanctuary-brass">Your donation was not completed.</p>
          </div>

          <div className="bg-sanctuary-linen rounded-lg p-6 mb-6">
            <p className="text-sanctuary-brass leading-relaxed">
              No charges have been made to your account. If you experienced any issues during 
              the donation process, please don't hesitate to contact us for assistance.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <Link
              href="/donate"
              className="inline-flex items-center space-x-2 bg-sanctuary-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-sanctuary-blue-dark transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Try Again</span>
            </Link>
            
            <div className="text-center">
              <Link
                href="/"
                className="text-sanctuary-purple hover:text-sanctuary-blue transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-sanctuary-silver">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="w-5 h-5 text-sanctuary-scarlet" />
              <h3 className="font-semibold text-sanctuary-purple">Other Ways to Support</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-sanctuary-linen rounded-lg p-4">
                <h4 className="font-medium text-sanctuary-purple mb-2">Share Our Mission</h4>
                <p className="text-sanctuary-brass">
                  Help spread the word about our educational resources to your community.
                </p>
              </div>
              <div className="bg-sanctuary-linen rounded-lg p-4">
                <h4 className="font-medium text-sanctuary-purple mb-2">Volunteer</h4>
                <p className="text-sanctuary-brass">
                  Consider contributing your time and expertise to our educational initiatives.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-sanctuary-brass">
              Need help? Contact us at{' '}
              <a href="mailto:support@sanctuarystudies.org" className="text-sanctuary-blue hover:underline">
                support@sanctuarystudies.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}