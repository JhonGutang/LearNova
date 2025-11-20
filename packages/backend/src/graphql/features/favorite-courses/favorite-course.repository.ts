import { PrismaClient } from "../../../../generated/prisma";

interface CourseCategory {
  category: {
    name: string;
  };
}

interface CourseCreator {
  first_name: string;
  last_name: string;
}

interface FavoriteCourse {
  id: number;
  title: string;
  tagline: string;
  description: string;
  status: string;
  created_at: Date;
  categories: CourseCategory[];
  creator: CourseCreator;
}

export interface FavoriteCourseWithCourse {
  id: number;
  student_id: number;
  course_id: number;
  created_at: Date;
  course: FavoriteCourse;
}

export interface FavoriteCourseRepositoryInterface {
  findFavoriteCoursesByStudentId(studentId: number): Promise<FavoriteCourseWithCourse[]>;
  createFavoriteCourse(studentId: number, courseId: number): Promise<void>;
  getFavoriteCourseIds(studentId: number): Promise<number[]>;
  isFavorite(studentId: number, courseId: number): Promise<boolean>;
  removeFavoriteCourse(studentId: number, courseId: number): Promise<void>;
}

export class FavoriteCourseRepository implements FavoriteCourseRepositoryInterface {
  constructor(private prisma: PrismaClient) {}

  async findFavoriteCoursesByStudentId(studentId: number): Promise<FavoriteCourseWithCourse[]> {
    return await this.prisma.favorite_Course.findMany({
      where: {
        student_id: studentId
      },
      include: {
        course: {
          include: {
            categories: {
              select: {
                category: {
                  select: {
                    name: true
                  }
                }
              }
            },
            creator: {
              select: {
                first_name: true,
                last_name: true
              }
            }
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });
  }

  async createFavoriteCourse(studentId: number, courseId: number): Promise<void> {
    await this.prisma.favorite_Course.create({
      data: {
        student_id: studentId,
        course_id: courseId
      }
    });
  }

  async getFavoriteCourseIds(studentId: number): Promise<number[]> {
    const favorites = await this.prisma.favorite_Course.findMany({
      where: {
        student_id: studentId
      },
      select: {
        course_id: true
      }
    });
    return favorites.map(fav => fav.course_id);
  }

  async isFavorite(studentId: number, courseId: number): Promise<boolean> {
    const favorite = await this.prisma.favorite_Course.findUnique({
      where: {
        student_id_course_id: {
          student_id: studentId,
          course_id: courseId
        }
      }
    });
    return !!favorite;
  }

  async removeFavoriteCourse(studentId: number, courseId: number): Promise<void> {
    await this.prisma.favorite_Course.delete({
      where: {
        student_id_course_id: {
          student_id: studentId,
          course_id: courseId
        }
      }
    });
  }
}

