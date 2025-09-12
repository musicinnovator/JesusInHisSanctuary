import React from 'react'
import Link from 'next/link'
import { CheckCircle, Heart, ArrowRight, Mail } from 'lucide-react'

export default function DonateSuccessPage() {
  return (
    <div className="min-h-screen bg-sanctuary-linen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 p-8">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-sanctuary-purple mb-2">Thank You!</h1>
            <p className="text-xl text-sanctuary-brass">Your donation has been successfully processed.</p>
          </div>

          <div className="bg-sanctuary-linen rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="w-6 h-6 text-sanctuary-scarlet" />
              <h2 className="text-lg font-semibold text-sanctuary-purple">Your Generous Support</h2>
            </div>
            <p className="text-sanctuary-brass leading-relaxed">
              Your contribution helps us continue providing comprehensive biblical sanctuary education 
              and research resources to students and scholars worldwide. Together, we're advancing 
              understanding of God's sanctuary and His plan of salvation.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center space-x-2 text-sanctuary-brass">
              <Mail className="w-5 h-5" />
              <span>A receipt has been sent to your email address</span>
            </div>
            <p className="text-sm text-sanctuary-brass">
              Please keep this receipt for your tax records. If you don't receive it within a few minutes, 
              please check your spam folder.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-sanctuary-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-sanctuary-blue-dark transition-colors"
            >
              <span>Continue Exploring</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <div className="text-center">
              <Link
                href="/account/donations"
                className="text-sanctuary-purple hover:text-sanctuary-blue transition-colors"
              >
                View your donation history
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-sanctuary-silver">
            <h3 className="font-semibold text-sanctuary-purple mb-3">What's Next?</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-sanctuary-linen rounded-lg p-4">
                <h4 className="font-medium text-sanctuary-purple mb-2">Explore Our Resources</h4>
                <p className="text-sanctuary-brass">
                  Discover our interactive 3D models, digital library, and educational materials.
                </p>
              </div>
              <div className="bg-sanctuary-linen rounded-lg p-4">
                <h4 className="font-medium text-sanctuary-purple mb-2">Join Our Community</h4>
                <p className="text-sanctuary-brass">
                  Connect with fellow students and scholars in our discussion forums.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}