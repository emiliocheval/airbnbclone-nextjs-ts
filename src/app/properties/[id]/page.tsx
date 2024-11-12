import { notFound } from "next/navigation";
import prisma from "../../../../prisma/client";
import ReviewCard from "@/app/components/ReviewCard";
import RequestButton from "@/app/components/RequestButton";
import FeatureList from "@/app/components/FeatureList"; // Import the FeatureList component
import BackButton from "@/app/components/BackButton"; // Import the BackButton component

export default async function PropertyDetail({
  params,
}: {
  params: { id: string };
}) {
  // Fetch property details and reviews associated with the property
  const property = await prisma.property.findUnique({
    where: {
      id: parseInt(params.id), // Ensure the ID is treated as a number
    },
    include: {
      reviews: true, // Include reviews for the property
    },
  });

  if (!property) {
    notFound(); // Return a 404 if the property is not found
  }

  // Calculate the average rating with a fallback to `null` if no reviews exist
  const totalReviews = property.reviews.length;
  const averageRating =
    totalReviews > 0
      ? property.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : null;

  return (
    <div className="pb-10">
      <div className="relative h-[60vh]">
        {/* Back Button */}
        <BackButton/>

        <img
          src={property?.imageUrl || "/default-image.jpg"}
          alt={property?.title || "Property image"}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mt-4">{property?.title}</h1>
        <p className="text-gray-600 mt-2">{property?.location}</p>
        <p className="text-xl font-semibold text-gray-800 mt-2">
          {`$${property?.price ?? 0}`} / Night
        </p>
        <div className="mt-4 text-lg">
          <p>{`${property?.guests ?? 0} guests · ${property?.bedrooms ?? 0} bedrooms · ${property?.beds ?? 0} beds · ${property?.bathrooms ?? 0} bathrooms`}</p>
        </div>

        <div className="my-6 border-b border-gray-300 opacity-50 w-5/6"></div>

        <p className="mt-4">{property?.description}</p>

        <div className="my-6 border-b border-gray-300 opacity-50 w-5/6"></div>

        {/* Render different sections with FeatureList component */}
        <ul className="mt-2">
          <FeatureList
            title="Amenities"
            items={
              Array.isArray(property?.amenities)
                ? property.amenities.map(String)
                : []
            }
            emptyMessage="No amenities available."
          />
        </ul>

        <ul className="mt-2">
          <FeatureList
            title="House Rules"
            items={
              Array.isArray(property?.houseRules)
                ? property.houseRules.map(String)
                : []
            }
            emptyMessage="No house rules specified."
          />
        </ul>

        <ul className="mt-2">
          <FeatureList
            title="Safety Features"
            items={
              Array.isArray(property?.safetyFeatures)
                ? property.safetyFeatures.map(String)
                : []
            }
            emptyMessage="No safety features listed."
          />
        </ul>

        <ul className="mt-2">
          <FeatureList
            title="Property Features"
            items={
              Array.isArray(property?.propertyFeatures)
                ? property.propertyFeatures.map(String)
                : []
            }
            emptyMessage="No property features available."
          />
        </ul>

        <ul className="mt-2">
          <FeatureList
            title="Services"
            items={
              Array.isArray(property?.services)
                ? property.services.map(String)
                : []
            }
            emptyMessage="No services provided."
          />
        </ul>

        <div className="my-6 border-b border-gray-300 opacity-50 w-5/6"></div>

        {/* Reviews Section */}
        <div className="mt-6">
          <div className="flex items-center mb-4">
            <i className="fas fa-star text-yellow-500 text-2xl mr-2"></i>
            <p className="text-lg">
              {totalReviews > 0
                ? `${averageRating?.toFixed(1)} · ${totalReviews} reviews`
                : "No reviews yet"}
            </p>
          </div>

          {totalReviews > 0 ? (
            <div className="flex space-x-4 overflow-x-scroll">
              {property.reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={{
                    ...review,
                    createdAt: review.createdAt.toLocaleDateString(), // Convert Date to string
                  }}
                />
              ))}
            </div>
          ) : (
            <p>No reviews available for this property.</p>
          )}
        </div>

        <RequestButton
          key={property.id}
          property={{ ...property, id: property.id.toString() }}
        />
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";