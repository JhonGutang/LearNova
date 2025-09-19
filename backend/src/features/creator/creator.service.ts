import prisma from "../../config/prisma";
import {
  AuthenticateCreatorInput,
  CreateCreatorInput,
  Creator,
} from "../../generated/graphql";
import bcrypt from "bcrypt";

interface CreatorServiceProps {
  getCreator(id: number): Promise<Creator | null>;
  getCreators(): Promise<Creator[]>;
  createCreator(input: CreateCreatorInput): Promise<Creator>;
  validateCredentials(input: AuthenticateCreatorInput): Promise<Creator | null>;
}

export class CreatorService implements CreatorServiceProps {
  async getCreator(id: number): Promise<Creator | null> {
    return await prisma.creator.findUnique({
      where: { id: id },
      include: { contact_information: true },
    });
  }

  async getCreators(): Promise<Creator[]> {
    return await prisma.creator.findMany({
      include: { contact_information: true },
    });
  }

  async createCreator(input: CreateCreatorInput): Promise<Creator> {
    const hashedPassword = await bcrypt.hash(input.password, 10);

    return await prisma.creator.create({
      data: {
        first_name: input.first_name,
        last_name: input.last_name,
        middle_name: input.middle_name,
        password: hashedPassword,
        contact_information: input.contact_information
          ? {
              create: {
                phone: input.contact_information.phone,
                email: input.contact_information.email,
                address: input.contact_information.address,
              },
            }
          : undefined,
      },
      include: { contact_information: true },
    });
  }

  async validateCredentials(
    input: AuthenticateCreatorInput
  ): Promise<Creator | null> {
    const creator = await prisma.creator.findFirst({
      where: {
        contact_information: {
          email: input.email,
        },
      },
      include: {
        contact_information: true,
      },
    });

    if (!creator) return null;

    const passwordMatch = await bcrypt.compare(
      input.password,
      creator.password
    );

    if (!passwordMatch) return null;

    return creator;
  }
}
