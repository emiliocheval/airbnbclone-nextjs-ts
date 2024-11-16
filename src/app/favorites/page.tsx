"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Property } from "@/types/properties";

// Define types for better type safety
interface Favorite {
  id: number;
  property: Property;
}

const Favorites: React.FC = () => {
  const { user, isSignedIn } = useUser();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn || !user) return;

    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/favorites?userId=${user.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Failed to fetch favorites');

        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, isSignedIn]);

  // Function to handle removing from favorites
  const removeFromFavorites = async (propertyId: number) => {
    if (!user || !user.id) return;

    try {
      const response = await fetch(`/api/favorites/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, propertyId }),
      });

      if (!response.ok) throw new Error('Failed to remove from favorites');

      // Update the favorites state after removal
      setFavorites(favorites.filter(favorite => favorite.property.id !== propertyId));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Favorites</h1>

      {loading ? (
        <p>Loading favorites...</p>
      ) : favorites.length === 0 ? (
        <p>No favorites yet. Add some properties to your favorites!</p>
      ) : (
        <div className="space-y-4">
          {favorites.map((favorite) => {
            const { property } = favorite;
            const reviews = property.reviews || [];  // Access reviews directly from property
            const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = reviews.length > 0 ? (totalRatings / reviews.length).toFixed(1) : "No ratings";

            return (
              <div
              key={favorite.id}
              className="relative flex items-stretch bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Image - make it take full height */}
              <div className="w-1/3 flex-shrink-0">
                <img
                  src={property.imageUrl || '/default-image.jpg'}
                  alt={property.title || 'Property image'}
                  className="w-full h-full object-cover" // Ensure image takes full height and width
                />
              </div>
            
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.618 4.982a1 1 0 00.95.69h5.21c.969 0 1.371 1.24.588 1.81l-4.207 3.05a1 1 0 00-.364 1.118l1.618 4.982c.3.921-.755 1.688-1.538 1.118l-4.207-3.05a1 1 0 00-1.176 0l-4.207 3.05c-.783.57-1.838-.197-1.538-1.118l1.618-4.982a1 1 0 00-.364-1.118L2.83 9.409c-.783-.57-.38-1.81.588-1.81h5.21a1 1 0 00.95-.69l1.618-4.982z" />
                    </svg>
                    <span>{averageRating} ({reviews.length})</span>
                  </div>
                </div>
                <h2 className="text-xl opacity-70 font-semibold mt-2">
                  {property.title || 'No title available'}
                </h2>
                <p className="text-gray-600 text- font-sans pt-1">{property.location}</p>
                <p className="text-lg mt-6">
                  £ {property.price?.toLocaleString() || 'N/A'} <span className="opacity-60">/ night</span>
                </p>
              </div>
            
              {/* Star icon for removing from favorites */}
              <button
                onClick={() => removeFromFavorites(property.id)}
                className="absolute top-2 right-2 p-1 bg-white  hover:bg-gray-200 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.618 4.982a1 1 0 00.95.69h5.21c.969 0 1.371 1.24.588 1.81l-4.207 3.05a1 1 0 00-.364 1.118l1.618 4.982c.3.921-.755 1.688-1.538 1.118l-4.207-3.05a1 1 0 00-1.176 0l-4.207 3.05c-.783.57-1.838-.197-1.538-1.118l1.618-4.982a1 1 0 00-.364-1.118L2.83 9.409c-.783-.57-.38-1.81.588-1.81h5.21a1 1 0 00.95-.69l1.618-4.982z" />
                </svg>
              </button>
            </div>
            
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
