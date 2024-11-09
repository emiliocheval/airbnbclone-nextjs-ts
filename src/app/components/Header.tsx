// app/components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { FaHome, FaHeart, FaSuitcase, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#f1f1f1] text-white flex justify-around items-center py-2 shadow-xl ">
      <Link href="/" className="flex flex-col items-center space-y-1">
        <FaHome className='text-gray-600'  size={24} />
        <span className="text-xs text-gray-600">Explore</span>
      </Link>
      <Link href="/favorites" className="flex flex-col items-center space-y-1">
        <FaHeart className='text-gray-600' size={24} />
        <span className="text-xs text-gray-600">Favorites</span>
      </Link>
      <Link href="/trips" className="flex flex-col items-center space-y-1">
        <FaSuitcase className='text-gray-600' size={24} />
        <span className="text-xs text-gray-600">Trips</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center space-y-1">
        <FaUser className='text-gray-600' size={24} />
        <span className="text-xs text-gray-600">Profile</span>
      </Link>
    </nav>
  );
};

export default Header;
