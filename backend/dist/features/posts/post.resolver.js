"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const graphql_1 = require("../../generated/graphql");
const post_service_1 = require("./post.service");
const postService = new post_service_1.PostService(prisma_1.default);
exports.resolvers = {
    Query: {
        posts: async (_, __, context) => {
            const { studentId } = context.session;
            return await postService.getPosts(studentId);
        },
    },
    Mutation: {
        createPost: async (_, args, context) => {
            const { studentId } = context.session;
            if (!studentId)
                return null;
            return await postService.createPost(args.input, studentId);
        },
        reactPost: async (_, args, context) => {
            const { studentId } = context.session;
            if (!studentId) {
                return {
                    status: graphql_1.ResponseStatus.Error,
                    message: "Not authenticated",
                };
            }
            const { postId, isLiked } = args.input;
            if (!postId || typeof isLiked !== "boolean") {
                return {
                    status: graphql_1.ResponseStatus.Error,
                    message: "Invalid input",
                };
            }
            await postService.reactPost(Number(postId), studentId, isLiked);
            return {
                status: graphql_1.ResponseStatus.Success,
                message: isLiked
                    ? "Post liked successfully"
                    : "Post unliked successfully",
            };
        },
    },
};
