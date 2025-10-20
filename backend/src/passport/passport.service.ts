import { PrismaClient } from "@prisma/client";

export class PassportService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async doesUserExist(profile: any) {
        const providerId = profile.id;
        const provider = profile.provider || "google";
        const email = profile.emails?.[0]?.value;

        let user = await this.prisma.user.findFirst({
            where: { providerId, provider },
            include: { student: true, creator: true },
        });


        if (!user && email) {
            user = await this.prisma.user.findUnique({
                where: { email },
                include: { student: true, creator: true },
            });
        }

        return user;
    }

    async createStudentUser(email: string, profile: any) {
        return await this.prisma.user.create({
            data: {
                email,
                password: "",
                role: "STUDENT",
                providerId: profile.id,
                provider: profile.provider,
                student: {
                    create: {
                        first_name: profile.name?.givenName || "N/A",
                        last_name: profile.name?.familyName || "N/A",
                        phone: "N/A",
                        address: "N/A",
                    },
                },
            },
            include: { student: true, creator: true },
        });
    }

    async createCreatorUser(email: string, profile: any) {
        return await this.prisma.user.create({
            data: {
                email,
                password: "", 
                role: "CREATOR",
                providerId: profile.id,
                provider: profile.provider,
                creator: {
                    create: {
                        first_name: profile.name?.givenName || "N/A",
                        last_name: profile.name?.familyName || "N/A",
                        phone: "N/A",
                        address: "N/A",
                    },
                },
            },
            include: { student: true, creator: true },
        });
    }


}