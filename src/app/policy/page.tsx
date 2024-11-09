// src/app/policy.tsx

import React from 'react';

const Policy: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Policy</h1>

      {/* Last Update Date */}
      <p className="text-sm text-gray-500 text-center mb-6">Last update: 25/6/2024</p>
      
      {/* Introduction */}
      <p className="text-base mb-6">
        Welcome to LuxeStay! By using our platform, you agree to the following terms. Please read them carefully.
      </p>

      {/* Policy Section */}
      <h2 className="text-lg font-semibold text-blue-500 mb-2">Policy</h2>

      <p className="text-base">
        You must ensure that the property is clean, well-maintained, and in good working order prior to each guest's arrival. Specifically:
      </p>

      <ul className="list-disc list-inside mt-2 mb-6 space-y-2">
        <li>
          The interior and exterior of the property should be presented in a condition that meets or exceeds the expectations set by the listing. Broken appliances, malfunctioning amenities, or unsafe conditions should be addressed immediately.
        </li>
        <li>
          Any issues that arise during a guest’s stay should be addressed promptly. As a host, you should either be available to respond to guest concerns or provide contact information for a local representative who can assist with emergencies or repairs.
        </li>
      </ul>
    </div>
  );
};

export default Policy;
