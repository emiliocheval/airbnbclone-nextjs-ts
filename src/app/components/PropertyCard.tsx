import React from 'react';
import Link from 'next/link';
import { Property } from '@/types/properties'; // Importing the Property type

const PropertyCard: React.FC<Property> = ({ id, title, imageUrl, price, location, description }) => {
    // Provide a fallback default image if imageUrl is null or undefined
    const imageSrc = imageUrl || '/default-image.jpg';

    return (
        <Link href={`/properties/${id}`} className="block">
            <div className="border rounded-lg overflow-hidden shadow-lg">
                <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <p className="text-gray-600">{location}</p>
                    <p className="text-xl font-semibold">{price}</p>
                    {/* Optionally, you can display the description here */}
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;
