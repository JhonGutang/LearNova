
import prisma from "../../../config/prisma";
import {
  CreatorProfile,
  CreateCreatorProfileInput,
  Role,
} from "../../../generated/graphql";
import bcrypt from "bcrypt";

// Normalizer function to convert Prisma creator + user to CreatorProfile
function normalizeCreatorProfile(creator: any, user: any): CreatorProfile {
  return {
    id: creator.id,
    userId: user.id,
    firstName: creator.first_name,
    lastName: creator.last_name,
    middleName: creator.middle_name,
    email: user.email,
    phone: creator.phone,
    address: creator.address,
    createdAt: creator.created_at,
  };
}

interface CreatorServiceProps {
  getCreator(id: number): Promise<CreatorProfile | null>;
  getCreators(): Promise<CreatorProfile[]>;
  createCreator(input: CreateCreatorProfileInput): Promise<CreatorProfile>;
}

export class CreatorService implements CreatorServiceProps {
  async getCreator(id: number): Promise<CreatorProfile | null> {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: { creator: true },
    });

    if (!user || user.role !== Role.Creator || !user.creator) {
      return null;
    }

    return normalizeCreatorProfile(user.creator, user);
  }

  async getCreators(): Promise<CreatorProfile[]> {
    const creators = await prisma.creator.findMany({
      include: { user: true },
      where: {
        user: {
          role: Role.Creator,
        },
      },
    });
    return creators.map((creator: any) =>
      normalizeCreatorProfile(creator, creator.user)
    );
  }

  async createCreator(input: CreateCreatorProfileInput): Promise<CreatorProfile> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        role: Role.Creator,
        creator: {
          create: {
            first_name: input.firstName,
            last_name: input.lastName,
            middle_name: input.middleName,
            phone: input.phone,
            address: input.address,
          },
        },
      },
      include: { creator: true },
    });

    return normalizeCreatorProfile(user.creator, user);
  }
}
