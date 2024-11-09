// pages/property/[id].tsx (or wherever your page is located)
import { notFound } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import ReviewCard from "@/app/components/ReviewCard";
import { reviews } from "@/types/reviews";
import prisma from "../../../../prisma/client";
import RequestButton from "@/app/components/RequestButton";
import FeatureList from "@/app/components/FeatureList"; // Import the FeatureList component

export default async function PropertyDetail({
  params,
}: {
  params: { id: string };
}) {
  const property = await prisma.property.findUnique({
    where: {
      id: parseInt(params.id), // Ensure the ID is treated as a number
    },
    include: {
      bookings: true, // Include related data if needed
      reviews: true,
    },
  });

  if (!property) {
    notFound();
  }

  const mockReviews: reviews[] = [
    // Same mockReviews as before
  ];

  return (
    <div className="pb-10">
      <div className="relative h-[60vh]">
        <img
          src={property?.imageUrl || "/default-image.jpg"}
          alt={property?.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mt-4">{property?.title}</h1>
        <p className="text-gray-600 mt-2">{property?.location}</p>
        <p className="text-xl font-semibold text-gray-800 mt-2">{`$${property?.price}`} / Night</p>
        <div className="mt-4 text-lg">
          <p>{`${property?.guests} guests · ${property?.bedrooms} bedrooms · ${property?.beds} beds · ${property?.bathrooms} bathrooms`}</p>
        </div>

        <div className="my-6 border-b border-gray-300 opacity-50 w-5/6"></div>

        <p className="mt-4">{property?.description}</p>

        <div className="my-6 border-b border-gray-300 opacity-50 w-5/6"></div>

        {/* Use the FeatureList component to render different sections */}
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

        <div className="mt-6">
          <div className="flex items-center mb-4">
            <i className="fas fa-star text-yellow-500 text-2xl mr-2"></i>
            <p className="text-lg">4.7 · {mockReviews.length} reviews</p>
          </div>

          <div className="flex space-x-4 overflow-x-scroll">
            {mockReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
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
