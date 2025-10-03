import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';

const DonationBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-sanctuary-gold/10 to-sanctuary-brass/10 border-b border-sanctuary-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heart className="w-5 h-5 text-sanctuary-scarlet animate-pulse" />
            <div className="text-sm">
              <span className="text-sanctuary-purple font-medium">Help us keep this ministry alive! </span>
              <span className="text-sanctuary-brass">Your support helps maintain and expand these valuable sanctuary study resources.</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <a
                href="https://www.paypal.com/donate/?hosted_button_id=Z2T57WZMGV9UQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                PayPal
              </a>
              <a
                href="https://buy.stripe.com/eVq9AUaZD7aoeUE3MU4Vy00"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                Stripe
              </a>
            </div>
            
            <button
              onClick={() => setIsVisible(false)}
              className="text-sanctuary-brass hover:text-sanctuary-purple transition-colors p-1"
              aria-label="Close donation banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationBanner;