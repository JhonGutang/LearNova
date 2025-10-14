"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const graphql_1 = require("../../generated/graphql");
const auth_service_1 = require("./auth.service");
const prisma_1 = __importDefault(require("../../config/prisma"));
const authService = new auth_service_1.AuthService(prisma_1.default);
exports.resolvers = {
    Query: {
        user: async (_, __, context) => {
            const { userId, role } = context.session;
            if (userId === undefined || !role)
                return null;
            return await authService.getCurrentUserProfile(userId, role);
        }
    },
    Mutation: {
        login: async (_, args, context) => {
            const isAuthenticated = await authService.authenticateUser(args.input, context);
            if (isAuthenticated) {
                return {
                    status: graphql_1.ResponseStatus.Success,
                    message: "Login successful"
                };
            }
            else {
                return {
                    status: graphql_1.ResponseStatus.Error,
                    message: "Invalid credentials"
                };
            }
        },
        changePassword: async (_, args) => {
            const isSuccess = await authService.changePassword(args.input);
            if (isSuccess) {
                return {
                    status: graphql_1.ResponseStatus.Success,
                    message: "Password Changed"
                };
            }
            else {
                return {
                    status: graphql_1.ResponseStatus.Error,
                    message: "Password Change Failed"
                };
            }
        },
        logout: async (_, __, context) => {
            return new Promise((resolve) => {
                context.session.destroy((error) => {
                    if (error) {
                        resolve({
                            status: graphql_1.ResponseStatus.Error,
                            message: "Session Destruction Failed: " + error
                        });
                    }
                    else {
                        resolve({
                            status: graphql_1.ResponseStatus.Success,
                            message: "Session Destroyed"
                        });
                    }
                });
            });
        }
    }
};
