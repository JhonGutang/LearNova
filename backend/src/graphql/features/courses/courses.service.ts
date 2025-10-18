import {
  Course,
  CourseInProgress,
  CourseInput,
} from "../../../generated/graphql";
import { convertCourseDataToCamelCase, transformEnrolledCourseForStudent } from "../../../utils/courseNormalizer";
import { CourseRepository } from "./course.repository";

type CreateCourseData = CourseInput & { creator_id: number };

export interface CourseServiceInterface {
  create(courseData: CreateCourseData): Promise<Course>;
  coursesForStudents(studentId?: number): Promise<Course[]>;
  studentEnrolledCourses(studentId: number): Promise<Course[]>;
  enroll(courseId: number, studentId: number): Promise<boolean>;
  getCoursesInProgress(studentId: number): Promise<CourseInProgress[]>;
}

export class CourseService implements CourseServiceInterface {
  constructor(private courseRepository: CourseRepository) {}

  async coursesForStudents(studentId?: number): Promise<Course[]> {
    const courses = await this.courseRepository.allCourses();
    return courses.map((course) => convertCourseDataToCamelCase(course));
  }

  async getCoursesInProgress(studentId: number) {
    const enrolledCourses =
      await this.courseRepository.findStudentEnrolledCoursesWithProgress(
        studentId
      );
    return enrolledCourses
      .map((enrolled: any) => {
        const totalLessons = enrolled.course.lessons.length;
        const finishedLessons = (enrolled.lessonProgress || []).filter(
          (progress: any) => progress.status === "FINISHED"
        ).length;

        const notFinished = finishedLessons < totalLessons;

        const progressPercentage =
          totalLessons > 0 ? (finishedLessons / totalLessons) * 100 : 0;

        return {
          courseId: enrolled.course.id,
          title: enrolled.course.title,
          tagline: enrolled.course.tagline,
          progressPercentage: Math.round(progressPercentage * 100) / 100,
          notFinished,
        };
      })
      .filter((enrolled: any) => enrolled.notFinished);
  }

  async studentEnrolledCourses(studentId: number): Promise<Course[]> {
    const enrolledCourses = await this.courseRepository.findStudentEnrolledCoursesWithProgress(studentId);
    return enrolledCourses.map((enr: any) => transformEnrolledCourseForStudent(enr));
  }


  async getRandomCourseRecommendations(studentId: number, limit: number = 5) {
    const randomCourses = await this.courseRepository.randomCoursesNotEnrolled(studentId);
    const limitedRandomCourses = randomCourses.slice(0, limit);
    return limitedRandomCourses.map((course: any) => ({
      courseId: course.id,
      title: course.title,
      tagline: course.tagline,
      rate: Math.random() * 5
    }));
  }

  async create(courseData: CreateCourseData): Promise<Course> {
    const existingCourse = await this.courseRepository.existsByTitle(
      courseData.title
    );

    if (existingCourse) {
      throw new Error("A course with this title already exists.");
    }
    const newCourse = await this.courseRepository.createCourse(courseData);
    return convertCourseDataToCamelCase(newCourse);
  }

  async enroll(courseId: number, studentId: number): Promise<boolean> {
    try {
      await this.courseRepository.createEnrollment(courseId, studentId);
      return true;
    } catch (error: any) {
      if (error.code === "P2002") {
        return false;
      }
      return false;
    }
  }
}
