import prisma from "../../../../../prisma/client";

// Modify the GET route to check if a specific property is favorited by the user
export async function GET(request: Request) {
    const url = new URL(request.url);
    const clerkUserId = url.searchParams.get("userId");
    const propertyId = url.searchParams.get("propertyId");
  
    if (!clerkUserId || !propertyId) {
      return new Response(JSON.stringify({ error: "Invalid or missing userId or propertyId" }), {
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
  
      // Check if the user has this property in their favorites
      const favorite = await prisma.favorite.findFirst({
        where: {
          userId: user.id,
          propertyId: Number(propertyId), // Convert to number
        },
      });
  
      // Return whether the property is favorited
      return new Response(JSON.stringify({ isFavorited: !!favorite }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching favorite status:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  