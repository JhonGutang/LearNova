"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const dateFormatter_1 = require("../../utils/dateFormatter");
class PostService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }
    async createPost(input, studentId) {
        const createdPost = await this.prisma.post.create({
            data: {
                topic: input.topic,
                content: input.content,
                student: {
                    connect: { id: studentId }
                }
            },
            include: {
                student: true
            }
        });
        return {
            id: String(createdPost.id),
            topic: createdPost.topic,
            content: createdPost.content,
            createdAt: (0, dateFormatter_1.formatDateToMDY12Hour)(new Date(createdPost.created_at)),
            owner: {
                id: String(createdPost.student.id),
                firstName: createdPost.student.first_name,
                lastName: createdPost.student.last_name,
            }
        };
    }
    async getPosts(studentId) {
        const posts = await this.prisma.post.findMany({
            include: {
                student: true,
                reactions: true, // Always include all reactions to count them
                comments: {
                    include: {
                        student: {
                            select: {
                                id: true,
                                first_name: true,
                                last_name: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                created_at: "desc"
            }
        });
        return posts.map((post) => {
            // Calculate reactionCount (number of liked reactions)
            const reactionCount = post.reactions
                ? post.reactions.filter((reaction) => reaction.liked).length
                : 0;
            // Determine if the current student has liked the post
            let hasLiked = false;
            if (studentId && post.reactions) {
                const userReaction = post.reactions.find((reaction) => reaction.student_id === studentId);
                hasLiked = !!(userReaction && userReaction.liked);
            }
            const mappedPost = {
                id: String(post.id),
                topic: post.topic,
                content: post.content,
                createdAt: (0, dateFormatter_1.formatDateToMDY12Hour)(new Date(post.created_at)),
                owner: {
                    id: String(post.student.id),
                    firstName: post.student.first_name,
                    lastName: post.student.last_name,
                },
                hasLiked,
                comments: post.comments
                    ? post.comments.map((comment) => {
                        const mappedComment = {
                            id: String(comment.id),
                            comment: comment.comment,
                            owner: comment.student ? `${comment.student.first_name} ${comment.student.last_name}` : ""
                        };
                        return mappedComment;
                    })
                    : [],
                reactionCount
            };
            return mappedPost;
        });
    }
    /**
     * React to a post (like or unlike).
     * Stores postId, studentId, and liked boolean in the Reaction table.
     * If a reaction already exists for this post/student, it updates it.
     * Otherwise, it creates a new reaction.
     */
    async reactPost(postId, studentId, liked) {
        if (!this.prisma.reaction) {
            throw new Error("Prisma client does not support reactions");
        }
        await this.prisma.reaction.upsert({
            where: {
                post_id_student_id: {
                    post_id: postId,
                    student_id: studentId,
                }
            },
            update: {
                liked: liked
            },
            create: {
                post: { connect: { id: postId } },
                student: { connect: { id: studentId } },
                liked: liked
            }
        });
    }
}
exports.PostService = PostService;
