import { PrismaClient } from "../../../generated/prisma";
import { CourseInput } from "../../generated/graphql";

const prisma = new PrismaClient();

interface CourseServiceInterface {
  create(course: CourseInput): Promise<object>;
  getAll(): Promise<object>;
  getById(courseId: number): Promise<object | null>;
}

function normalizeCategories(input: any): any {
  if (Array.isArray(input)) {
    return input.map((course: any) => ({
      ...course,
      categories: course.categories.map((category: any) => category.category.name),
    }));
  } else if (input && typeof input === "object") {
    return {
      ...input,
      categories: input.categories.map((category: any) => category.category.name),
    };
  }
  return input;
}

export class CourseService implements CourseServiceInterface {
    async create(course: CourseInput): Promise<object> {
        const existingCourse = await prisma.course.findUnique({
          where: { title: course.title },
        });
      
        if (existingCourse) {
          throw new Error('Course with this name already exists.');
        }

        const newCourse = await prisma.course.create({
          data: {
            title: course.title,
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
    const courses = await prisma.course.findMany({
      include: { categories: { include: { category: true } } },
    });
    return normalizeCategories(courses);
  }

  async getById(courseId: number): Promise<object | null> {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { categories: { include: { category: true } } },
    });
    return normalizeCategories(course);
  }
}
