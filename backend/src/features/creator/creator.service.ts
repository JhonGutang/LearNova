
import prisma from "../../config/prisma";
import {
  CreatorProfile,
  CreateCreatorProfileInput,
  Role,
} from "../../generated/graphql";
import bcrypt from "bcrypt";

// Normalizer function to convert Prisma creator + user to CreatorProfile
function normalizeCreatorProfile(creator: any, user: any): CreatorProfile {
  return {
    id: creator.id,
    user_id: user.id,
    first_name: creator.first_name,
    last_name: creator.last_name,
    middle_name: creator.middle_name,
    email: user.email,
    phone: creator.phone,
    address: creator.address,
    created_at: creator.created_at,
    updated_at: creator.updated_at,
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
            first_name: input.first_name,
            last_name: input.last_name,
            middle_name: input.middle_name,
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
