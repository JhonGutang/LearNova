"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
class CommentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getComments(postId) {
        if (!postId)
            return [];
        const comments = await this.prisma.comment.findMany({
            where: { post_id: postId },
            include: {
                student: {
                    select: {
                        first_name: true,
                        last_name: true,
                    },
                },
            },
        });
        return comments.map((c) => ({
            id: c.id.toString(),
            owner: c.student ? `${c.student.first_name} ${c.student.last_name}` : "",
            comment: c.comment,
        }));
    }
    async createComment({ comment, studentId, postId, }) {
        if (!comment || !studentId || !postId) {
            return null;
        }
        try {
            const createdComment = await this.prisma.comment.create({
                data: {
                    comment,
                    post_id: postId,
                    student_id: studentId,
                },
                include: {
                    student: {
                        select: {
                            first_name: true,
                            last_name: true,
                        },
                    },
                },
            });
            return {
                id: createdComment.id.toString(),
                owner: createdComment.student ? `${createdComment.student.first_name} ${createdComment.student.last_name}` : "",
                comment: createdComment.comment,
            };
        }
        catch (error) {
            return null;
        }
    }
}
exports.CommentService = CommentService;
