import { PrismaClient } from "../../../generated/prisma";
import { Course, CourseInput } from "../../generated/graphql";

type CreateCourseData = CourseInput & { creator_id: number };
interface CourseServiceInterface {
  create(course: CourseInput): Promise<Course>;
  getAll(): Promise<object>;
  getAllWithCreator(): Promise<Object>;
  getById(courseId: number): Promise<object | null>;
  getByCreator(creatorId: number): Promise<Course[] | []>;
}

function normalizeCategories(input: any): any {
  if (Array.isArray(input)) {
    return input.map((course: any) => ({
      ...course,
      categories: course.categories.map(
        (category: any) => category.category.name
      ),
    }));
  } else if (input && typeof input === "object") {
    return {
      ...input,
      categories: input.categories.map(
        (category: any) => category.category.name
      ),
    };
  }
  return input;
}

// Normalization helpers
function normalizeCourse(course: any): any {
  if (!course) return null;
  return {
    id: String(course.id),
    creator_id: course.creator_id,
    title: course.title,
    tagline: course.tagline,
    description: course.description,
    categories: course.categories?.map((cat: any) => cat.category.name) || [],
    lessons: course.lessons?.map((lesson: any) => ({
      title: lesson.title,
      description: lesson.description,
    })) || [],
    status: course.status,
    created_at: course.created_at instanceof Date ? course.created_at.toISOString() : course.created_at,
    updated_at: course.updated_at instanceof Date ? course.updated_at.toISOString() : course.updated_at,
  };
}

function normalizeCourseWithCreator(course: any): any {
  if (!course) return null;
  return {
    id: String(course.id),
    creator_name: `${course.creator?.first_name || ""} ${course.creator?.last_name || ""}`.trim(),
    creator_middle_name: course.creator?.middle_name || null,
    title: course.title,
    tagline: course.tagline,
    description: course.description,
    categories: course.categories?.map((cat: any) => cat.category.name) || [],
    lessons: course.lessons?.map((lesson: any) => ({
      title: lesson.title,
      description: lesson.description,
    })) || [],
    status: course.status,
    created_at: course.created_at instanceof Date ? course.created_at.toISOString() : course.created_at,
    updated_at: course.updated_at instanceof Date ? course.updated_at.toISOString() : course.updated_at,
  };
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
        categories: {
          include: {
            category: true,
          },
        },
        lessons: true,
      },
    });

    return normalizeCourse(newCourse);
  }

  async getAll(): Promise<Course[]> {
    const courses = await this.prisma.course.findMany({
      include: {
        categories: { include: { category: true } },
        lessons: true,
      },
    });
    return courses.map(normalizeCourse);
  }

  async getAllWithCreator(): Promise<any[]> {
    const courses = await this.prisma.course.findMany({
      include: {
        categories: { include: { category: true } },
        creator: true,
      },
    });
    return courses.map(normalizeCourseWithCreator);
  }

  async getById(courseId: number): Promise<Course | null> {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        categories: { include: { category: true } },
        lessons: true,
      },
    });
    return normalizeCourse(course);
  }

  async getByCreator(creatorId: number): Promise<Course[]> {
    const courses = await this.prisma.course.findMany({
      where: { creator_id: creatorId },
      include: {
        categories: { include: { category: true } },
        lessons: true,
      },
    });
    return courses.map(normalizeCourse);
  }
}
