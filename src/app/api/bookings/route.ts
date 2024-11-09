import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

type ErrorResponse = {
  error: string;
};

type BookingResponse = {
  id: number;
  propertyId: number;
  userId: number;
  checkIn: Date;
  checkOut: Date;
  guests: number;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { propertyId, checkIn, checkOut, guests, userId } = body;

    console.log("Request body:", body);

    // Parse propertyId and guests as integers
    const parsedPropertyId = parseInt(propertyId, 10);
    const parsedGuests = parseInt(guests, 10);

    // Validate parsed propertyId
    if (isNaN(parsedPropertyId)) {
      console.error("Invalid propertyId:", propertyId);
      return NextResponse.json(
        { error: "Property ID must be a valid number" },
        { status: 400 }
      );
    }

    // Validate parsed guests
    if (isNaN(parsedGuests) || parsedGuests <= 0) {
      console.error("Invalid guests value:", guests);
      return NextResponse.json(
        { error: "Number of guests must be greater than 0" },
        { status: 400 }
      );
    }

    // Check that checkIn and checkOut are valid dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      console.error("Invalid check-in or check-out date:", checkIn, checkOut);
      return NextResponse.json(
        { error: "Invalid check-in or check-out date" },
        { status: 400 }
      );
    }

    if (checkInDate >= checkOutDate) {
      console.error(
        "Check-out date must be after check-in date:",
        checkInDate,
        checkOutDate
      );
      return NextResponse.json(
        { error: "Check-out date must be after check-in date" },
        { status: 400 }
      );
    }

    // Validate the property exists
    const propertyExists = await prisma.property.findUnique({
      where: { id: parsedPropertyId },
    });

    if (!propertyExists) {
      console.error("Property not found with ID:", parsedPropertyId);
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Validate that the user exists by checking clerkUserId
    const userExists = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!userExists) {
      console.error("User not found with ID:", userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create the booking
    const newBooking = await prisma.booking.create({
      data: {
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: parsedGuests,
        user: { connect: { clerkUserId: userId } }, // Use clerkUserId here
        property: { connect: { id: parsedPropertyId } },
      },
    });

    console.log("New booking created:", newBooking);
    return NextResponse.json(newBooking, { status: 200 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Error creating booking" },
      { status: 500 }
    );
  }
}

// Add GET method to fetch all bookings
export async function GET(request: NextRequest) {
  try {
    // Fetch all bookings
    const bookings = await prisma.booking.findMany({
      include: {
        user: true, // Include user details (e.g., clerkUserId)
        property: true, // Optionally include property details
      },
    });

    // Return bookings
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Error fetching bookings" },
      { status: 500 }
    );
  }
}
