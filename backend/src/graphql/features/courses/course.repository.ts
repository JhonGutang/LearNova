// features/course/course.repository.ts

import { PrismaClient } from "@prisma/client";
import { CourseInput } from "../../../generated/graphql";
import { Course } from "../../../generated/graphql";
import { buildCreateCourseQuery, buildFetchAllCoursesQuery, buildFindStudentEnrolledCoursesWithProgressQuery, buildRandomCoursesNotEnrolledQuery } from "./course.query-builder";
import { Enrolled_Course } from "../../../../generated/prisma";

type CreateCourseData = CourseInput & { creator_id: number };

interface CourseRepositoryInterface {
  allCourses(): Promise<Course[]>;
  existsByTitle(title: string): Promise<boolean>;
  findStudentEnrolledCoursesWithProgress(studentId: number):  Promise<Enrolled_Course[]>;
  findCourseOrEnrolledCourse(studentId: number, courseId: number, title: string): Promise<Course | null>
  createEnrollment(courseId: number, studentId: number): Promise<void>;
  createCourse(courseData: CreateCourseData): Promise<Course>;
  randomCoursesNotEnrolled(studentId: number): Promise<Course[]>;
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
    const { buildFindCourseOrEnrolledCourseQuery } = require("./course.query-builder");
    const query = buildFindCourseOrEnrolledCourseQuery(studentId, courseId, title);
    return await this.prisma.course.findFirst(query);
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

  async createEnrollment(courseId: number, studentId: number): Promise<void> {
    await this.prisma.enrolled_Course.create({
      data: {
        course_id: courseId,
        student_id: studentId,
      },
    });
  }
}
