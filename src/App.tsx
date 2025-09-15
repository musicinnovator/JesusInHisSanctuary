import React from 'react';
import DonationForm from './components/DonationForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Support Our Mission
            </h1>
            <p className="text-gray-600">
              Your donation helps us continue our important work. Every contribution makes a difference.
            </p>
          </div>
          <DonationForm />
        </div>
      </div>
    </div>
  );
}

export default App;