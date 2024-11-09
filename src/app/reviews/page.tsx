"use client";

import React from 'react';
import Link from 'next/link'; // Import Link from Next.js

export default function Reviews() {
    // Mock data for reviews
    const reviews = [
        {
            reviewer: 'Jane Doe',
            date: 'January 2023',
            text: 'This property was absolutely amazing! From the moment we arrived, the host made us feel right at home. The villa was spotless, beautifully decorated, and fully equipped with everything we needed. The views were breathtaking.',
        },
        {
            reviewer: 'John Smith',
            date: 'February 2023',
            text: 'A wonderful experience! The location was perfect for our family vacation, and the amenities exceeded our expectations.',
        },
        {
            reviewer: 'Emily Johnson',
            date: 'March 2023',
            text: 'We had a fantastic stay! The hosts were very accommodating, and the property was clean and well-maintained.',
        },
        {
            reviewer: 'Michael Brown',
            date: 'April 2023',
            text: 'This place is a hidden gem! We loved the tranquility and the beautiful surroundings.',
        },
        {
            reviewer: 'Sarah Wilson',
            date: 'May 2023',
            text: 'An unforgettable experience! The views were stunning, and the service was exceptional.',
        },
        {
            reviewer: 'David Lee',
            date: 'June 2023',
            text: 'We highly recommend this property! It was everything we hoped for and more.',
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-4 pb-10">
            <div className="flex items-center mb-4">
                <Link href="/properties/1" passHref> {/* Replace with your desired URL */}
                    <button className="flex items-center px-2 py-1 border border-gray-300 rounded-md text-gray-800 mr-4">
                        <i className="fas fa-arrow-left"></i> {/* Arrow Icon */}
                    </button>
                </Link>
                <h1 className="text-3xl font-bold">Reviews</h1>
            </div>
            <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                    <h2 className="text-lg font-semibold">4.7</h2>
                    <div className="my-2 flex items-center ml-2">
                        <span className="block w-2 h-2 bg-black rounded-full mr-2"></span>
                        <p className="text-gray-600">5 reviews</p>
                    </div>
                </div>
                {/* Filter Button */}
                <button className="px-4 py-2 border border-gray-300 rounded-full flex items-center">
                    Most Recent <i className="fas fa-chevron-down ml-2"></i>
                </button>
            </div>

            {/* Space between title and content */}
            <div className="mt-6 space-y-4">
                {reviews.map((review, index) => (
                    <div key={index} className="border p-4 rounded-lg mb-4">
                        <div className="flex items-center mb-2">
                            <img src="/images/profile-pic.jpg" alt="Reviewer" className="w-8 h-8 rounded-full" />
                            <div className="ml-2">
                                <p className="font-bold">{review.reviewer}</p>
                                <p className="text-gray-500 text-sm">{review.date}</p>
                            </div>
                        </div>
                        <p className="text-gray-700">{review.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
