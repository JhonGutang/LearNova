import { PrismaClient } from "../../../generated/prisma";
import { Course, CourseInput } from "../../generated/graphql";
import { normalizeCourse } from "../../utils/courseNormalizer";
import { CourseRepository } from "./course.repository";
type CreateCourseData = CourseInput & { creator_id: number };

export interface CourseQueryOptions {
  creatorId?: number;
  studentId?: number;
}

interface CourseServiceInterface {
  create(course: CreateCourseData): Promise<Course>;
  enroll(courseId: number, studentId: number): Promise<boolean>;
  getEnrolledCourses(studentId: number): Promise<Course[]>;
  startProgress(enrolledCourseId: number, lessonId: number): Promise<boolean>;
  getSpecificCourse(
    courseId: number,
    title: string,
    options?: CourseQueryOptions
  ): Promise<Course | null>;
  getAllCourses(options?: CourseQueryOptions): Promise<Course[]>;
}

export class CourseService implements CourseServiceInterface {
  private prisma = new PrismaClient();
  constructor(private courseRepository: CourseRepository) {}

  async create(courseData: CreateCourseData): Promise<Course> {
    const existingCourse = await this.courseRepository.findByTitle(courseData.title);

    if (existingCourse) {
      throw new Error('A course with this title already exists.');
    }
    const newCourse = await this.courseRepository.create(courseData);
    return normalizeCourse(newCourse, { includeCreatorName: false, includeLessons: false });
  }

  async enroll(courseId: number, studentId: number): Promise<boolean> {
    try {
      await this.courseRepository.createEnrollment(courseId, studentId)
      return true;
    } catch (error: any) {
      if (error.code === "P2002") {
        return false;
      }
      return false;
    }
  }

  async getEnrolledCourses(studentId: number): Promise<Course[]> {
    const enrolledCourses = await this.courseRepository.findEnrolledCoursesByStudentId(studentId)

    return enrolledCourses
      .filter((enrolled) => enrolled.course)
      .map((enrolled) => normalizeCourse(enrolled.course, { includeCreatorName: true, includeLessons: false }));
  }

  async getSpecificCourse(
    courseId: number,
    title: string,
    options?: CourseQueryOptions
  ): Promise<Course | null> {
    // Fetch course data with repository
    const course = await this.courseRepository.findByIdAndTitle(
      courseId,
      title,
      options?.creatorId
    );

    if (!course) {
      return null;
    }

    // Handle student-specific logic: check enrollment status
    if (options?.studentId) {
      const enrollmentStatus = await this.courseRepository.checkEnrollmentStatus(
        courseId,
        options.studentId
      );

      return normalizeCourse(course, {
        includeCreatorName: true,
        includeLessons: true,
        enrolledCourseId: enrollmentStatus.enrolledCourseId,
      });
    }

    // Default response (for creators or public access)
    return normalizeCourse(course, {
      includeCreatorName: true,
      includeLessons: true,
    });
  }

  async getAllCourses(options: CourseQueryOptions = {}): Promise<Course[]> {
    const { creatorId, studentId } = options;
  
    // Delegate data fetching to repository
    const courses = await this.courseRepository.findAllCourses({
      creatorId,
      studentId,
    });

    // Business logic: Transform data for GraphQL
    return courses.map((course) => {
      const isEnrolled = (course.studentsEnrolled?.length ?? 0) >  0 ? true : false
      return normalizeCourse(course, {
        includeCreatorName: true,
        includeLessons: false,
        isEnrolled,
      });
    });
  }

  async startProgress(enrolledCourseId: number, lessonId: number): Promise<boolean> {
    try {
      await this.courseRepository.createLessonProgress(enrolledCourseId, lessonId)
      return true;
    } catch (error) {
      console.error("Error creating lesson progress:", error);
      return false;
    }
  }
}
