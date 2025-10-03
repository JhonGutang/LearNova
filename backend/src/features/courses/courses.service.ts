import { PrismaClient } from "../../../generated/prisma";
import { Course, CourseInput } from "../../generated/graphql";

type CreateCourseData = CourseInput & { creator_id: number };

interface GetAllOptions {
  creatorId?: number;
  studentId?: number;
}

interface CourseServiceInterface {
  create(course: CreateCourseData): Promise<Course>;
  enroll(courseId: number, studentId: number): Promise<boolean>;
  enrolled(studentId: number): Promise<Course[]>;
  getById(
    courseId: number,
    title: string,
    creatorId?: number | null
  ): Promise<Course | null>;
  getAll(opts?: GetAllOptions): Promise<Course[]>;
}

// --- Normalizer helpers ---

function normalizeLesson(lesson: any) {
  if (!lesson) return undefined;
  return {
    id: String(lesson.id),
    title: lesson.title,
    description: lesson.description,
  };
}

function normalizeCourse(
  course: any,
  opts?: { includeCreatorName?: boolean; includeLessons?: boolean; isEnrolled?: boolean }
) {
  if (!course) return null;
  const includeCreatorName = opts?.includeCreatorName ?? true;
  const includeLessons = opts?.includeLessons ?? true;

  const creatorName =
    includeCreatorName && course.creator
      ? `${course.creator.first_name} ${course.creator.last_name}`.trim()
      : undefined;

  const normalized: any = {
    id: String(course.id),
    title: course.title,
    tagline: course.tagline,
    description: course.description,
    status: course.status,
    categories: course.categories
      ? course.categories.map((cat: any) =>
          cat.category ? cat.category.name : cat.name
        )
      : [],
    createdAt:
      course.created_at instanceof Date
        ? course.created_at.toISOString()
        : course.created_at,
  };

  if (includeCreatorName) {
    normalized.creatorName = creatorName ?? null;
  }

  if (includeLessons) {
    normalized.lessons = course.lessons
      ? course.lessons.map(normalizeLesson)
      : [];
  }

  if (typeof opts?.isEnrolled === "boolean") {
    normalized.isEnrolled = opts.isEnrolled;
  }

  return normalized;
}

export class CourseService implements CourseServiceInterface {
  constructor(private prisma: PrismaClient) {}

  async create(course: CreateCourseData): Promise<Course> {
    const existingCourse = await this.prisma.course.findUnique({
      where: { title: course.title },
    });

    if (existingCourse) {
      throw new Error("Course with this name already exists.");
    }

    const newCourse = await this.prisma.course.create({
      data: {
        title: course.title,
        creator_id: course.creator_id,
        tagline: course.tagline,
        description: course.description,
        categories: {
          create: course.categories.map((categoryName) => ({
            category: {
              connectOrCreate: {
                where: {
                  name: categoryName.toLowerCase(),
                },
                create: { name: categoryName.toLowerCase() },
              },
            },
          })),
        },
      },
      include: {
        categories: { include: { category: true } },
      },
    });

    // Only return the normalized course fields as per GraphQL type
    return normalizeCourse(newCourse, { includeCreatorName: false, includeLessons: false });
  }

  async enroll(courseId: number, studentId: number): Promise<boolean> {
    try {
      await this.prisma.enrolled_Course.create({
        data: {
          course_id: courseId,
          student_id: studentId,
        },
      });
      return true;
    } catch (error: any) {
      if (error.code === "P2002") {
        return false;
      }
      return false;
    }
  }

  async enrolled(studentId: number): Promise<Course[]> {
    const enrolledCourses = await this.prisma.enrolled_Course.findMany({
      where: {
        student_id: studentId,
      },
      include: {
        course: {
          include: {
            categories: { include: { category: true } },
            lessons: true,
            creator: true,
          },
        },
      },
    });

    // Map the enrolled courses to the Course GraphQL type using the normalizer
    return enrolledCourses
      .filter((enrolled) => enrolled.course)
      .map((enrolled) => normalizeCourse(enrolled.course, { includeCreatorName: true, includeLessons: false }));
  }

  async getById(
    courseId: number,
    title: string,
    creatorId?: number | null
  ): Promise<Course | null> {
    let whereClause: any = {
      id: courseId,
      title: {
        equals: title,
        mode: "insensitive",
      },
    };
    if (creatorId) {
      whereClause.creator_id = creatorId;
    }

    const course = await this.prisma.course.findFirst({
      where: whereClause,
      select: {
        id: true,
        title: true,
        tagline: true,
        description: true,
        status: true,
        categories: { select: { category: { select: { name: true } } } },
        created_at: true,
        lessons: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        creator: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });

    if (!course) return null;

    return normalizeCourse(course, { includeCreatorName: true, includeLessons: true });
  }

  async getAll(opts: GetAllOptions = {}): Promise<Course[]> {
    const { creatorId, studentId } = opts;

    const whereClause = creatorId ? { creator_id: creatorId } : {};
    const select: any = {
      id: true,
      title: true,
      tagline: true,
      categories: { select: { category: { select: { name: true } } } },
      created_at: true,
      creator: { select: { first_name: true, last_name: true } },
    };

    if (!studentId) {
      const courses = await this.prisma.course.findMany({
        where: whereClause,
        select,
      });

      return courses.map((course: any) =>
        normalizeCourse(
          course,
          {
            includeCreatorName: true,
            includeLessons: false,
          }
        )
      );
    }

    const courses = await this.prisma.course.findMany({
      where: whereClause,
      select: {
        ...select,
        enrolledCourses: {
          where: { student_id: studentId },
          select: { id: true }, 
        },
      },
    });

    // 2. Map and add isEnrolled
    return courses.map((course: any) =>
      normalizeCourse(
        course,
        {
          includeCreatorName: true,
          includeLessons: false,
          isEnrolled: Array.isArray(course.enrolledCourses) && course.enrolledCourses.length > 0,
        }
      )
    );
  }
}
