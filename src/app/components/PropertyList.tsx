// src/components/PropertyList.tsx
"use client"; // Indicates that this component will be rendered on the client side

import React from 'react';
import PropertyCard from '@/app/components/PropertyCard';
import { Property } from '@/types/properties'; // Import the Property type from your types folder

interface PropertyListProps {
    properties: Property[]; // Use the imported Property type
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {properties.map((property) => (
                <PropertyCard
                    key={property.id} // Use the unique id for the key
                    id={property.id}
                    title={property.title}
                    imageUrl={property.imageUrl}
                    price={property.price}
                    location={property.location}
                    description={property.description} host={''} amenities={[]} houseRules={[]} safetyFeatures={[]} propertyFeatures={[]} services={[]} reviews={[]} guests={0} bedrooms={0} beds={0} bathrooms={0} bookings={[]}                />
            ))}
        </div>
    );
};

export default PropertyList;
