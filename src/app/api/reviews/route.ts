import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { propertyId, rating, comment, userName } = await req.json();

    // Basic validation for required fields
    if (!propertyId || !rating || !comment || !userName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new review in the database
    const review = await prisma.reviews.create({
      data: {
        propertyId,
        rating: parseInt(rating, 10), // Ensure `rating` is an integer
        comment,
        userName,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { message: "Error creating review" },
      { status: 500 }
    );
  }
}

// GET method to fetch reviews for a specific property
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url); // Get the search params from the URL
    const propertyId = searchParams.get("propertyId"); // Fetch the `propertyId` parameter

    if (!propertyId) {
      return NextResponse.json(
        { error: "Missing propertyId parameter" },
        { status: 400 }
      );
    }

    // Fetch reviews for the specific property
    const reviews = await prisma.reviews.findMany({
      where: {
        propertyId: parseInt(propertyId), // Ensure `propertyId` is an integer
      },
      include: {
        // Include related user data if needed
        // user: true,
      },
    });

    if (reviews.length === 0) {
      return NextResponse.json({ message: "No reviews found for this property" }, { status: 404 });
    }

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { message: "Error fetching reviews" },
      { status: 500 }
    );
  }
}