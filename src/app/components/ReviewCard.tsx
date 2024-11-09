import React from 'react';
import { reviews } from '@/types/reviews'; // Import the reviews interface

interface ReviewCardProps {
  review: reviews; // Type the props to expect a single review object
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg w-80">
      <h3 className="font-bold">{review.userName}</h3>
      <div className="text-yellow-500">
        {/* Render stars for rating */}
        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
      </div>
      <p className="text-gray-600 mt-2">{review.comment}</p>
      <p className="text-sm text-gray-400 mt-4">{new Date(review.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ReviewCard;
