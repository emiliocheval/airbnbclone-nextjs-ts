"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs'; // Import Clerk's useUser hook

interface User {
  username: string;
  name: string;
  email: string;
  profileImageUrl: string;
}

const PersonalInformation: React.FC = () => {
  const { user } = useUser(); // Get the authenticated user from Clerk
  const [userData, setUserData] = useState<User | null>(null);

  const fetchUser = async (userId: string) => {
    const response = await fetch(`/api/auth/user?id=${userId}`, {
      method: 'GET',
    });
  
    if (response.ok) {
      const data = await response.json();
      setUserData(data); // Update the user data in your state
    } else {
      console.error('Failed to fetch user data', response.statusText);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUser(user.id); // Fetch user data only if user.id is available
    }
  }, [user]); // Only run this effect when `user` changes

  // If user is not available or data is still being fetched
  if (!user) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Loading user data...</div>;
  }
  
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>

      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
          <img
            src={ 'https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp'}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <hr className="border-gray-300 opacity-50 mb-6" />

      <h2 className="text-lg font-semibold mb-2">Name</h2>
      <input
        type="text"
        value={userData?.username || ''}
        disabled
        className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-500 mb-4"
      />

      <h2 className="text-lg font-semibold mb-2">Email</h2>
      <input
        type="email"
        value={userData?.email || ''}
        disabled
        className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-500 mb-4"
      />

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
