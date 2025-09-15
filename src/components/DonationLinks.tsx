import React from "react";

export default function DonationLinks() {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">
        Support This Project ❤️
      </h2>
      <p className="text-gray-600 text-sm text-center max-w-sm">
        If you find this useful, consider donating to help keep it running!
      </p>

      {/* PayPal Donation Button */}
      <a
        href="https://www.paypal.com/donate/?hosted_button_id=Z2T57WZMGV9UQ"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-medium shadow transition"
      >
        Donate via PayPal
      </a>

      {/* Stripe Payment Link Button */}
      <a
        href="https://buy.stripe.com/pk_live_51PfmsGK9ncfwevj4aq3gIVzyUy1dqnbEzb2PYauU7ivDWCnALkWpywzqo65MzhSeNsWdOFa9IOLpt3Zd2TjnEa8p007GoBCAIT"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow transition"
      >
        Donate via Stripe
      </a>
    </div>
  );
}