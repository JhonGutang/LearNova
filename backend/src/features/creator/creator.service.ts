import prisma from "../../config/prisma";
import { CreateCreatorInput, Creator } from "../../generated/graphql"
import bcrypt from "bcrypt";

interface CreatorServiceProps {
    getCreator(id: number): Promise<Creator | null>
    getCreators(): Promise<Creator[]>
    createCreator(input: CreateCreatorInput): Promise<Creator>
}

export class CreatorService implements CreatorServiceProps {
    async getCreator(id: number): Promise<Creator | null> {
        return await prisma.creator.findUnique({
            where: { id: id },
            include: { contact_information: true }
        });
    }

    async getCreators(): Promise<Creator[]> {
        return await prisma.creator.findMany({
            include: { contact_information: true }
        });
    }

    async createCreator(input: CreateCreatorInput): Promise<Creator> {
        // Hash the password before storing in the database
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
                            address: input.contact_information.address
                        }
                    }
                    : undefined
            },
            include: { contact_information: true }
        });
    }
}
