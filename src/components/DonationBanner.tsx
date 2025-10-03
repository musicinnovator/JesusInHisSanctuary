import React, { useState } from 'react';
import { Heart, X, Gift } from 'lucide-react';

const DonationBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-sanctuary-gold/15 via-sanctuary-brass/10 to-sanctuary-gold/15 border-b border-sanctuary-gold/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sanctuary-scarlet/10 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-sanctuary-scarlet animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-sanctuary-purple">Support This Ministry</h3>
                <p className="text-sanctuary-brass text-sm">Help us keep this sanctuary study resource free and accessible worldwide</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:block text-center">
              <p className="text-sanctuary-purple font-medium text-sm mb-1">Your support helps us:</p>
              <div className="flex items-center space-x-4 text-xs text-sanctuary-brass">
                <span>• Maintain servers</span>
                <span>• Add new content</span>
                <span>• Keep it free</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <a
                href="https://www.paypal.com/donate/?hosted_button_id=Z2T57WZMGV9UQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                <Gift className="w-4 h-4" />
                <span>PayPal</span>
              </a>
              <a
                href="https://buy.stripe.com/eVq9AUaZD7aoeUE3MU4Vy00"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                <Gift className="w-4 h-4" />
                <span>Stripe</span>
              </a>
            </div>
            
            <button
              onClick={() => setIsVisible(false)}
              className="text-sanctuary-brass hover:text-sanctuary-purple transition-colors p-1 ml-2"
              aria-label="Close donation banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="mt-3 text-center">
          <p className="text-sanctuary-brass text-xs italic">
            "Freely ye have received, freely give" - Matthew 10:8 • God bless you for your generosity! 🙏
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationBanner;