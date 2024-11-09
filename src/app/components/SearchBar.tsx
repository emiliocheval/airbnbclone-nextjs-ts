// components/SearchBar.tsx
import React, { useState } from "react";
import FilterModal from "./FilterModal";

const SearchBar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleApplyFilters = (filters: any) => {
    console.log("Applied Filters:", filters);
    // Add logic to handle search with filters
  };

  return (
    <div className="relative flex items-center w-full max-w-lg mx-auto">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 border rounded-l-md"
      />

      {/* Filter Button */}
      <button
        onClick={handleFilterClick}
        className="px-4 py-2 bg-gray-200 rounded-r-md"
      >
        Filter
      </button>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApply={handleApplyFilters}
      />
    </div>
  );
};

export default SearchBar;
