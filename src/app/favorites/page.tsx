// src/app/favorites.tsx

import React from 'react';

const Favorites: React.FC = () => {
  // Mock data for favorite properties
  const favoriteProperties = [
    {
      id: 1,
      image: '/property 1.jpg', // Replace with actual image path
      rating: 5.0,
      reviews: 33,
      title: 'Luxury Beachside Villa',
      location: 'Malibu, CA',
      price: 9700,
    },
    {
      id: 2,
      image: '/property 1.jpg',
      rating: 4.9,
      reviews: 45,
      title: 'Mountain Escape Cabin',
      location: 'Aspen, CO',
      price: 1200,
    },
    {
      id: 3,
      image: '/property 1.jpg',
      rating: 4.8,
      reviews: 27,
      title: 'Modern City Apartment',
      location: 'New York, NY',
      price: 1500,
    },
    {
      id: 4,
      image: 'path/to/property4.jpg',
      rating: 4.7,
      reviews: 51,
      title: 'Countryside Mansion',
      location: 'Oxfordshire, UK',
      price: 8700,
    },
    {
      id: 5,
      image: 'path/to/property5.jpg',
      rating: 4.9,
      reviews: 38,
      title: 'Private Island Retreat',
      location: 'Bahamas',
      price: 25000,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Favorites</h1>
      
      <div className="space-y-4">
        {favoriteProperties.map((property) => (
          <div key={property.id} className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="w-1/3 h-full object-cover"
            />
            <div className="p-4 flex-1">
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
                  <span>{property.rating} ({property.reviews})</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 hover:text-red-500 cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 16.828l-6.828-6.828a4 4 0 010-5.656z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mt-2">{property.title}</h2>
              <p className="text-gray-600">{property.location}</p>
              <p className="text-lg font-bold mt-2">£{property.price.toLocaleString()} / night</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
