"use client"; // Ensure client-side rendering

import './globals.css';
import Header from './components/Header';
import { usePathname } from 'next/navigation'; // Import usePathname
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hides the navbar on property detail pages (or any other route conditions you want)
  const showNavbar = !pathname.startsWith('/properties/');

  return (
    <ClerkProvider>
    <html lang="en">
      <body className="relative pb-16"> {/* Add padding to avoid overlapping the content */}
        <main>{children}</main>

        {/* Conditionally render the navbar */}
        {showNavbar && <Header />}
      </body>
    </html>
    </ClerkProvider>
  );
}
