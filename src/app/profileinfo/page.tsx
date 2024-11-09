// src/app/personal-information.tsx

import React from 'react';

const PersonalInformation: React.FC = () => {
  return (
    <div className="max-w-md mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>
      
      {/* Profile Image */}
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
          <img src="/path/to/profile-image.jpg" alt="Profile" className="object-cover w-full h-full" />
        </div>
      </div>

      {/* Separator */}
      <hr className="border-gray-300 opacity-50 mb-6" />

      {/* Name Section */}
      <h2 className="text-lg font-semibold mb-2">Name</h2>
      <input
        type="text"
        value="Sara Nilsson"
        disabled
        className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-500 mb-4"
      />

      {/* Email Section */}
      <h2 className="text-lg font-semibold mb-2">Email</h2>
      <input
        type="email"
        value="sara.nilsson@example.com"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {/* Password Section */}
      <h2 className="text-lg font-semibold mb-2">Password</h2>
      <input
        type="password"
        value="********"
        disabled
        className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-500"
      />
    </div>
  );
};

export default PersonalInformation;
