import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Property } from "@/types/properties";
import { useUser } from "@clerk/clerk-react";

interface PropertyCardProps extends Property {
  isFavorited: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  imageUrl,
  price,
  location,
  description,
  reviews = [],
  isFavorited,
}) => {
  const { user } = useUser();
  const [favoriteStatus, setFavoriteStatus] = useState(isFavorited);

  useEffect(() => {
    // Fetch the latest favorite status from the backend when the component mounts
    const fetchFavoriteStatus = async () => {
      if (!user || !user.id) return;

      try {
        const response = await fetch(`/api/favorites/status?userId=${user.id}&propertyId=${id}`);
        const data = await response.json();
        setFavoriteStatus(data.isFavorited);
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };

    fetchFavoriteStatus();
  }, [user, id]);

  const toggleFavorite = async () => {
    if (!user || !user.id) {
      console.error("User is not authenticated or user.id is missing");
      return;
    }

    try {
      const response = await fetch(`/api/favorites`, {
        method: favoriteStatus ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: String(user.id),
          propertyId: id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Toggle the favorite status if the request was successful
        setFavoriteStatus(!favoriteStatus);
        console.log(favoriteStatus ? "Favorite removed" : "Favorite added", data);
      } else {
        console.error("Error toggling favorite:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error in toggleFavorite:", error);
    }
  };

  const imageSrc = imageUrl || "/default-image.jpg";
  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = reviews.length > 0 ? (totalRatings / reviews.length).toFixed(1) : "No ratings";

  return (
    <div className="relative">
      <Link href={`/properties/${id}`} className="block">
      <div className="border rounded-lg overflow-hidden shadow-lg">
  <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
  <div className="p-4">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg font-bold">{title}</h2>
      <span className="text-yellow-500">⭐ {averageRating}</span>
    </div>
    <div className="flex-col text-gray-600">
      <p>{location}</p>
      <p className="text-xl font-semibold text-black">${price}</p>
    </div>
  </div>
</div>
      </Link>

      <button
        onClick={toggleFavorite}
        className={`absolute top-2 right-2 ${favoriteStatus ? "text-yellow-500" : "text-black-500"}`}
      >
        {favoriteStatus ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default PropertyCard;
