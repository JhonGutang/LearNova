"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
function normalizeCreatorProfile(creator, user) {
    return {
        __typename: "CreatorProfile",
        id: creator.id,
        userId: user.id,
        firstName: creator.firstName,
        lastName: creator.lastName,
        middleName: creator.middleName,
        email: user.email,
        phone: creator.phone,
        address: creator.address,
        createdAt: creator.createdAt,
    };
}
function normalizeStudentProfile(student, user) {
    return {
        __typename: "StudentProfile",
        id: student.id,
        userId: user.id,
        firstName: student.firstName,
        lastName: student.lastName,
        middleName: student.middleName,
        email: user.email,
        phone: student.phone,
        address: student.address,
        createdAt: student.createdAt,
    };
}
class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCurrentUserProfile(userId, role) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return null;
        }
        if (role === "CREATOR") {
            const creator = await this.prisma.creator.findUnique({
                where: { user_id: user.id },
            });
            if (!creator)
                return null;
            return normalizeCreatorProfile(creator, user);
        }
        if (role === "STUDENT") {
            const student = await this.prisma.student.findUnique({
                where: { user_id: user.id },
            });
            if (!student)
                return null;
            return normalizeStudentProfile(student, user);
        }
        return null;
    }
    async authenticateUser(input, context) {
        const user = await this.prisma.user.findUnique({
            where: { email: input.email },
        });
        if (!user) {
            return false;
        }
        const isPasswordValid = await bcrypt_1.default.compare(input.password, user.password);
        if (!isPasswordValid) {
            return false;
        }
        if (input.role === "CREATOR") {
            const creator = await this.prisma.creator.findUnique({
                where: { user_id: user.id },
            });
            if (!creator)
                return false;
            if (context && context.session) {
                context.session.userId = user.id;
                context.session.role = input.role;
                context.session.creatorId = creator.id;
            }
            return true;
        }
        if (input.role === "STUDENT") {
            const student = await this.prisma.student.findUnique({
                where: { user_id: user.id },
            });
            if (!student)
                return false;
            if (context && context.session) {
                context.session.userId = user.id;
                context.session.role = input.role;
                context.session.studentId = student.id;
            }
            return true;
        }
        return false;
    }
    async changePassword(input) {
        const user = await this.prisma.user.findUnique({
            where: { email: input.email },
        });
        if (!user) {
            return false;
        }
        const hashedPassword = await bcrypt_1.default.hash(input.password, 10);
        await this.prisma.user.update({
            where: { email: input.email },
            data: { password: hashedPassword },
        });
        return true;
    }
}
exports.AuthService = AuthService;
