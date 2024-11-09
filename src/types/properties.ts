import { reviews } from './reviews';  // Assuming the Review model is imported from another file
import { Booking } from './booking';  // Assuming the Booking model is imported from another file

export interface Property {
    features: any;
    id: number;  // Matches the Int type in Prisma
    title: string;  // Changed from 'name' to 'title' to match Prisma model
    description: string;
    price: number;  // Changed from string to number
    location: string;
    amenities: any[];  // Changed to an array of any (or Json if using a specific type for JSON)
    houseRules: any[];  // Array of JSON data
    safetyFeatures: any[];  // Array of JSON data
    propertyFeatures: any[];  // Array of JSON data
    services: any[];  // Array of JSON data
    imageUrl: string | null;  // Change to string | null to match the data
    host: string;  // Mockup host name
    reviews: reviews[];  // Renamed to match Prisma model (capitalized 'Review')
    guests: number;  // New field for number of guests
    bedrooms: number;  // New field for number of bedrooms
    beds: number;     // New field for number of beds
    bathrooms: number; // New field for number of bathrooms
    bookings: Booking[];  // Added bookings field
}

