"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Booking } from "../../../types/booking"; // Adjust path as necessary
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BackButton from "@/app/components/BackButton";

const TripDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [trip, setTrip] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  useEffect(() => {
    const fetchTrip = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/bookings/${id}`);
        const data = await response.json();
        setTrip(data);
      } catch (error) {
        console.error("Error fetching trip:", error);
      }
    };

    fetchTrip();
  }, [id]);

  if (!trip) {
    return <div>Loading...</div>;
  }

  // Calculate stay duration in nights
  const checkInDate = new Date(trip.checkIn);
  const checkOutDate = new Date(trip.checkOut);
  const stayDuration = Math.round(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Function to handle the cancel confirmation
  const handleCancel = async () => {
    if (!id) return;

    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push("/trips"); // Navigate to homepage or another relevant page
      } else {
        console.error("Error deleting trip");
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="flex items-center p-4 bg-white shadow-md">
        {/* Back Button */}
        <BackButton/>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center flex-grow">Details</h1>
      </div>

      {/* Image Section */}
      <div className="mb-4">
        <img
          src={trip.property?.imageUrl || "https://via.placeholder.com/500"}
          alt={trip.property?.title || "Property Image"}
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Trip Title */}
      <h2 className="text-2xl font-semibold text-center mb-6">
        You’re going to <br />
        <Link
          href={`/property/${trip.property?.title}`}
          className="text-teal-500"
        >
          {trip.property?.title}
        </Link>
      </h2>

      <div className="my-5 border-b border-gray-300 opacity-50 w-5/6"></div>

      {/* Dates and Guests Section */}
      <div className="grid grid-cols-2 gap-4 text-center text-sm mb-6">
        <div>
          <p className="font-semibold">Check in</p>
          <p>{checkInDate.toLocaleDateString()}</p>
        </div>
        <div>
          <p className="font-semibold">Check out</p>
          <p>{checkOutDate.toLocaleDateString()}</p>
        </div>
        <div>
          <p className="font-semibold">Nights</p>
          <p>{stayDuration}</p>
        </div>
        <div>
          <p className="font-semibold">Guests</p>
          <p>{trip.guests}</p>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="border-t text-center pt-4 mb-8">
        <h3 className="font-semibold text-sm mb-2">Price Breakdown</h3>

        {/* Nightly Rate */}
        <p className="text-sm">
          Nightly Rate: $
          {trip.property?.price
            ? parseFloat(String(trip.property.price)).toFixed(2)
            : "N/A"}{" "}
          /night
        </p>

        {/* Cleaning Fee */}
        <p className="text-sm">Cleaning Fee: $200</p>

        {/* Service Fee */}
        <p className="text-sm">Service Fee: $0</p>

        {/* Total Price */}
        <p className="font-semibold text-sm mt-2">
          Total Price: $
          {trip.property?.price && trip.checkIn && trip.checkOut
            ? (() => {
                const price = parseFloat(String(trip.property.price));
                const checkInDate = new Date(trip.checkIn);
                const checkOutDate = new Date(trip.checkOut);
                const stayDuration = Math.round(
                  (checkOutDate.getTime() - checkInDate.getTime()) /
                    (1000 * 60 * 60 * 24)
                );
                return price * stayDuration + 200; // Nightly rate * stay duration + cleaning fee
              })().toFixed(2)
            : "N/A"}
        </p>
      </div>

      {/* Cancel Button */}
      <div className="w-full px-4 mb-6">
        <button
          onClick={() => setShowModal(true)} // Open the modal
          className="w-full py-3 bg-black text-white text-sm rounded-lg"
        >
          Cancel
        </button>
      </div>

      {/* Modal for Cancel Confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-xs mx-auto">
            <h3 className="text-xl text-center font-semibold mb-4">
              Are you sure you want to cancel this trip?
            </h3>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)} // Close the modal
                className="px-5 py-2 bg-gray-300 rounded-lg"
              >
                No
              </button>
              <button
                onClick={handleCancel} // Confirm and delete trip
                className="px-8 py-2 bg-gray-800 text-white rounded-lg"
              >
                I'm sure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripDetail;
