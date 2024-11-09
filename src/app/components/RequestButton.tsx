"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const RequestButton = ({ property }: { property: { id: string } }) => {
  const { isSignedIn } = useUser();
  const router = useRouter(); // For programmatic navigation
  const handleRequestClick = () => {
    if (!isSignedIn) {
      window.location.href = "/sign-in";
    } else {
      // Navigate to bookingrequest with property ID as a query parameter
      router.push(`/bookingrequest?propertyId=${property.id}`);
    }
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#f1f1f1] py-2 flex justify-center">
      <button
        onClick={handleRequestClick}
        className="px-6 py-3 bg-[#068488] text-white rounded-lg hover:bg-[#056e70]"
      >
        Request
      </button>
    </div>
  );
};

export default RequestButton;
