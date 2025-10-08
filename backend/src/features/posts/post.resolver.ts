import prisma from "../../config/prisma"
import { PostInput } from "../../generated/graphql"
import { MyContext } from "../../types/context"
import { PostService } from "./post.service"

const postService = new PostService(prisma)

export const resolvers = {
    Query: {
        posts: async () => {
            return await postService.getPosts();
        }
    },
    Mutation: {
        createPost: async (_: any, args: { input: PostInput }, context: MyContext) => {
            const { studentId } = context.session
            if(!studentId) return null
            return await postService.createPost(args.input, studentId)
        }
    }
}