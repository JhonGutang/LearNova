import { PrismaClient } from "@prisma/client";
import { Comment } from "../../../generated/graphql";
import { Comment as CommentDb } from "../../../../generated/prisma";
export interface ICommentService {
  getComments(postId: number): Promise<Comment[]>;
  createComment(params: { comment: string; studentId: number; postId: number }): Promise<Comment | null>;
}

export class CommentService implements ICommentService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getComments(postId: number): Promise<Comment[]> {
    if (!postId) return [];
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
    type CommentDb = typeof comments[number];
    return comments.map((c: CommentDb) => ({
      id: c.id.toString(),
      owner: c.student ? `${c.student.first_name} ${c.student.last_name}` : "",
      comment: c.comment,
    }));
  }

  async createComment({
    comment,
    studentId,
    postId,
  }: {
    comment: string;
    studentId: number;
    postId: number;
  }): Promise<Comment | null> {
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
    } catch (error) {
      return null;
    }
  }
}