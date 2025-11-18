import { ChangePasswordInput, EditableCreatorProfileInput, LoginInput, StudentProfile, User, UserProfile } from "../../../generated/graphql";
import bcrypt from "bcrypt";
import { MyContext } from "../../../types/context";
import { PrismaClient } from "@prisma/client";
import { Creator } from "../../../../generated/prisma";

interface AuthServiceInterface {
  getCurrentUserProfile(userId: number, role: string): Promise<UserProfile | null >
  authenticateUser(input: LoginInput, context: MyContext): Promise<Boolean>;
  changePassword(input: ChangePasswordInput): Promise<Boolean>;
  editUserInformation(input: EditableCreatorProfileInput, creatorId: number, userId: number): Promise<boolean>
}

function normalizeCreatorProfile(creator: Creator, user: User): UserProfile {
  return {
    __typename: "CreatorProfile",
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

function normalizeStudentProfile(student: StudentProfile, user: User): UserProfile {
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
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
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
      console.log(creator)
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

  async editUserInformation(
    input: EditableCreatorProfileInput,
    creatorId: number,
    userId: number
  ): Promise<boolean> {
    try {
      const [user, creator] = await Promise.all([
        this.prisma.user.findUnique({ where: { id: userId } }),
        this.prisma.creator.findUnique({ where: { id: creatorId } }),
      ]);
      if (!user || !creator) return false;
      const { userUpdateData, creatorUpdateData } = await this.getUserAndCreatorUpdateData(
        input,
        user,
        creator
      );

      // Only issue updates for changed fields
      const [userUpdated, creatorUpdated] = await Promise.all([
        Object.keys(userUpdateData).length > 0
          ? this.prisma.user.update({
              where: { id: userId },
              data: userUpdateData,
            }).then(() => true)
          : Promise.resolve(false),
        Object.keys(creatorUpdateData).length > 0
          ? this.prisma.creator.update({
              where: { id: creatorId },
              data: creatorUpdateData,
            }).then(() => true)
          : Promise.resolve(false),
      ]);

      return userUpdated || creatorUpdated;
    } catch (error) {
      console.error("editUserInformation Error:", error);
      return false;
    }
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
  
  // Helper functions
  
  private async getUserAndCreatorUpdateData(
    input: EditableCreatorProfileInput,
    user: any,
    creator: any
  ): Promise<{ userUpdateData: any; creatorUpdateData: any }> {
    const userUpdateData: any = {};
    if (typeof input.email === 'string' && input.email !== user.email) {
      userUpdateData.email = input.email;
    }

    const creatorUpdateData: any = {};
    const fields = [
      { inputKey: 'firstName', creatorKey: 'firstName', dbKey: 'first_name', required: true },
      { inputKey: 'lastName', creatorKey: 'lastName', dbKey: 'last_name', required: true },
      { inputKey: 'middleName', creatorKey: 'middleName', dbKey: 'middle_name', required: false },
      { inputKey: 'phone', creatorKey: 'phone', dbKey: 'phone', required: true },
      { inputKey: 'address', creatorKey: 'address', dbKey: 'address', required: true }
    ] as const;

    for (const field of fields) {
      const inputVal = input[field.inputKey as keyof EditableCreatorProfileInput];
      const creatorVal = creator[field.creatorKey];
      if (field.required) {
        if (inputVal !== undefined && inputVal !== null && inputVal !== creatorVal) {
          creatorUpdateData[field.dbKey] = inputVal;
        }
      } else {
        if (inputVal !== undefined && inputVal !== creatorVal) {
          creatorUpdateData[field.dbKey] = inputVal;
        }
      }
    }

    return { userUpdateData, creatorUpdateData };
  }
}
