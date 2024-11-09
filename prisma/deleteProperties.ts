// deleteProperties.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteAllProperties() {
  try {
    await prisma.property.deleteMany(); // Deletes all entries in the Property table
    console.log("All properties deleted.");
  } catch (error) {
    console.error("Error deleting properties:", error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllProperties();
