// pages/payment-method.tsx

import Link from 'next/link';

const PaymentMethod: React.FC = () => {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Select Payment Method</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <Link href="payment">
        <div className="flex items-center justify-between mb-4">
          <p>💳 **** **** **** 1747</p>
        </div>
        </Link>
        
        <Link href="/paymentcard">
          <button className="mt-4 w-full bg-black text-white py-3 rounded-lg">
            Add Payment Method
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentMethod;
