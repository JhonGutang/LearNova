import prisma from "../../../config/prisma";
import { PostInput, ReactPostInput, ResponseStatus } from "../../../generated/graphql";
import { MyContext } from "../../../types/context";
import { PostService } from "./post.service";

const postService = new PostService(prisma);

export const resolvers = {
  Query: {
    posts: async (_: any, __: any, context: MyContext) => {
      const { studentId } = context.session;
      return await postService.getPosts(studentId);
    },
  },
  Mutation: {
    createPost: async (
      _: any,
      args: { input: PostInput },
      context: MyContext
    ) => {
      const { studentId } = context.session;
      if (!studentId) return null;
      return await postService.createPost(args.input, studentId);
    },
    reactPost: async (
      _: any,
      args: { input: ReactPostInput },
      context: MyContext
    ) => {
      const { studentId } = context.session;
      if (!studentId) {
        return {
          status: ResponseStatus.Error,
          message: "Not authenticated",
        };
      }
      const { postId, isLiked } = args.input;
      if (!postId || typeof isLiked !== "boolean") {
        return {
          status: ResponseStatus.Error,
          message: "Invalid input",
        };
      }
      await postService.reactPost(Number(postId), studentId, isLiked);

      return {
        status: ResponseStatus.Success,
        message: isLiked
          ? "Post liked successfully"
          : "Post unliked successfully",
      };
    },
  },
};
