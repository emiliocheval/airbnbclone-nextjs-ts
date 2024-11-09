// app/api/properties/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma/client';

// Add CORS headers for all responses
function setCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

// Handle GET request
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // The property ID from the URL

  try {
    const property = await prisma.property.findUnique({
      where: {
        id: parseInt(id), // Ensure the ID is treated as a number
      },
      include: {
        bookings: true, // Include related data if needed
        reviews: true,
      },
    });

    if (property) {
      const response = NextResponse.json(property);
      return setCorsHeaders(response);
    } else {
      const response = NextResponse.json({ error: 'Property not found' }, { status: 404 });
      return setCorsHeaders(response);
    }
  } catch (error) {
    const response = NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
    return setCorsHeaders(response);
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  const response = NextResponse.json(null, { status: 204 });
  return setCorsHeaders(response);
}
