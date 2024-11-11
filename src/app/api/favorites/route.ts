import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';

// POST - Add/Remove favorite
export async function POST(request: Request) {
  try {
    const { userId, propertyId } = await request.json();

    // Validate incoming parameters
    if (!userId || !propertyId) {
      return NextResponse.json({ message: "Missing parameters" }, { status: 400 });
    }

    // Check if user exists and retrieve current favorites
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { favorites: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the property is already a favorite
    const isFavorite = user.favorites.some((property) => property.id === propertyId);

    if (isFavorite) {
      // Remove from favorites
      await prisma.user.update({
        where: { id: userId },
        data: {
          favorites: {
            disconnect: { id: propertyId },
          },
        },
      });
      return NextResponse.json({ message: "Favorite removed", isFavorited: false }, { status: 200 });
    } else {
      // Add to favorites
      await prisma.user.update({
        where: { id: userId },
        data: {
          favorites: {
            connect: { id: propertyId },
          },
        },
      });
      return NextResponse.json({ message: "Favorite added", isFavorited: true }, { status: 200 });
    }
  } catch (error) {
    console.error("Error managing favorites:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET - Retrieve favorites for a user
export async function GET(request: Request) {
  try {
    // Extract query parameters from the URL
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    // Log the incoming parameters for debugging
    console.log("Received parameters:", { userId });

    // Validate parameters
    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    // Check if user exists and retrieve current favorites
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { favorites: true },
    });

    if (!user) {
      console.log("User not found:", userId); // Log user not found
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return the list of favorites (including their ids)
    return NextResponse.json({ favorites: user.favorites }, { status: 200 });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
