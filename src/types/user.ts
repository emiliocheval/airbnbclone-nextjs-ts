import { Booking } from "./booking";

export interface User {
    id: string;           // Internal user ID (this is generated in your app)
    email: string;
    clerkUserId: string;  // Clerk user ID to track users authenticated via Clerk
    bookings: Booking[];  // Array of bookings related to this user
}
