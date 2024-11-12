import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';
import { NextRequest } from 'next/server';


export async function POST(req: NextRequest) {
  const { userId, propertyId } = await req.json();

  try {
    // Find the internal user `id` using Clerk's `userId` (clerkUserId)
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
    }

    // Check if the favorite already exists
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId: user.id,
        propertyId,
      },
    });

    if (existingFavorite) {
      // If it exists, delete the favorite
      await prisma.favorite.delete({
        where: {
          id: existingFavorite.id,
        },
      });
      return NextResponse.json({ message: 'Favorite removed' }, { status: 200 });
    } else {
      // If it doesn't exist, create a new favorite
      const favorite = await prisma.favorite.create({
        data: {
          userId: user.id,
          propertyId,
        },
      });
      return NextResponse.json(favorite, { status: 201 });
    }
  } catch (error) {
    console.error('Error in POST route:', error);
    return NextResponse.json({ error: 'Error toggling favorite' }, { status: 500 });
  }
}

// Add DELETE handler
export async function DELETE(req: NextRequest) {
  const { userId, propertyId } = await req.json();

  try {
    // Find the internal user `id` using Clerk's `userId` (clerkUserId)
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
    }

    // Check if the favorite exists
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId: user.id,
        propertyId,
      },
    });

    if (!existingFavorite) {
      return NextResponse.json({ error: 'Favorite not found' }, { status: 404 });
    }

    // Delete the favorite
    await prisma.favorite.delete({
      where: {
        id: existingFavorite.id,
      },
    });

    return NextResponse.json({ message: 'Favorite removed' }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE route:', error);
    return NextResponse.json({ error: 'Error removing favorite' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const clerkUserId = url.searchParams.get("userId");

  if (!clerkUserId) {
    return new Response(JSON.stringify({ error: "Invalid or missing userId" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Fetch the internal `userId` from Clerk's `userId`
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Now fetch the favorites for this internal user ID
    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id }, // use internal user ID
      include: {
        property: {
          include: {
            reviews: true, // Include reviews here
          },
        },
      },
    });

    return new Response(JSON.stringify(favorites), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


