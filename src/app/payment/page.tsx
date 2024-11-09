"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importing useRouter for redirection
import { useSearchParams } from "next/navigation";
import { Property } from "@/types/properties"; // Import Property type
import { useUser } from "@clerk/nextjs"; // Import Clerk's useUser hook

export default function Payment() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const totalPrice = searchParams.get("totalPrice");
  const guests = searchParams.get("guests"); // Extract guests from query parameters
  const checkIn = searchParams.get("checkIn"); // Extract check-in date from query params
  const checkOut = searchParams.get("checkOut"); // Extract check-out date from query params

  const [property, setProperty] = useState<Property | null>(null);
  const router = useRouter(); // Initialize the useRouter hook
  const { user } = useUser(); // Access the current user from Clerk


  useEffect(() => {
    if (propertyId) {
      fetch(`/api/properties/${propertyId}`)
        .then((response) => response.json())
        .then((data: Property) => setProperty(data))
        .catch((error) => console.error("Error fetching property:", error));
    }
  }, [propertyId]);

  if (!property) {
    return <p>Loading property details...</p>;
  }

  // Calculate the number of nights based on totalPrice and property.price
  const nights = totalPrice ? Math.ceil(Number(totalPrice) / property.price) : 0;

  // Format the check-in and check-out dates to the format "November 8 - November 20"
  const formatDate = (date: string | null) => {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const formattedCheckIn = formatDate(checkIn);
  const formattedCheckOut = formatDate(checkOut);

  // Handle reserve button click
  const handleReserve = async () => {
    if (propertyId && guests && user && checkIn && checkOut) {
      // Create the booking data to send, removing nights and including checkIn and checkOut
      const bookingData = {
        propertyId,
        guests,
        checkIn: new Date(checkIn),  // Convert checkIn to Date object
        checkOut: new Date(checkOut),  // Convert checkOut to Date object
        userId: user.id, // Use Clerk's user ID
      };
  
      try {
        // Send POST request to the booking API endpoint
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });
  
        if (response.ok) {
          // Handle success response
          const data = await response.json();
          console.log("Booking successful:", data);
          // Optionally redirect to a confirmation page
          router.push(`/bookingconfirmation?propertyId=${propertyId}&totalPrice=${totalPrice}&cleaningFee=200&serviceFee=0&guests=${guests}&checkIn=${checkIn}&checkOut=${checkOut}`);
        } else {
          // Handle error response
          console.error("Booking failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during booking:", error);
      }
    } else {
      console.error("Missing required booking data or user");
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-4 pb-10">
      {/* Header */}
      <div className="flex items-center mb-4">
        <Link href="/previous-page" passHref>
          <button className="flex items-center px-2 py-1 text-gray-800 mr-4">
            <i className="fas fa-arrow-left"></i>
          </button>
        </Link>
        <h1 className="text-2xl font-semibold">Payments</h1>
      </div>

      {/* Property Card */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <img
            src={property.imageUrl || "/default-image.jpg"}
            alt="Property"
            className="w-12 h-12 rounded-lg mr-3"
          />
          <div>
            <p className="font-semibold">{property.title}</p>
            <p className="text-sm text-gray-500">{property.location}</p>

            {/* Display Check-in and Check-out dates */}
            {checkIn && checkOut && (
              <div className="mt-2 text-sm text-gray-600">
                <p>{formattedCheckIn} - {formattedCheckOut}</p>
              </div>
            )}
          </div>
        </div>

        {/* Display number of guests */}
        {guests && (
          <div className="mt-4">
            <p className="font-semibold">Guests: {guests}</p>
          </div>
        )}

        {/* Price Summary */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Price Summary</h2>
          <div className="mt-4">
            <div className="flex justify-between mt-2">
              <p>€{property.price} x {nights} nights</p>
              <p>€{totalPrice}</p>
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
              <p>€{(Number(totalPrice) + 200).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
          <p className="text-gray-600">************ 1747</p>
        </div>
        <div className="flex items-center">
          <Link href="/paymentmethod" className="text-gray-600 text-sm">
            Change
          </Link>
          <img
            src="/placeholder-logo.png" // Placeholder logo path
            alt="Logo"
            className="ml-4 w-8 h-8"
          />
        </div>
      </div>

      {/* Reserve Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleReserve}
          className="px-6 py-3 bg-black text-white rounded-md uppercase"
        >
          Reserve
        </button>
      </div>
    </div>
  );
}

