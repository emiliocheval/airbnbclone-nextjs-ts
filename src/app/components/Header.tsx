// app/components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCompass, FaRegStar, FaUserCircle } from 'react-icons/fa';
import { MdAirplaneTicket } from "react-icons/md";

const Header = () => {
  const pathname = usePathname(); // Get the current route

  const linkClasses = (route: string) =>
    `flex flex-col items-center space-y-1 ${
      pathname === route ? "text-[#068488]" : "text-gray-600"
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#f1f1f1] text-white flex justify-around items-center py-2 shadow-xl">
      <Link href="/" className={linkClasses("/")}>
        <FaCompass size={24} />
        <span className="text-xs">Explore</span>
      </Link>
      <Link href="/favorites" className={linkClasses("/favorites")}>
        <FaRegStar size={24} />
        <span className="text-xs">Favorites</span>
      </Link>
      <Link href="/trips" className={linkClasses("/trips")}>
        <MdAirplaneTicket size={24} />
        <span className="text-xs">Trips</span>
      </Link>
      <Link href="/profile" className={linkClasses("/profile")}>
        <FaUserCircle size={24} />
        <span className="text-xs">Profile</span>
      </Link>
    </nav>
  );
};

export default Header;
