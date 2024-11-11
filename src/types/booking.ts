import { ReactNode } from "react";

export interface Booking {
  id: number;
  propertyId: number;
  userId: string; // Change this from number to string
  checkIn: Date;
  checkOut: Date;
  property: {
    imageUrl: string;
    amenities: ReactNode;
    location: ReactNode;
    price: ReactNode;
    title: string; id: number 
}; 
  user: { id: string }; // Also change this if it reflects the userId
  guests: number;
}
