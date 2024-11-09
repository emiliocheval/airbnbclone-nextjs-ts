// pages/payment-card.tsx
"use client"

import Link from 'next/link';
import { useState } from 'react';

const PaymentCard: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Credit / Debit Card</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <form>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full border-gray-300 rounded-md p-2"
              placeholder="**** **** **** ****"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-sm font-medium">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full border-gray-300 rounded-md p-2"
              placeholder="MM/YY"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cvv" className="block text-sm font-medium">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full border-gray-300 rounded-md p-2"
              placeholder="***"
            />
          </div>

          <Link href="/payment">
            <button type="button" className="w-full bg-black text-white py-3 rounded-lg">
              Save Card
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default PaymentCard;
