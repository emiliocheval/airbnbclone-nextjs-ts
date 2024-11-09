import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create mock properties with the desired structure
   
    const property3 = await prisma.property.create({
        data: {
            title: "Mountain Retreat Cabin",
            description: "This secluded mountain cabin offers the perfect escape with breathtaking views of the surrounding forests and mountains. Featuring a cozy wood-burning fireplace, hot tub, and outdoor grill, it's the ideal retreat for nature lovers and hikers.",
            amenities: ["Wi-Fi", "Fireplace", "Hot Tub", "Grill", "Hiking Trails"],
            houseRules: ["No Smoking", "No Pets", "Quiet Hours 10pm - 7am"],
            safetyFeatures: ["Fire Extinguisher", "Smoke Detector", "First Aid Kit"],
            propertyFeatures: ["Mountain View", "Secluded Location"],
            services: ["Private Chef", "Housekeeping"],
            price: 2200,
            location: "Aspen, Colorado, USA",
            host: "Mike Johnson",
            imageUrl: 'https://wallpapers.com/images/high/dark-two-story-luxury-house-5wfnwqe6ie6t9l92.webp',
            guests: 6,     // Added
            bedrooms: 3,   // Added
            beds: 5,       // Added
            bathrooms: 2,  // Added
        },
    });

    const property4 = await prisma.property.create({
        data: {
            title: "Urban Penthouse Suite",
            description: "An exclusive penthouse suite in the heart of the city, offering luxury living with stunning views of the skyline. The penthouse comes with a private rooftop terrace, home theater system, and a chef's kitchen. Perfect for city enthusiasts and high-end travelers.",
            amenities: ["Wi-Fi", "Home Theater", "Private Rooftop", "Chef's Kitchen", "Gym"],
            houseRules: ["No Smoking", "No Pets", "No Parties"],
            safetyFeatures: ["Smoke Detector", "Fire Extinguisher", "Security Cameras"],
            propertyFeatures: ["City View", "Penthouse Suite"],
            services: ["Concierge", "In-house Spa"],
            price: 7500,
            location: "New York City, NY, USA",
            host: "Emily Taylor",
            imageUrl: 'https://www.hollywoodreporter.com/wp-content/uploads/2023/07/1156_SanYsidroDrive_07_2048px-H-2023.jpg?w=1296&h=730&crop=1&resize=1000%2C563',
            guests: 4,     // Added
            bedrooms: 2,   // Added
            beds: 3,       // Added
            bathrooms: 2,  // Added
        },
    });

    // Log the created properties
    console.log({ property3, property4 });
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
