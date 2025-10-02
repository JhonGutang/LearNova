import { PrismaClient } from "../../../generated/prisma";
import { Course, CourseInput } from "../../generated/graphql";

type CreateCourseData = CourseInput & { creator_id: number };
interface CourseServiceInterface {
  create(course: CourseInput): Promise<Course>;
  getAll(): Promise<object>;
  getAllWithCreator(): Promise<Object>;
  getById(courseId: number): Promise<object | null>;
  getByIdWithCreator(courseId: number, title: string): Promise<object | null>;
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


function normalizeCourseWithCreator(course: any): any {
  if (!course) return null;
  return {
    id: String(course.id),
    creatorName: `${course.creator?.first_name || ""} ${course.creator?.last_name || ""}`.trim(),
    creatorMiddleName: course.creator?.middle_name || null,
    title: course.title,
    tagline: course.tagline,
    description: course.description,
    categories: course.categories?.map((cat: any) => cat.category.name) || [],
    lessons: course.lessons?.map((lesson: any) => ({
      title: lesson.title,
      description: lesson.description,
    })) || [],
    status: course.status,
    createdAt: course.created_at instanceof Date ? course.created_at.toISOString() : course.created_at,
    updatedAt: course.updated_at instanceof Date ? course.updated_at.toISOString() : course.updated_at,
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
        categories: { include: { category: true } },
      },
    });

    return {
      id: String(newCourse.id),
      title: newCourse.title,
      tagline: newCourse.tagline,
      categories: newCourse.categories.map((cat: any) => cat.category.name),
      createdAt: newCourse.created_at instanceof Date ? newCourse.created_at.toISOString() : newCourse.created_at,
    };
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

  async getByIdWithCreator(courseId: number, title: string): Promise<Course | null> {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        categories: { include: { category: true } },
        lessons: true,
        creator: true
      },
    });

    if (!course) return null;
    
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/[\s\-]+/g, '')
        .trim();

    if (
      course.id !== courseId ||
      normalize(course.title) !== normalize(title)
    ) {
      return null;
    }

    return normalizeCourseWithCreator(course);
  }

  async getByCreator(creatorId: number): Promise<Course[]> {
    const courses = await this.prisma.course.findMany({
      where: { creator_id: creatorId },
      select: {
        id: true,
        title: true,
        tagline: true,
        categories: { select: { category: { select: { name: true } } } },
        created_at: true,
      },
    });

    return courses.map((course: any) => ({
      id: String(course.id),
      title: course.title,
      tagline: course.tagline,
      categories: course.categories?.map((cat: any) => cat.category.name) || [],
      createdAt: course.created_at instanceof Date ? course.created_at.toISOString() : course.created_at,
    }));
  }
}
