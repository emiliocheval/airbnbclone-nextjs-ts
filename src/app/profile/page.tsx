// src/app/profile.tsx

import React from 'react';
import Link from 'next/link';

const Profile: React.FC = () => {
  return (
    <div className="max-w-md mx-auto p-6">
      {/* Profile Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>
      
      {/* Profile Image and Name */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-2">
          <img src="/path/to/profile-image.jpg" alt="Sara Nilsson" className="object-cover w-full h-full" />
        </div>
        <p className="text-lg font-semibold">Sara Nilsson</p>
      </div>
      
      {/* Separator */}
      <hr className="border-gray-300 opacity-50 mb-6" />

      {/* Account Settings Section */}
      <h2 className="text-lg font-semibold mb-4">Account Settings</h2>

      <Link href="/profileinfo">
        <div className="flex justify-between items-center py-3 cursor-pointer hover:bg-gray-50">
          <span className="text-sm">Personal Information</span>
        </div>
      </Link>
      <hr className="border-gray-300 opacity-50" />

      <Link href="/payment">
        <div className="flex justify-between items-center py-3 cursor-pointer hover:bg-gray-50">
          <span className="text-sm">Payments</span>
        </div>
      </Link>
      <hr className="border-gray-300 opacity-50 mb-6" />

      {/* Law Section */}
      <h2 className="text-lg font-semibold mb-4">Law</h2>

      <Link href="/terms">
        <div className="flex justify-between items-center py-3 cursor-pointer hover:bg-gray-50">
          <span className="text-sm">Terms and Services</span>
        </div>
      </Link>
      <hr className="border-gray-300 opacity-50" />

      <Link href="/policy">
        <div className="flex justify-between items-center py-3 cursor-pointer hover:bg-gray-50">
          <span className="text-sm">Privacy Policy</span>
        </div>
      </Link>
      <hr className="border-gray-300 opacity-50 mb-6" />

      {/* Sign Out */}
      <div className="text-sm text-center text-red-500 cursor-pointer hover:underline mt-6">
        Sign Out
      </div>
    </div>
  );
};

export default Profile;
