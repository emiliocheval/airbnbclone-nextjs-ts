// src/app/profile.tsx

"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser, useClerk } from '@clerk/nextjs'; // Import useClerk hook for signing out
import { useRouter } from 'next/navigation'; // Import useRouter hook for redirecting

interface User {
  username: string;
  name: string;
  email: string;
  profileImageUrl: string;
}

const Profile: React.FC = () => {
  const { user } = useUser();
  const { signOut } = useClerk(); // Use Clerk's signOut method
  const router = useRouter(); // Use Next.js router for redirection
  const [userData, setUserData] = useState<User | null>(null);

  const fetchUser = async (userId: string) => {
    const response = await fetch(`/api/auth/user?id=${userId}`, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      setUserData(data);
    } else {
      console.error('Failed to fetch user data', response.statusText);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUser(user.id);
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut(); // Sign the user out
    router.push("/"); // Redirect to the homepage
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      {/* Profile Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>

      {/* Profile Image and Name */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-2">
          <img
            src={userData.profileImageUrl || 'https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp'}
            alt={userData.name}
            className="object-cover w-full h-full"
          />
        </div>
        <p className="text-lg font-semibold">{userData.username || "User"}</p>
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

      <Link href="/paymentmethod">
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
      <div
        className="text-sm text-center text-red-500 cursor-pointer hover:underline mt-6"
        onClick={handleSignOut} // Trigger sign out
      >
        Sign Out
      </div>
    </div>
  );
};

export default Profile;
