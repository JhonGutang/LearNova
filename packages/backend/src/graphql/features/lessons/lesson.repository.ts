import { PrismaClient } from "@prisma/client";
import { EditLessonInput, Lesson, LessonProgress } from "../../../generated/graphql";

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

  updateLessonsWithAuthorization(
    input: EditLessonInput,
    creatorId: number
  ): Promise<Lesson[]>;

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

    // Validate input to avoid ambiguous queries
    if (!enrolledCourseId && !studentId) {
      throw new Error("Either enrolledCourseId or studentId must be provided");
    }

    const whereClause: any = {
      lesson_id: lessonId,
    };

    if (enrolledCourseId) {
      whereClause.enrolled_course_id = enrolledCourseId;
    } else if (studentId) {
      whereClause.enrolledCourse = { student_id: studentId };
    }

    // Now also select the id
    return this.prisma.lesson_Progress.findFirst({
      where: whereClause,
      select: {
        id: true,
        status: true,
        lesson: {
          select: {
            exp: true,
          },
        },
      },
    }) as Promise<LessonProgress | null>;
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

  async updateLessonsWithAuthorization(
    input: EditLessonInput,
  ): Promise<Lesson[]> {
    const { courseId, lessons } = input;

    // Fetch all existing lessons indexed by their id for quick lookup
    const existingLessonsArray = await this.prisma.lesson.findMany({
      where: { course_id: courseId },
      select: { id: true, title: true, description: true },
    });
    const existingLessons = new Map<number, { id: number; title: string; description: string }>();
    for (const lesson of existingLessonsArray) {
      existingLessons.set(Number(lesson.id), lesson);
    }

    const results: Lesson[] = [];

    for (const inputLesson of lessons) {
      if (inputLesson.lessonId && existingLessons.has(inputLesson.lessonId)) {
        // Update this lesson since it exists (by id)
        const updated = await this.prisma.lesson.update({
          where: { id: inputLesson.lessonId },
          data: {
            title: inputLesson.title,
            description: inputLesson.description,
          },
          select: { id: true, title: true, description: true },
        });
        results.push({
          ...updated,
          id: String(updated.id),
        });
      } else {
        // Create new lesson (does not exist yet)
        const created = await this.prisma.lesson.create({
          data: {
            course_id: courseId,
            title: inputLesson.title,
            description: inputLesson.description,
          },
          select: { id: true, title: true, description: true },
        });
        results.push({
          ...created,
          id: String(created.id),
        });
      }
    }

    // Do NOT delete any lessons as per new requirements

    return results;
  }
}
