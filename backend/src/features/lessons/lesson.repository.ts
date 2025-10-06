import { PrismaClient } from "@prisma/client";
import { LessonProgress } from "../../generated/graphql";

interface LessonRepositoryInterface {
  createLessonProgress(
    enrolledCourseId: number,
    lessonId: number
  ): Promise<LessonProgress>;

  findLessonProgress(options: {
    enrolledCourseId?: number;
    studentId?: number;
    lessonId: number;
  }): Promise<LessonProgress | null>;

  findLessonProgressByEnrollment(
    enrolledCourseId: number
  ): Promise<LessonProgress[]>;

  updateLessonProgressStatus(
    progressId: number,
    status: string
  ): Promise<boolean>;
}

export class LessonRepository implements LessonRepositoryInterface {
  constructor(private prisma: PrismaClient) {}

  async createLessonProgress(
    enrolledCourseId: number,
    lessonId: number
  ): Promise<LessonProgress> {
    return this.prisma.lesson_Progress.create({
      data: {
        enrolled_course_id: enrolledCourseId,
        lesson_id: lessonId,
      },
    });
  }

  async findLessonProgress(options: {
    enrolledCourseId?: number;
    studentId?: number;
    lessonId: number;
  }): Promise<LessonProgress | null> {
    const { enrolledCourseId, studentId, lessonId } = options;

    return this.prisma.lesson_Progress.findFirst({
      where: {
        lesson_id: lessonId,
        ...(enrolledCourseId
          ? { enrolled_course_id: enrolledCourseId }
          : studentId
          ? { enrolledCourse: { student_id: studentId } }
          : {}),
      },
    });
  }

  async findLessonProgressByEnrollment(
    enrolledCourseId: number
  ): Promise<LessonProgress[]> {
    return this.prisma.lesson_Progress.findMany({
      where: {
        enrolled_course_id: enrolledCourseId,
      },
    });
  }

  async updateLessonProgressStatus(
    progressId: number,
    status: string
  ): Promise<boolean> {
    const result = await this.prisma.lesson_Progress.update({
      where: { id: progressId },
      data: { status },
    });
    return result !== null;
  }
}
