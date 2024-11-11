import React from "react";
import Link from "next/link";
import { Property } from "@/types/properties";

interface PropertyCardProps extends Property {
  // Removed isFavorited and onToggleFavorite
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  imageUrl,
  price,
  location,
  description,
  reviews = [],
}) => {
  const imageSrc = imageUrl || "/default-image.jpg";
  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = reviews.length > 0 ? (totalRatings / reviews.length).toFixed(1) : "No ratings";

  return (
    <div className="relative">
      <Link href={`/properties/${id}`} className="block">
        <div className="border rounded-lg overflow-hidden shadow-lg">
          <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-lg font-bold">{title}</h2>
            <span className="text-yellow-500 ">⭐ {averageRating}</span>
          </div>
          <p className="text-gray-600">{location}</p>
          <p className="text-xl font-semibold">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
