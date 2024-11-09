"use client";

import React, { useEffect, useState } from "react";
import PropertyList from "../app/components/PropertyList";
import { Property } from "@/types/properties";
import FilterModal from "../app/components/FilterModal"; // Import the FilterModal
import { useUser } from "@clerk/nextjs"; // Import useUser

const HomePage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false); // State to control modal visibility
  const [filters, setFilters] = useState<any>({}); // State to hold the applied filters

  const { user, isLoaded } = useUser(); // Use useUser to get the user object

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data: Property[] = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    // Run only after user data is loaded
    if (isLoaded && user) {
      const checkUser = async () => {
        try {
          const response = await fetch("/api/auth/check-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clerkUserId: user.id,
              email: user.emailAddresses[0]?.emailAddress,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (!data.exists) {
              // Register user if they don't exist
              await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  clerkUserId: user.id,
                  email: user.emailAddresses[0]?.emailAddress,
                }),
              });
            }
          } else {
            console.error("Failed to check user existence");
          }
        } catch (error) {
          console.error("Error checking user:", error);
        }
      };

      checkUser();
    }
  }, [isLoaded, user]);

  const handleApplyFilters = (appliedFilters: any) => {
    setFilters(appliedFilters);
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriceRange =
      !filters.priceRange ||
      (property.price >= filters.priceRange.min &&
        property.price <= filters.priceRange.max);

    const matchesFeatures =
      !filters.features ||
      Object.entries(filters.features).every(([feature, isChecked]) => {
        const featureNormalized = feature
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()
          .trim();
        return (
          !isChecked ||
          property.propertyFeatures.some(
            (f) => f.toLowerCase() === featureNormalized
          )
        );
      });

    const matchesServices =
      !filters.services ||
      Object.entries(filters.services).every(([service, isChecked]) => {
        if (isChecked) {
          const normalizedService = service
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()
            .trim();
          return property.services.some((propService) =>
            propService.toLowerCase().includes(normalizedService)
          );
        }
        return true;
      });

    return (
      matchesSearch && matchesPriceRange && matchesFeatures && matchesServices
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 mb-4 rounded-md border border-gray-300"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        onClick={() => setIsFilterModalOpen(true)}
        className="mb-4 px-4 py-2 bg-teal-500 text-white rounded-md"
      >
        Open Filters
      </button>
      <PropertyList properties={filteredProperties} />
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
};

export default HomePage;
