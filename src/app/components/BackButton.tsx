// components/BackButton.tsx

"use client";  // Mark this component as client-side

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = () => {
  return (
    <button
  onClick={() => window.history.back()} // Use window.history.back() for navigating back
  className="text-white bg-gray-800 w-12 h-12 flex items-center justify-center rounded-full absolute top-4 left-4 z-10 hover:bg-gray-700 bg-opacity-60"
>
  <FontAwesomeIcon icon={faArrowLeft} size="lg" />
</button>

  
  );
};

export default BackButton;
