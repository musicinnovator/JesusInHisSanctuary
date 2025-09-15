import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface PayPalPaymentFormProps {
  amount: number;
  frequency: 'one-time' | 'monthly';
  donorInfo: {
    name: string;
    email: string;
    message: string;
    anonymous: boolean;
  };
}

export default function PayPalPaymentForm({ amount, frequency, donorInfo }: PayPalPaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayPalPayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // For now, show a simple message since PayPal integration requires server setup
      alert(`PayPal payment of $${amount.toFixed(2)} ${frequency === 'monthly' ? 'per month' : 'one-time'} would be processed here.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-lg font-medium text-gray-900 mb-2">
          ${amount.toFixed(2)} {frequency === 'monthly' ? 'per month' : 'one-time'}
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          PayPal integration requires server-side setup with PayPal API credentials.
          This is a demo showing the UI structure.
        </p>
      </div>

      <button
        onClick={handlePayPalPayment}
        disabled={isLoading}
        className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          'Pay with PayPal'
        )}
      </button>

      {error && (
        <div className="text-red-600 text-sm text-center">{error}</div>
      )}
    </div>
  );
}