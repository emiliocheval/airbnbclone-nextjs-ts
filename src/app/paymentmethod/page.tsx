// pages/payment-method.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const PaymentMethod: React.FC = () => {
  const router = useRouter();
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Select Payment Method</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div
          onClick={() => router.back()} // Go back in history
          className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded"
        >
          <p>💳 **** **** **** 1747</p>
        </div>

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
