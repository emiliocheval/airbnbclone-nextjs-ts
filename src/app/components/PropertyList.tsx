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
          reviews={property.reviews} // Ensure that reviews are passed if available
          features={property.propertyFeatures} // Pass features directly from property data
          amenities={property.amenities} // Pass amenities directly if they exist in Property type
          houseRules={property.houseRules} // Adjust to fit your Property type
          safetyFeatures={property.safetyFeatures} // Adjust if needed
          propertyFeatures={property.propertyFeatures}
          services={property.services}
          host={property.host}
          guests={property.guests || 0}
          bedrooms={property.bedrooms || 0}
          beds={property.beds || 0}
          bathrooms={property.bathrooms || 0}
          bookings={property.bookings || []} favorites={[]}        />
      ))}
    </div>
  );
};

export default PropertyList;
