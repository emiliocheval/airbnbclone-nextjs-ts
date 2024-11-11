import { NextApiResponse } from 'next';
import prisma from '../../../../../prisma/client'; // Ensure Prisma client is properly imported
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { clerkUserId, email, username } = await req.json(); // Parse JSON from the request body

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 200 });
    }

    // Create a new user record
    const newUser = await prisma.user.create({
      data: {
        clerkUserId,
        email,
        username: username || 'anonymous', // Add username with fallback to 'anonymous'
      } as any, // Cast the data to `any` type if you continue to face the type issue
    });

    return NextResponse.json(
      { message: 'User registered successfully', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
  }
}
