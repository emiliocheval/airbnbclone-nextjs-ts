import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create mock properties with the desired structure
   

    const property6 = await prisma.property.create({
        data: {
          title: "Villa Ocean Pearl",
          description: "A luxurious villa located on a private beach with breathtaking ocean views. This retreat offers world-class amenities and personalized services, perfect for a relaxing getaway.",
          amenities: ["Wi-Fi", "Private Pool", "Beach Access"],
          houseRules: ["No Smoking", "No Loud Music After 10 PM"],
          safetyFeatures: ["Fire Extinguisher", "First Aid Kit"],
          propertyFeatures: ["Ocean View", "Private Pool"],  // Matches features
          services: ["Boat Rental", "Chauffeur"],          // Matches services
          price: 12000,
          location: "Malibu, California",
          host: "James Carter",
          imageUrl: "https://dropinblog.net/34246798/files/featured/Modern_Mansion.jpg",
          guests: 8,
          bedrooms: 4,
          beds: 5,
          bathrooms: 4,
        },
      });
    // Log the created properties
    console.log({property6 });
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
