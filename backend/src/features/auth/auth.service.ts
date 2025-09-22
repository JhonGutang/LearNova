import { LoginInput, UserProfile } from "../../generated/graphql";
import bcrypt from "bcrypt";
import { MyContext } from "../../types/context";

interface AuthServiceInterface {
  getCurrentUserProfile(userId: number, role: string): Promise<UserProfile | null >
  authenticateUser(input: LoginInput, context: MyContext): Promise<Boolean>;
}

function normalizeCreatorProfile(creator: any, user: any): UserProfile {
  return {
    __typename: "CreatorProfile",
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

function normalizeStudentProfile(student: any, user: any): UserProfile {
  return {
    __typename: "StudentProfile",
    id: student.id,
    user_id: user.id,
    first_name: student.first_name,
    last_name: student.last_name,
    middle_name: student.middle_name,
    email: user.email,
    phone: student.phone,
    address: student.address,
    created_at: student.created_at,
    updated_at: student.updated_at,
  };
}

// --- AuthService class ---

export class AuthService implements AuthServiceInterface {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  async getCurrentUserProfile(userId: number, role: string): Promise<UserProfile | null> {
    // Find user by id
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
      }

      return true;
    }

    return false;
  }
}