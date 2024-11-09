// pages/trip/[id].tsx
"use client";

import Link from 'next/link';

const TripDetail = () => {
  // Mockup data for a trip (to be replaced by real data from a database)
  const trip = {
    name: 'Buccara Villa El Nido',
    checkIn: 'Sat, Oct 12, 2PM-9PM',
    checkOut: 'Tue, Oct 22, 10AM',
    stayDuration: '10 Nights',
    guests: '10 Guests',
    address: {
      name: 'Buccara Villa El Nido',
      street: 'Cascada de Camoján, Marbella',
      zipCode: '29602',
      city: 'Malaga',
      country: 'Spain',
    },
    priceBreakdown: {
      nightlyRate: '€9,700/night',
      cleaningFee: '€200',
      serviceFee: '€350',
      totalPrice: '€97,200',
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-4 max-w-md w-full mx-auto font-sans text-gray-700 bg-white rounded-lg shadow-md">
        {/* Back button */}
        <button onClick={() => window.history.back()} className="text-gray-500 mb-4">
          ← Details
        </button>

        {/* Image */}
        <div className="mb-4">
          <img
            src="https://via.placeholder.com/500"
            alt={trip.name}
            className="w-full h-60 object-cover rounded-lg"
          />
        </div>

        {/* Trip Title */}
        <h2 className="text-lg font-medium text-center mb-6">
          You’re going to{' '}
          <Link href={`/property/${trip.name}`} className="text-blue-500 underline">
            {trip.name}
          </Link>
        </h2>

        {/* Dates and Guests */}
        <div className="grid grid-cols-2 gap-4 text-center text-sm mb-6">
          <div>
            <p className="font-semibold">Check in</p>
            <p>{trip.checkIn}</p>
          </div>
          <div>
            <p className="font-semibold">Check out</p>
            <p>{trip.checkOut}</p>
          </div>
          <div>
            <p className="font-semibold">Stay Duration</p>
            <p>{trip.stayDuration}</p>
          </div>
          <div>
            <p className="font-semibold">Guests</p>
            <p>{trip.guests}</p>
          </div>
        </div>

        {/* Address */}
        <div className="border-t border-gray-300 text-center pt-4 mb-6">
          <h3 className="font-semibold text-sm mb-2">Address</h3>
          <p>{trip.address.name}</p>
          <p>{trip.address.street}</p>
          <p>
            {trip.address.zipCode}, {trip.address.city}
          </p>
          <p>{trip.address.country}</p>
          <div className="flex gap-6 mt-2 justify-center">
            <Link href="/map" className="text-blue-500 underline text-sm">
              View on map
            </Link>
            <Link href={`/property/${trip.name}`} className="text-blue-500 underline text-sm">
              View Listing
            </Link>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t text-center border-gray-300 pt-4 mb-8">
          <h3 className="font-semibold text-sm mb-2">Price Breakdown</h3>
          <p className="text-sm">Nightly Rate: {trip.priceBreakdown.nightlyRate}</p>
          <p className="text-sm">Cleaning Fee: {trip.priceBreakdown.cleaningFee}</p>
          <p className="text-sm">Service Fee: {trip.priceBreakdown.serviceFee}</p>
          <p className="font-semibold text-sm mt-2">
            Total Price: {trip.priceBreakdown.totalPrice}
          </p>
        </div>

        {/* Cancel Button */}
        <button className="w-full py-3 bg-black text-white text-sm rounded-lg">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TripDetail;
