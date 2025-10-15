import { ChangePasswordInput, LoginInput, ResponseStatus } from "../../generated/graphql";
import { AuthService } from "./auth.service";
import prisma from "../../config/prisma";
import { MyContext } from "../../types/context";
const authService = new AuthService(prisma);

export const resolvers = {
    Query: {
        user: async (_: unknown, __: unknown, context: MyContext) => {
            const { userId, role } = context.session;
            if (userId === undefined || !role) return null;
            return await authService.getCurrentUserProfile(
                userId,
                role
              );
        }
    },
    Mutation: {
        login: async (_: unknown, args: { input: LoginInput }, context: MyContext) => {
            console.log(process.env.NODE_ENV)
            const isAuthenticated = await authService.authenticateUser(args.input, context);
            if (isAuthenticated) {
                return {
                    status: ResponseStatus.Success,
                    message: "Login successful"
                };
            } else {
                return {
                    status: ResponseStatus.Error,
                    message: "Invalid credentials"
                };
            }
        },
        changePassword: async (_: unknown, args: { input: ChangePasswordInput }) => {
            const isSuccess = await authService.changePassword(args.input)
            if(isSuccess) {
                return {
                    status: ResponseStatus.Success,
                    message: "Password Changed"
                };
            } else {
                return {
                    status: ResponseStatus.Error,
                    message: "Password Change Failed"
                };
            }
        },
        logout: async (_: unknown, __: unknown, context: MyContext) => {
            return new Promise((resolve) => {
              context.session.destroy((error: Error | null) => {
                if (error) {
                  resolve({
                    status: ResponseStatus.Error,
                    message: "Session Destruction Failed: " + error
                  });
                } else {
                  resolve({
                    status: ResponseStatus.Success,
                    message: "Session Destroyed"
                  });
                }
              });
            });
          }
        
    }
}