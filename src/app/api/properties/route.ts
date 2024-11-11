// src/app/api/properties/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/client'; // Adjust the path if needed

// Handle GET request to fetch all properties with reviews
export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      include: {
        reviews: true, // Include reviews for each property
        bookings: true, // Include related data like bookings if needed
      },
    });
    return NextResponse.json(properties); // Return all properties with reviews
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}


// Handle POST request to create a new property
export async function POST(request: Request) {
  const data = await request.json();
  const newProperty = await prisma.property.create({ data });
  return NextResponse.json(newProperty);
}

// Handle DELETE request to delete all properties
export async function DELETE() {
  try {
    // Delete all properties from the property table
    await prisma.property.deleteMany();
    return NextResponse.json({ message: 'All properties deleted successfully' });
  } catch (error) {
    console.error('Error deleting properties:', error);
    return NextResponse.json({ error: 'Failed to delete properties' }, { status: 500 });
  }
}
