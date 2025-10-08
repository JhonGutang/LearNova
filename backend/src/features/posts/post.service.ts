import { PostInput, Post } from "../../generated/graphql";
import { formatDateToMDY12Hour } from "../../utils/dateFormatter";

interface PrismaClientLike {
  post: {
    create: (args: any) => Promise<any>;
    findMany: (args?: any) => Promise<any[]>;
  };
}

interface PostServiceInterface {
  createPost(input: PostInput, studentId: number): Promise<Post>;
  getPosts(): Promise<Post[]>;
}

export class PostService implements PostServiceInterface {
  private prisma: PrismaClientLike;

  constructor(prismaClient: PrismaClientLike) {
    this.prisma = prismaClient;
  }

  async createPost(input: PostInput, studentId: number): Promise<Post> {
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
      createdAt: formatDateToMDY12Hour(new Date(createdPost.created_at)),
      owner: {
        id: String(createdPost.student.id),
        firstName: createdPost.student.first_name,
        lastName: createdPost.student.last_name,
      }
    };
  }

  async getPosts(): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      include: {
        student: true
      },
      orderBy: {
        created_at: "desc"
      }
    });

    return posts.map((post: any) => ({
      id: String(post.id),
      topic: post.topic,
      content: post.content,
      createdAt: formatDateToMDY12Hour(new Date(post.created_at)),
      owner: {
        id: String(post.student.id),
        firstName: post.student.first_name,
        lastName: post.student.last_name,
      }
    }));
  }
}
