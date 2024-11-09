import React, { useState } from "react";
import Select from "react-select";
import { Range } from "react-range";

// Define types for specific keys in features and services
type FeatureKey = "OceanView" | "PrivatePool" | "Helipad" | "RooftopTerrace";
type ServiceKey = "PrivateChef" | "Chauffeur" | "BoatRental" | "InHouseSpa";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [priceRange, setPriceRange] = useState({ min: 3500, max: 9500 });
  const [guests, setGuests] = useState("Any");

  const [features, setFeatures] = useState<Record<FeatureKey, boolean>>({
    OceanView: false,
    PrivatePool: false,
    Helipad: false,
    RooftopTerrace: false,
  });

  const [services, setServices] = useState<Record<ServiceKey, boolean>>({
    PrivateChef: false,
    Chauffeur: false,
    BoatRental: false,
    InHouseSpa: false,
  });

  const handleFeatureChange = (feature: FeatureKey) => {
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [feature]: !prevFeatures[feature],
    }));
  };

  const handleServiceChange = (service: ServiceKey) => {
    setServices((prevServices) => ({
      ...prevServices,
      [service]: !prevServices[service],
    }));
  };

  const handleApply = () => {
    onApply({ priceRange, guests, features, services });
    onClose();
  };

  const handleClear = () => {
    setPriceRange({ min: 0, max: 10000 });
    setGuests("Any");
    setFeatures({
      OceanView: false,
      PrivatePool: false,
      Helipad: false,
      RooftopTerrace: false,
    });
    setServices({
      PrivateChef: false,
      Chauffeur: false,
      BoatRental: false,
      InHouseSpa: false,
    });
  };

  if (!isOpen) return null;

  // Options for the guest selector
  const guestOptions = [
    { value: "Any", label: "Any" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "4", label: "4" },
    { value: "8+", label: "8+" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
        <h2 className="text-lg font-semibold mb-4">Filter Options</h2>

        {/* Price Range using React-Range */}
        <Range
          step={500}
          min={0}
          max={10000}
          values={[priceRange.min, priceRange.max]}
          onChange={(values) =>
            setPriceRange({ min: values[0], max: values[1] })
          }
          renderTrack={({ props, children }) => {
            // Calculate the width of the filled track
            const filledWidth =
              ((priceRange.max - priceRange.min) / (10000 - 0)) * 100;
            return (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  backgroundColor: "#ddd",
                  borderRadius: "4px",
                  position: "relative",
                }}
              >
                {/* Custom filled track */}
                <div
                  style={{
                    position: "absolute",
                    left: `${((priceRange.min - 0) / (10000 - 0)) * 100}%`, // This ensures the fill starts from the correct position
                    top: "0",
                    height: "6px",
                    backgroundColor: "#4fd1c5", // Color of the filled part
                    borderRadius: "4px",
                    width: `${filledWidth}%`, // Fill width from min to max
                  }}
                />
                {children}
              </div>
            );
          }}
          renderThumb={({ props }) => {
            return (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "20px",
                  width: "20px",
                  borderRadius: "10px",
                  backgroundColor: "#4fd1c5",
                }}
              />
            );
          }}
        />
        <div className="flex justify-between mt-2">
          <span>${priceRange.min}</span>
          <span>${priceRange.max}</span>
        </div>

        {/* Number of Guests using React-Select */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Number of Guests</label>
          <Select
            value={guestOptions.find((option) => option.value === guests)}
            onChange={(selectedOption) =>
              setGuests(selectedOption?.value || "Any")
            }
            options={guestOptions}
            getOptionLabel={(e) => e.label}
            getOptionValue={(e) => e.value}
            className="react-select-container"
          />
        </div>

        {/* Property Features */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Property Features</label>
          <div className="space-y-1">
            {(Object.keys(features) as FeatureKey[]).map((feature) => (
              <div key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  checked={features[feature]}
                  onChange={() => handleFeatureChange(feature)}
                  className="mr-2"
                />
                <label>{feature.replace(/([A-Z])/g, " $1")}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Services</label>
          <div className="space-y-1">
            {(Object.keys(services) as ServiceKey[]).map((service) => (
              <div key={service} className="flex items-center">
                <input
                  type="checkbox"
                  checked={services[service]}
                  onChange={() => handleServiceChange(service)}
                  className="mr-2"
                />
                <label>{service.replace(/([A-Z])/g, " $1")}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>

          {/* New Clear Button */}
          <button
            onClick={handleClear}
            className="px-4 py-2 text-gray-400 underline"
          >
            Clear
          </button>

          <button
            onClick={handleApply}
            className="px-4 py-2 bg-teal-500 text-white rounded"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
