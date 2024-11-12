import React from "react";
import PropertyCard from "@/app/components/PropertyCard";
import { Property } from "@/types/properties";

interface PropertyListProps {
  properties: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          id={property.id}
          title={property.title}
          imageUrl={property.imageUrl}
          price={property.price}
          location={property.location}
          description={property.description}
          reviews={property.reviews || []} // Ensure reviews default to an empty array
          features={property.propertyFeatures || []} // Provide default empty array for features
          amenities={property.amenities || []} // Default to an empty array if amenities not present
          houseRules={property.houseRules || []} // Default to an empty array for house rules
          safetyFeatures={property.safetyFeatures || []} // Provide default empty array
          propertyFeatures={property.propertyFeatures || []} // Ensure default empty array
          services={property.services || []} // Default empty array for services
          host={property.host || "Unknown Host"} // Default host name if missing
          guests={property.guests || 0}
          bedrooms={property.bedrooms || 0}
          beds={property.beds || 0}
          bathrooms={property.bathrooms || 0}
          bookings={property.bookings || []} // Default to an empty array
          favorites={[]} // Adjust this based on your favorite management strategy
          isFavorited={false} // Update this based on favorite status if managed by parent
          property={undefined}        />
      ))}
    </div>
  );
};

export default PropertyList;
