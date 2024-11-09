
// src/app/api/properties/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/client'; // Adjust the path if needed

export async function GET() {
  const properties = await prisma.property.findMany();
  return NextResponse.json(properties);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newProperty = await prisma.property.create({ data });
  return NextResponse.json(newProperty);
}
