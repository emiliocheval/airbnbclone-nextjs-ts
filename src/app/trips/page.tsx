"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs"; // Assuming you are using Clerk for authentication

const Trips: React.FC = () => {
  const { user, isLoaded, isSignedIn } = useUser(); // Hook to access the logged-in user
  const [upcomingTrips, setUpcomingTrips] = useState<any[]>([]);
  const [doneTrips, setDoneTrips] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'done'>('upcoming');

  useEffect(() => {
    if (!isSignedIn || !user) return; // Only fetch trips if the user is signed in

    const fetchTrips = async () => {
      try {
        const response = await fetch("/api/bookings");
        const data = await response.json();
        const clerkUserId = user.id; // Get the logged-in user's clerkUserId

        // Filter trips based on the logged-in user's clerkUserId
        const userTrips = data.filter((trip: any) => trip.user.clerkUserId === clerkUserId);

        // Separate trips into upcoming and done based on checkout date
        const currentDate = new Date();
        const upcoming = userTrips.filter((trip: any) => new Date(trip.checkOut) >= currentDate);
        const done = userTrips.filter((trip: any) => new Date(trip.checkOut) < currentDate);

        setUpcomingTrips(upcoming); // Set the upcoming trips
        setDoneTrips(done); // Set the done trips
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, [user, isSignedIn]); // Depend on user and isSignedIn to trigger the effect

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Trips</h1>
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 rounded-full ${activeTab === 'upcoming' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`px-4 py-2 rounded-full ${activeTab === 'done' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setActiveTab('done')}
        >
          Done
        </button>
      </div>

      {/* Render trips based on the active tab */}
      {(activeTab === 'upcoming' ? upcomingTrips : doneTrips).map((trip) => (
        <div key={trip.id} className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div className="flex items-center">
            {/* Property image */}
            <img
              src={trip.property?.imageUrl || '/default-image.jpg'} // Ensure imageUrl exists or fallback to default
              alt={trip.property?.title || 'Property image'}
              width={50}
              height={50}
              className="w-12 h-12 rounded-lg mr-4"
            />
            <div>
              {/* Property title */}
              <h2 className="text-lg font-semibold">{trip.property?.title || 'No title available'}</h2>
              {/* Check-in and Check-out dates */}
              <p className="text-sm text-gray-500">
                Booking date:{" "}
                {new Date(trip.checkIn).toLocaleString("en-US", { month: "long", day: "numeric" })} -{" "}
                {new Date(trip.checkOut).toLocaleString("en-US", { month: "long", day: "numeric" })}
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            {activeTab === 'upcoming' ? (
              <>
                <button className="px-4 py-2 bg-gray-300 text-black rounded-full">Cancel</button>
                <button className="px-4 py-2 bg-black text-white rounded-full">View Details</button>
              </>
            ) : (
              <>
                <button className="px-4 py-2 bg-gray-300 text-black rounded-full">Write a Review</button>
                <button className="px-4 py-2 bg-black text-white rounded-full">Book Again</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trips;
