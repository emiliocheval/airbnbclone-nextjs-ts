// src/types/favorite.ts

import { Property, User } from '@prisma/client';

export interface Favorite {
  id: number;
  userId: string; // Assuming it's a string based on your schema
  propertyId: number;
  createdAt: Date;
  user: User; // Associated User object
  property: Property; // Associated Property object
}
