import prisma from "../../config/prisma";
import { MyContext } from "../../types/context";
import { CommentService } from "./comment.service";
import { ResponseStatus } from "../../generated/graphql";

const commentService = new CommentService(prisma);

export const resolvers = {
    Query: {
        comments: async (_: any, args: { postId: string }) => {            
            return await commentService.getComments(Number(args.postId));
        }
    },
    Mutation: {
        createComment: async (_: any, args: { comment: string, postId: string }, context: MyContext) => {
            const { studentId } = context.session;
            if (!studentId) {
                return { 
                    status: ResponseStatus.Error, 
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
                    status: comment ? ResponseStatus.Success : ResponseStatus.Error,
                    message: comment ? "Comment created successfully" : "Failed to create comment",
                    comment: comment
                };
            } catch (error) {
                return {
                    status: ResponseStatus.Error,
                    message: "An error occurred while creating the comment",
                    comment: null
                };
            }
        }
    }
}