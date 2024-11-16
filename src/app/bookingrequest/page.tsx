"use client"

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Property } from "@/types/properties"; // Import the Property type

export default function BookingRequest() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [property, setProperty] = useState<Property | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");

  useEffect(() => {
    if (propertyId) {
      fetch(`/api/properties/${propertyId}`)
        .then((response) => response.json())
        .then((data: Property) => setProperty(data))
        .catch((error) => console.error("Error fetching property:", error));
    }
  }, [propertyId]);

  const calculateTotalPrice = () => {
    if (!property || !checkIn || !checkOut) return null;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);

    if (nights <= 0) return null;

    const totalPrice = nights * property.price;
    return totalPrice;
  };

  useEffect(() => {
    const price = calculateTotalPrice();
    setTotalPrice(price);
  }, [checkIn, checkOut, property]);

  const guestsOptions = [1, 2, 3, 4, 5];

  if (!property) {
    return <p>Loading property details...</p>;
  }

  const handlePaymentClick = () => {
    if (propertyId && totalPrice !== null) {
      // Calculate total with cleaning fee
      const totalWithFees = totalPrice + 200; // Adding cleaning fee
  
      // Redirect to the payment page with guests, totalPrice, cleaning fee, service fee, and final total
      router.push(`/payment?propertyId=${propertyId}&totalPrice=${totalPrice}&cleaningFee=200&serviceFee=0&finalTotal=${totalWithFees}&guests=${guests}&checkIn=${checkIn}&checkOut=${checkOut}`);
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Booking Request</h1>

      {/* Property Card */}
      <div className="mt-4 bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={property.imageUrl || "/default-image.jpg"}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold">{property.title}</h2>
          <p className="text-gray-500">{property.location}</p>
        </div>
      </div>

      {/* Check-in / Check-out Section */}
      <h2 className="mt-6 text-2xl font-bold">Check In / Check Out</h2>
      <div className="mt-2 bg-white rounded-lg shadow-md p-4 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">Check-In</label>
          <input
            type="date"
            id="checkIn"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">Check-Out</label>
          <input
            type="date"
            id="checkOut"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2 mt-4">
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Number of Guests</label>
          <select
            id="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            {guestsOptions.map((num) => (
              <option key={num} value={num}>
                {num} Guest{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Details Section */}
      <h2 className="mt-6 text-2xl font-bold">Price Details</h2>
      <div className="mt-2 bg-white rounded-lg shadow-md p-4">
        {totalPrice !== null ? (
          <>
            <div className="flex justify-between">
              <p>€{property.price} x {Math.ceil(totalPrice / property.price)} nights</p>
              <p>€{totalPrice.toLocaleString()}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>Cleaning fee</p>
              <p>€200</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>Service fee</p>
              <p>€0</p>
            </div>
            <div className="border-b border-gray-300 my-4 opacity-50"></div>
            <div className="flex justify-between font-bold">
              <p>Total (EUR)</p>
              <p>€{(totalPrice + 200).toLocaleString()}</p>
            </div>
          </>
        ) : (
          <p>Please select valid check-in and check-out dates.</p>
        )}
      </div>

      {/* Payment Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handlePaymentClick} // Trigger the payment navigation with query parameter
          className="px-20 py-3 bg-zinc-800 text-white rounded-md uppercase">
          Payment
        </button>
      </div>
    </div>
  );
}
