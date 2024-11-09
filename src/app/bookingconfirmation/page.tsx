// src/app/booking-confirmation/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const BookingConfirmation: React.FC = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "123456";
  const bookingDate = searchParams.get("bookingDate") || "October 27, 2024";
  const propertyId = searchParams.get("propertyId");
  const propertyTitle =
    searchParams.get("propertyTitle") || "Beautiful Beachfront Villa";
  const propertyLocation = searchParams.get("propertyLocation") || "Miami, FL";
  const cleaningFee = Number(searchParams.get("cleaningFee") || "50");
  const serviceFee = Number(searchParams.get("serviceFee") || "30");
  const totalPrice = Number(searchParams.get("totalPrice") || "280"); // Total price from query params
  const guests = searchParams.get("guests") || "2"; // Number of guests
  const checkIn = searchParams.get("checkIn") || "N/A"; // Check-in date
  const checkOut = searchParams.get("checkOut") || "N/A"; // Check-out date
  const [propertyImage, setPropertyImage] = useState<string>("");

  useEffect(() => {
    if (propertyId) {
      fetch(`/api/properties/${propertyId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.imageUrl) {
            setPropertyImage(data.imageUrl);
          }
        })
        .catch((error) =>
          console.error("Error fetching property details:", error)
        );
    }
  }, [propertyId]);

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg ">
      <h1 className="text-2xl font-bold text-center mb-4">Booking Confirmed</h1>

      {/* Centered Check Icon */}
      <div className="flex justify-center items-center mb-6">
        <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-black">
          <svg
            className="w-8 h-8 text-black"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 5.707 8.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <img
          src={propertyImage || "/default-image.jpg"}
          alt="Property"
          className="w-full h-auto rounded-lg mb-4"
        />

        <h2 className="text-xl font-semibold text-center">{propertyTitle}</h2>
        <p className="text-gray-600 text-center">{propertyLocation}</p>

        <div className="my-4">
          <h3 className="font-semibold text-lg">Reservation Details</h3>
          <p className="text-base">Guests: {guests}</p>
          <p className="text-base">Check-In: {checkIn}</p>
          <p className="text-base">Check-Out: {checkOut}</p>
        </div>

        <div className="my-4">
          <h3 className="font-semibold text-lg">Price Details</h3>
          <p className="text-base">Cleaning Fee: €{cleaningFee}</p>
          <p className="text-base">Service Fee: €{serviceFee}</p>
        </div>

        <div className="border-t border-opacity-50 my-2"></div>

        <p className="font-bold text-center text-lg">
          Total Amount: €{(Number(totalPrice) + 200).toLocaleString()}
        </p>
      </div>

      <h3 className="text-lg font-bold text-center mt-6">Enjoy your stay!</h3>
      <Link href="/">
        <button className="w-full mt-4 py-2 bg-gray-950 text-white rounded-md hover:bg-gray-800 transition">
          Return to Home
        </button>
      </Link>
    </div>
  );
};

export default BookingConfirmation;
