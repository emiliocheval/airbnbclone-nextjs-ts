"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Trips: React.FC = () => {
  const { user, isSignedIn } = useUser();
  const [upcomingTrips, setUpcomingTrips] = useState<any[]>([]);
  const [doneTrips, setDoneTrips] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'done'>('upcoming');
  const [showModal, setShowModal] = useState(false);
  const [tripToCancel, setTripToCancel] = useState<any>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [tripToReview, setTripToReview] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false); // New state for review confirmation
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn || !user) return;

    const fetchTrips = async () => {
      try {
        const response = await fetch("/api/bookings");
        const data = await response.json();
        const clerkUserId = user.id;

        const userTrips = data.filter((trip: any) => trip.user.clerkUserId === clerkUserId);
        const currentDate = new Date();
        const upcoming = userTrips.filter((trip: any) => new Date(trip.checkOut) >= currentDate);
        const done = userTrips.filter((trip: any) => new Date(trip.checkOut) < currentDate);

        setUpcomingTrips(upcoming);
        setDoneTrips(done);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, [user, isSignedIn]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  const handleViewDetails = (tripId: number) => {
    router.push(`/trip/${tripId}`);
  };

  const handleCancelTrip = (trip: any) => {
    setTripToCancel(trip);
    setShowModal(true);
  };

  const handleConfirmCancel = async () => {
    if (!tripToCancel) return;

    try {
      const response = await fetch(`/api/bookings/${tripToCancel.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUpcomingTrips(upcomingTrips.filter((trip) => trip.id !== tripToCancel.id));
        setShowModal(false);
      } else {
        console.error("Failed to cancel the trip");
      }
    } catch (error) {
      console.error("Error canceling trip:", error);
    }
  };

  const handleBookAgain = (trip: any) => {
    router.push(`/properties/${trip.property.id}`);
  };

  const handleWriteReview = (trip: any) => {
    setTripToReview(trip);
    setShowReviewModal(true);
    setReviewSubmitted(false); // Reset the review submission state
  };

  const handleSubmitReview = async () => {
    if (!tripToReview) return;

    try {
      const response = await fetch(`/api/reviews`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: tripToReview.property.id,
          rating,
          comment: reviewText,
          userName: user?.username || "Anonymous",
        }),
      });
      if (response.ok) {
        setDoneTrips(doneTrips.map(trip => trip.id === tripToReview.id
          ? { ...trip, hasReviewed: true }
          : trip
        ));
        setReviewSubmitted(true); // Show confirmation message
        setTimeout(() => setShowReviewModal(false), 2000); // Close modal after 2 seconds
      } else {
        console.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center flex-grow">Trips</h1>
      <div className="flex justify-center mb-4 mt-10">
        <button
          className={`px-8 py-2 rounded-full ${activeTab === 'upcoming' ? 'bg-zinc-800 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`px-8 py-2 rounded-full ${activeTab === 'done' ? 'bg-zinc-800 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setActiveTab('done')}
        >
          Done
        </button>
      </div>

      {(activeTab === 'upcoming' ? upcomingTrips : doneTrips).map((trip) => (
        <div key={trip.id} className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div className="flex items-center">
            <img
              src={trip.property?.imageUrl || '/default-image.jpg'}
              alt={trip.property?.title || 'Property image'}
              width={50}
              height={50}
              className="w-12 h-12 rounded-lg mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">{trip.property?.title || 'No title available'}</h2>
              <p className="text-sm text-gray-500">{trip.property?.location}</p>
              <p className="text-sm text-gray-500">
                Booking date:{" "}
                {formatDate(trip.checkIn)} - {formatDate(trip.checkOut)}
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            {activeTab === 'upcoming' ? (
              <>
                <button
                  onClick={() => handleCancelTrip(trip)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-full"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleViewDetails(trip.id)}
                  className="px-4 py-2 bg-zinc-800 text-white rounded-full"
                >
                  View Details
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleWriteReview(trip)}
                  className={`px-4 py-2 rounded-full ${trip.hasReviewed ? 'bg-gray-200 text-gray-400' : 'bg-gray-300 text-black'}`}
                  disabled={trip.hasReviewed}
                >
                  {trip.hasReviewed ? "Reviewed" : "Write a Review"}
                </button>
                <button
                  onClick={() => handleBookAgain(trip)}
                  className="px-4 py-2 bg-zinc-800 text-white rounded-full"
                >
                  Book Again
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {/* Modal for Cancel Confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-sm mx-auto">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to cancel this trip?
            </h3>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                No
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                I'm sure
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Writing a Review */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-sm mx-auto">
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Leave your review here..."
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            {reviewSubmitted && (
              <p className="text-gray-500 text-center mb-4">Review Submitted!</p>
            )}
            <div className="flex justify-between">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trips;
