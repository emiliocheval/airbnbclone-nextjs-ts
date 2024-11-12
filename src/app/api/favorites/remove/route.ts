import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

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
