// src/app/api/bookings/[id]/route.ts

import prisma from '../../../../../prisma/client'; // Adjust import path
import { NextResponse, NextRequest } from 'next/server'; // Import NextRequest for type compatibility
import { getAuth } from '@clerk/nextjs/server'; // Use getAuth from Clerk's server import

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const bookingId = parseInt(params.id);
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { property: true },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Check if the booking belongs to the authenticated user
    if (booking.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
