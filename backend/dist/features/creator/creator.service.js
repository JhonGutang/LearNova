"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatorService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const graphql_1 = require("../../generated/graphql");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Normalizer function to convert Prisma creator + user to CreatorProfile
function normalizeCreatorProfile(creator, user) {
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
class CreatorService {
    async getCreator(id) {
        const user = await prisma_1.default.user.findUnique({
            where: { id: id },
            include: { creator: true },
        });
        if (!user || user.role !== graphql_1.Role.Creator || !user.creator) {
            return null;
        }
        return normalizeCreatorProfile(user.creator, user);
    }
    async getCreators() {
        const creators = await prisma_1.default.creator.findMany({
            include: { user: true },
            where: {
                user: {
                    role: graphql_1.Role.Creator,
                },
            },
        });
        return creators.map((creator) => normalizeCreatorProfile(creator, creator.user));
    }
    async createCreator(input) {
        const hashedPassword = await bcrypt_1.default.hash(input.password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                email: input.email,
                password: hashedPassword,
                role: graphql_1.Role.Creator,
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
exports.CreatorService = CreatorService;
