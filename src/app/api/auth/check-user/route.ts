// src/app/api/auth/check-user/route.ts

import prisma from '../../../../../prisma/client'; // Update path based on your structure
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { clerkUserId } = await req.json();

    // Check if user exists in the database
    const userExists = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    return NextResponse.json({ exists: !!userExists });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to check user' }, { status: 500 });
  }
}
