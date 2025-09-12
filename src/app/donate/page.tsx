import React from 'react'
import DonationForm from '@/components/DonationForm'
import { ArrowLeft, Shield, Heart, Users } from 'lucide-react'
import Link from 'next/link'

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-sanctuary-linen">
      {/* Header */}
      <div className="bg-gradient-to-r from-sanctuary-blue to-sanctuary-purple text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-sanctuary-gold hover:text-sanctuary-gold-dark transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Support Our Mission</h1>
            <p className="text-xl text-sanctuary-linen max-w-3xl mx-auto">
              Your generous donation helps us continue providing comprehensive biblical sanctuary 
              education and research resources to students and scholars worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <DonationForm />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Impact Statement */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-xl font-bold text-sanctuary-purple mb-4 flex items-center space-x-2">
                <Heart className="w-6 h-6 text-sanctuary-scarlet" />
                <span>Your Impact</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sanctuary-blue rounded-full mt-2"></div>
                  <p className="text-sanctuary-brass">
                    <strong>$25</strong> provides access to digital library resources for 10 students
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sanctuary-gold rounded-full mt-2"></div>
                  <p className="text-sanctuary-brass">
                    <strong>$50</strong> supports development of new interactive 3D models
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sanctuary-scarlet rounded-full mt-2"></div>
                  <p className="text-sanctuary-brass">
                    <strong>$100</strong> funds educator resources and lesson plan development
                  </p>
                </div>
              </div>
            </div>

            {/* Security & Trust */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-xl font-bold text-sanctuary-purple mb-4 flex items-center space-x-2">
                <Shield className="w-6 h-6 text-sanctuary-blue" />
                <span>Secure & Trusted</span>
              </h3>
              <div className="space-y-3 text-sanctuary-brass">
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>SSL encrypted transactions</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>PCI DSS compliant processing</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>No payment info stored</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Tax-deductible receipts</span>
                </p>
              </div>
            </div>

            {/* Community */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-xl font-bold text-sanctuary-purple mb-4 flex items-center space-x-2">
                <Users className="w-6 h-6 text-sanctuary-gold" />
                <span>Join Our Community</span>
              </h3>
              <div className="space-y-3 text-sanctuary-brass">
                <p>Over <strong>10,000</strong> students and scholars worldwide</p>
                <p><strong>500+</strong> educational resources available</p>
                <p><strong>50+</strong> countries represented</p>
                <p><strong>24/7</strong> access to learning materials</p>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <details className="group">
                  <summary className="cursor-pointer font-medium text-sanctuary-purple group-open:text-sanctuary-blue">
                    Is my donation tax-deductible?
                  </summary>
                  <p className="mt-2 text-sanctuary-brass text-sm">
                    Yes, we are a registered non-profit organization. You will receive a tax receipt via email.
                  </p>
                </details>
                
                <details className="group">
                  <summary className="cursor-pointer font-medium text-sanctuary-purple group-open:text-sanctuary-blue">
                    Can I cancel my monthly donation?
                  </summary>
                  <p className="mt-2 text-sanctuary-brass text-sm">
                    Yes, you can cancel your monthly donation at any time through your account dashboard or by contacting us.
                  </p>
                </details>
                
                <details className="group">
                  <summary className="cursor-pointer font-medium text-sanctuary-purple group-open:text-sanctuary-blue">
                    How is my donation used?
                  </summary>
                  <p className="mt-2 text-sanctuary-brass text-sm">
                    Your donation directly supports content development, platform maintenance, and educational outreach programs.
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