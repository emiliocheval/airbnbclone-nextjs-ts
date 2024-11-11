import { reviews } from './reviews';  
import { Booking } from './booking';  
import { User } from './user';

export interface Property {
    features: any;
    id: number;  
    title: string;  
    description: string;
    price: number;  // Changed from string to number
    location: string;
    amenities: any[]; // Array of JSON data
    houseRules: any[];  // Array of JSON data
    safetyFeatures: any[];  // Array of JSON data
    propertyFeatures: any[];  // Array of JSON data
    services: any[];  // Array of JSON data
    imageUrl: string | null;  
    host: string;  
    reviews: reviews[]; 
    guests: number;  
    bedrooms: number;  
    beds: number;     
    bathrooms: number; 
    bookings: Booking[];  
    favorites: User[];
}

