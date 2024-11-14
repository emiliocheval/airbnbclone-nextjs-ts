import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/client'; // Make sure you have a prisma client instance in your lib folder
import fs from 'fs';
import path from 'path';
import { IncomingForm, File } from 'formidable';
import { v4 as uuidv4 } from 'uuid';
import { IncomingMessage } from 'http'; // Import IncomingMessage from 'http'


// Setup formidable to handle file uploads
export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing for file uploads
  },
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const clerkUserId = url.searchParams.get('id'); // Access query parameter 'id'

  if (!clerkUserId) {
    return NextResponse.json({ error: 'ClerkUser ID is missing' }, { status: 400 });
  }

  try {
    // Fetch user data using Prisma
    const userData = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}

