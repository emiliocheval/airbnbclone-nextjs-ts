"use client";

import React, { useEffect, useState } from "react";
import PropertyList from "../app/components/PropertyList";
import { Property } from "@/types/properties";
import FilterModal from "../app/components/FilterModal";
import { useUser } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { MdFilterList } from "react-icons/md";


interface Filters {
  priceRange?: { min: number; max: number };
  features?: { [key: string]: boolean };
  services?: { [key: string]: boolean };
}

const HomePage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({});

  const { user, isLoaded } = useUser();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties");
        if (!response.ok) throw new Error("Failed to fetch properties");

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
    if (isLoaded && user) {
      const checkUser = async () => {
        try {
          const username = user.username || "anonymous";

          const response = await fetch("/api/auth/check-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              clerkUserId: user.id,
              email: user.emailAddresses[0]?.emailAddress,
              username: username,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (!data.exists) {
              await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  clerkUserId: user.id,
                  email: user.emailAddresses[0]?.emailAddress,
                  username: username,
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

  const handleApplyFilters = (appliedFilters: Filters) => {
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
          property.propertyFeatures?.some(
            (f) => f.toLowerCase() === featureNormalized
          )
        );
      });

    const matchesServices =
      !filters.services ||
      Object.entries(filters.services).every(([service, isChecked]) => {
        const normalizedService = service
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()
          .trim();
        return (
          !isChecked ||
          property.services?.some((propService) =>
            propService.toLowerCase().includes(normalizedService)
          )
        );
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
      <div className="relative flex items-center mb-5 border bg-white border-gray-300 rounded-full">
        <FontAwesomeIcon className="ml-2" icon={faMagnifyingGlass}/>
        <input
          type="text"
          placeholder="Where to?"
          className="w-full p-2 pl-4 rounded-full focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className=" p-3 h-10 w-10 bg-white text-black rounded-full outline outline-gray-200 outline-1"
          aria-label="Open Filters"
        >
          <MdFilterList  className='text-gray-600' />
       
        </button>
      </div>

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
