import { ChangePasswordInput, LoginInput, Status } from "../../generated/graphql";
import { AuthService } from "./auth.service";
import prisma from "../../config/prisma";
import { MyContext } from "../../types/context";
const authService = new AuthService(prisma);

export const resolvers = {
    Query: {
        user: async (_: any, __: any, context: MyContext) => {
            const { userId, role } = context.session;
            if (userId === undefined || !role) return null;
            return await authService.getCurrentUserProfile(
                userId,
                role
              );
        }
    },
    Mutation: {
        login: async (_: any, args: { input: LoginInput }, context: MyContext) => {
            const isAuthenticated = await authService.authenticateUser(args.input, context);
            if (isAuthenticated) {
                return {
                    status: Status.Success,
                    message: "Login successful"
                };
            } else {
                return {
                    status: Status.Error,
                    message: "Invalid credentials"
                };
            }
        },
        changePassword: async (_: any, args: { input: ChangePasswordInput }) => {
            const isSuccess = await authService.changePassword(args.input)
            if(isSuccess) {
                return {
                    status: Status.Success,
                    message: "Password Changed"
                };
            } else {
                return {
                    status: Status.Error,
                    message: "Password Change Failed"
                };
            }
        }
        
    }
}