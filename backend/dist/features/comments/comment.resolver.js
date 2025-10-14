"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const comment_service_1 = require("./comment.service");
const graphql_1 = require("../../generated/graphql");
const commentService = new comment_service_1.CommentService(prisma_1.default);
exports.resolvers = {
    Query: {
        comments: async (_, args) => {
            return await commentService.getComments(Number(args.postId));
        }
    },
    Mutation: {
        createComment: async (_, args, context) => {
            const { studentId } = context.session;
            if (!studentId) {
                return {
                    status: graphql_1.ResponseStatus.Error,
                    message: "Not authenticated",
                    comment: null
                };
            }
            try {
                const comment = await commentService.createComment({
                    comment: args.comment,
                    studentId: studentId,
                    postId: Number(args.postId)
                });
                return {
                    status: comment ? graphql_1.ResponseStatus.Success : graphql_1.ResponseStatus.Error,
                    message: comment ? "Comment created successfully" : "Failed to create comment",
                    comment: comment
                };
            }
            catch (error) {
                return {
                    status: graphql_1.ResponseStatus.Error,
                    message: "An error occurred while creating the comment",
                    comment: null
                };
            }
        }
    }
};
