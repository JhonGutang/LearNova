import { ChangePasswordInput, LoginInput, UserProfile } from "../../generated/graphql";
import bcrypt from "bcrypt";
import { MyContext } from "../../types/context";

interface AuthServiceInterface {
  getCurrentUserProfile(userId: number, role: string): Promise<UserProfile | null >
  authenticateUser(input: LoginInput, context: MyContext): Promise<Boolean>;
  changePassword(input: ChangePasswordInput): Promise<Boolean>;
}

function normalizeCreatorProfile(creator: any, user: any): UserProfile {
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

function normalizeStudentProfile(student: any, user: any): UserProfile {
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


export class AuthService implements AuthServiceInterface {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  async getCurrentUserProfile(userId: number, role: string): Promise<UserProfile | null> {
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
      if (!creator) return null;
      return normalizeCreatorProfile(creator, user);
    }

    if (role === "STUDENT") {
      const student = await this.prisma.student.findUnique({
        where: { user_id: user.id },
      });
      if (!student) return null;
      return normalizeStudentProfile(student, user);
    }

    return null;
  }

  async authenticateUser(input: LoginInput, context: MyContext): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      return false;
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      return false;
    }

    if (input.role === "CREATOR") {
      const creator = await this.prisma.creator.findUnique({
        where: { user_id: user.id },
      });
      if (!creator) return false;

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
      if (!student) return false;

      if (context && context.session) {
        context.session.userId = user.id;
        context.session.role = input.role;
        context.session.studentId = student.id
      }

      return true;
    }

    return false;
  }

  async changePassword(input: ChangePasswordInput): Promise<Boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      return false;
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    await this.prisma.user.update({
      where: { email: input.email },
      data: { password: hashedPassword },
    });

    return true;
  }
}