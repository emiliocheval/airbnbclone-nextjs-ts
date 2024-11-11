// src/app/api/bookings/[id]/route.ts
import prisma from "../../../../../prisma/client"; // Adjust this path as necessary

export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = context.params; // Access the dynamic `id` from params

  if (!id) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), {
      status: 400,
    });
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: Number(id) },
      include: { property: true }, // Include related property data
    });

    if (!booking) {
      return new Response(JSON.stringify({ error: "Booking not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(booking), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

// Delete booking by ID
export async function DELETE(request: Request, context: { params: { id: string } }) {
  const { id } = context.params; // Access the dynamic `id` from params

  if (!id) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), {
      status: 400,
    });
  }

  try {
    const bookingToDelete = await prisma.booking.findUnique({
      where: { id: Number(id) },
    });

    if (!bookingToDelete) {
      return new Response(JSON.stringify({ error: "Booking not found" }), {
        status: 404,
      });
    }

    // Delete the booking
    await prisma.booking.delete({
      where: { id: Number(id) },
    });

    return new Response(JSON.stringify({ message: "Booking deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
