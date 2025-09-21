import { PrismaClient } from "../../../generated/prisma";
import { Course, CourseInput } from "../../generated/graphql";

type CreateCourseData = CourseInput & { creator_id: number };
interface CourseServiceInterface {
  create(course: CourseInput): Promise<Course>;
  getAll(): Promise<object>;
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
      },
    });

    return normalizeCategories(newCourse);
  }

  async getAll(): Promise<object> {
    const courses = await this.prisma.course.findMany({
      include: { categories: { include: { category: true } } },
    });
    return normalizeCategories(courses);
  }

  async getById(courseId: number): Promise<object | null> {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        categories: { include: { category: true } },
        lessons: true,
      },
    });
    return normalizeCategories(course);
  }

  async getByCreator(creatorId: number): Promise<Course[] | []> {
    const courses = await this.prisma.course.findMany({
      where: { creator_id: creatorId },
      include: { categories: { include: { category: true } } },
    });
    return normalizeCategories(courses);
  }
}
