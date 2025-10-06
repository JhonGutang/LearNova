// features/course/course.repository.ts

import { PrismaClient } from "@prisma/client";
import { CourseInput, LessonProgress } from "../../generated/graphql";
import { Course } from "../../generated/graphql";

type CreateCourseData = CourseInput & { creator_id: number };

interface CourseRepositoryInterface {
  findByTitle(title: string): Promise<Course | null>;
  findByIdAndTitle(
    courseId: number,
    title: string,
    creatorId?: number
  ): Promise<Course | null>;
  findEnrolledCoursesByStudentId(studentId: number): Promise<EnrolledCourse[]>
  createEnrollment(courseId: number, studentId: number): Promise<void>
  checkEnrollmentStatus(
    courseId: number,
    studentId: number
  ): Promise<EnrollmentStatus>;
  create(courseData: CreateCourseData): Promise<Course>;
}

interface EnrollmentStatus {
  isEnrolled: boolean;
  enrolledCourseId?: number;
}

interface FindAllCoursesOptions {
  creatorId?: number;
  studentId?: number;
}

interface EnrolledCourse {
  course: Course[]
}

export class CourseRepository implements CourseRepositoryInterface {
  constructor(private prisma: PrismaClient) {}

  async findByTitle(title: string) {
    return this.prisma.course.findUnique({
      where: { title },
    });
  }

  async create(courseData: CreateCourseData) {
    const newCourse = await this.prisma.course.create({
      data: {
        title: courseData.title,
        creator_id: courseData.creator_id,
        tagline: courseData.tagline,
        description: courseData.description,
        categories: {
          create: courseData.categories.map((categoryName) => ({
            category: {
              connectOrCreate: {
                where: { name: categoryName.toLowerCase() },
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

    return newCourse;
  }

  async findByIdAndTitle(
    courseId: number,
    title: string,
    creatorId?: number
  ): Promise<Course | null> {
    const whereClause: any = {
      id: courseId,
      title: {
        equals: title,
        mode: "insensitive",
      },
    };

    // Apply creator filter if provided
    if (creatorId !== undefined) {
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
        created_at: true,
        categories: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
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

    return course;
  }

  async findAllCourses(options: FindAllCoursesOptions): Promise<Course[]> {
    const { creatorId, studentId } = options;
  
    const whereClause: any = {};
    if (creatorId) {
      whereClause.creator_id = creatorId;
    }
  
    const baseSelect = {
      id: true,
      title: true,
      tagline: true,
      created_at: true,
      categories: { select: { category: { select: { name: true } } } },
      creator: { select: { first_name: true, last_name: true } },
    };
  
    if (studentId) {
      return await this.prisma.course.findMany({
        where: whereClause,
        select: {
          ...baseSelect,
          studentsEnrolled: {
            where: { student_id: studentId },
            select: { id: true },
          },
        },
      }) as Course[];
    }
  
    return await this.prisma.course.findMany({
      where: whereClause,
      select: baseSelect,
    }) as Course[];
  }

  async findEnrolledCoursesByStudentId(studentId: number): Promise<EnrolledCourse[]> {
    return this.prisma.enrolled_Course.findMany({
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
  }

  async createEnrollment(courseId: number, studentId: number): Promise<void> {
    this.prisma.enrolled_Course.create({
      data: {
        course_id: courseId,
        student_id: studentId,
      },
    });
  }

  async checkEnrollmentStatus(
    courseId: number,
    studentId: number
  ): Promise<EnrollmentStatus> {
    const enrollment = await this.prisma.enrolled_Course.findFirst({
      where: {
        course_id: courseId,
        student_id: studentId,
      },
      select: {
        id: true,
      },
    });

    return {
      isEnrolled: enrollment !== null,
      enrolledCourseId: enrollment?.id,
    };
  }
}
