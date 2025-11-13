// features/course/course.repository.ts

import { PrismaClient } from "@prisma/client";
import { CourseInput, EditCourseInput } from "../../../generated/graphql";
import { Course } from "../../../generated/graphql";
import { buildCreateCourseQuery, buildFetchAllCoursesQuery, buildFindCourseOrEnrolledCourseQuery, buildFindStudentEnrolledCoursesWithProgressQuery, buildRandomCoursesNotEnrolledQuery, buildSearchCoursesWithEnrollmentQuery } from "./course.query-builder";
import { Enrolled_Course } from "../../../../generated/prisma";

type CreateCourseData = CourseInput & { creator_id: number };

interface CourseRepositoryInterface {
  allCourses(): Promise<Course[]>;
  existsByTitle(title: string): Promise<boolean>;
  findStudentEnrolledCoursesWithProgress(studentId: number):  Promise<Enrolled_Course[]>;
  findCoursesByCreatorId(creatorId: number): Promise<Course[]>;
  findCourseOrEnrolledCourse(studentId: number, courseId: number, title: string): Promise<Course | null>
  findCoursesWithSimilarTitle(studentId: number, title: string): Promise<Course[] | null>
  findCreatorCourseByIdAndTitle(creatorId: number, courseId: number): Promise<Course | null>
  countTotalNumberOfParticipants(courseId: number): Promise<number | null>
  createEnrollment(courseId: number, studentId: number): Promise<void>;
  createCourse(courseData: CreateCourseData): Promise<Course>;
  editCourse(courseData: EditCourseInput, creatorId: number): Promise<Course>;
  randomCoursesNotEnrolled(studentId: number): Promise<Course[]>;
  modifyCourseStatus(courseId: number, creatorId: number): Promise<Boolean>;
}

export class CourseRepository implements CourseRepositoryInterface {
  constructor(private prisma: PrismaClient) {}

  async allCourses(): Promise<Course[]> {
    const fetchQuery = buildFetchAllCoursesQuery();
    return this.prisma.course.findMany(fetchQuery);
  }

  async existsByTitle(title: string): Promise<boolean> {
    const course = await this.prisma.course.findUnique({
      where: { title },
      select: { id: true }, 
    });
    return !!course;
  }

  async findCoursesByCreatorId(creatorId: number): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: { creator_id: creatorId },
      select: {
        id: true,
        title: true,
        tagline: true,
        status: true,
        categories: {
          select: {
            category: {
              select: {
                name: true,
              }
            }
          }
        },
      },
      orderBy: { id: 'asc' },
    });
  }

  async findCreatorCourseByIdAndTitle(creatorId: number, courseId: number): Promise<Course | null> {
    return this.prisma.course.findFirst({
      where: {
        id: courseId,
        creator_id: creatorId,
      },
      include: {
        lessons: {
          select: {
            id: true,
            title: true,
            description: true,
          },
          orderBy: {
            id: 'asc'
          }
        },
        categories: {
          select: {
            category: {
              select: {
                name: true,
              }
            }
          },
        },
      },
      orderBy: {
        id: 'asc'
      }
    });
  }

  async countTotalNumberOfParticipants(courseId: any): Promise<number> {
    const count = await this.prisma.enrolled_Course.count({
      where: { course_id: courseId }
    });
    return count;
  }

  async findStudentEnrolledCoursesWithProgress(studentId: number, limit?: number): Promise<Enrolled_Course[]> {
    const query = limit
      ? buildFindStudentEnrolledCoursesWithProgressQuery(studentId, limit)
      : buildFindStudentEnrolledCoursesWithProgressQuery(studentId);

    return await this.prisma.enrolled_Course.findMany(query);
  }

  async findCourseOrEnrolledCourse(
    studentId: number,
    courseId: number,
    title: string
  ): Promise<Course | null> {
    const query = buildFindCourseOrEnrolledCourseQuery(studentId, courseId, title);
    return await this.prisma.course.findFirst(query);
  }

  async findCoursesWithSimilarTitle(studentId: number, title: string): Promise<Course[] | null> {
    if (!title || title.trim().length === 0) {
      return [];
    }

    const query = buildSearchCoursesWithEnrollmentQuery(studentId, title);

    const courses = await this.prisma.course.findMany(query);
    return courses;
  }

  async randomCoursesNotEnrolled(studentId: number): Promise<Course[]> {
    const enrolledCourseIdsResult = await this.prisma.enrolled_Course.findMany({
      where: { student_id: studentId },
      select: { course_id: true }
    });
    const enrolledCourseIds = enrolledCourseIdsResult.map((ec: any) => ec.course_id);
    const randomCoursesQuery = buildRandomCoursesNotEnrolledQuery(enrolledCourseIds, 5);
    const randomCourses = await this.prisma.course.findMany(randomCoursesQuery);
    return randomCourses;
  }

  async createCourse(courseData: CreateCourseData): Promise<Course> {
    const createQuery = buildCreateCourseQuery(courseData);
    const newCourse = await this.prisma.course.create(createQuery);
    return newCourse;
  }
  
  async editCourse(courseData: EditCourseInput, creatorId: number): Promise<Course> {
    const { courseId, ...updates } = courseData;
    const cleanedUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined && v !== null)
    );

    if (Object.keys(cleanedUpdates).length === 0) {
      const course = await this.prisma.course.findFirst({
        where: {
          id: courseId,
          creator_id: creatorId,
        },
        include: { categories: { select: { category: { select: { name: true } } } } },
      });
      if (!course) {
        throw new Error('Course not found');
      }
      return course as Course;
    }

    const updatedCourse = await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        ...cleanedUpdates,
      },
      include: { categories: { select: { category: { select: { name: true } } } } }
    });

    if (updatedCourse.creator_id !== creatorId) {
      throw new Error("Unauthorized: Only the course creator can edit this course");
    }
    return updatedCourse as Course;
  }

  async createEnrollment(courseId: number, studentId: number): Promise<void> {
    await this.prisma.enrolled_Course.create({
      data: {
        course_id: courseId,
        student_id: studentId,
      },
    });
  }

  async modifyCourseStatus(courseId: number, creatorId: number): Promise<Boolean> {
    await this.prisma.course.update({
      where: {
        id: courseId,
        creator_id: creatorId,
      },
      data: {
        status: "PUBLISHED",
      },
    });
    return true;
  }
}
