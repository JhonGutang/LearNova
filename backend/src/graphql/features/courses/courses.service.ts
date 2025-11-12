import {
  Course,
  CourseInProgress,
  CourseInput,
} from "../../../generated/graphql";
import {
  convertCourseDataToCamelCase,
  transformEnrolledCourseForStudent,
  normalizeCourseOrEnrolledCourseWithLessons,
  normalizeCourseWithEnrollmentInfoOnly,
  flattenCategories,
} from "../../../utils/courseNormalizer";
import { CourseRepository } from "./course.repository";

type CreateCourseData = CourseInput & { creator_id: number };


export interface CourseServiceInterface {
  create(courseData: CreateCourseData): Promise<Course>;
  course(userId: number, courseId: number, title: string, role: string): Promise<Course | undefined>;
  coursesForStudents(studentId?: number): Promise<Course[]>;
  creatorCourses(creatorId: number): Promise<Course[]>;
  searchCourse(studentId: number, title: string): Promise<Course[]>;
  studentEnrolledCourses(studentId: number): Promise<Course[]>;
  enroll(courseId: number, studentId: number): Promise<boolean>;
  getCoursesInProgress(studentId: number): Promise<CourseInProgress[]>;
  publishCourse(courseId: number, creatorId: number): Promise<Boolean>
}

export class CourseService implements CourseServiceInterface {
  constructor(private courseRepository: CourseRepository) {}

  async coursesForStudents(studentId?: number): Promise<Course[]> {
    const courses = await this.courseRepository.allCourses();
    return courses.map((course) => convertCourseDataToCamelCase(course));
  }

  async creatorCourses(creatorId: number): Promise<Course[]> {
    const courses = await this.courseRepository.findCoursesByCreatorId(creatorId);
    const coursesWithParticipants = await Promise.all(
      courses.map(async (course) => {
        if (course.id !== undefined && course.id !== null) {
          const total = await this.courseRepository.countTotalNumberOfParticipants(course.id);
          const categories = flattenCategories(course.categories);
          return {
            ...course,
            categories,
            totalNumberOfParticipants: total ?? 0,
          };
        }
        return {
          ...course,
          categories: flattenCategories(course.categories),
        };
      })
    );
    return coursesWithParticipants;
  }

  async course(userId: number, courseId: number, title: string, role: string): Promise<Course | undefined> {
    let totalNumberOfLessons = 0;

    if (role === "STUDENT") {
      const studentId = userId;
      const course = await this.courseRepository.findCourseOrEnrolledCourse(studentId, courseId, title);
      if (!course) {
        throw new Error("Course not found");
      }
      return normalizeCourseOrEnrolledCourseWithLessons(course);
    }

    if (role === "CREATOR") {
      try {
        const creatorId = userId;
        const course = await this.courseRepository.findCreatorCourseByIdAndTitle(creatorId, courseId);
        if (!course) {
          throw new Error("Course Not Found");
        }
        const totalNumberOfParticipants = await this.courseRepository.countTotalNumberOfParticipants(course.id);

        function normalizeString(str: string): string {
          return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        }

        const courseTitleNorm = normalizeString(course.title ?? "");
        const inputTitleNorm = normalizeString(title ?? "");

        if (courseTitleNorm !== inputTitleNorm) {
          throw new Error("Course title does not match");
        }

        let categories: string[] = [];
        if (Array.isArray(course.categories)) {
          categories = flattenCategories(course.categories);
        }

        if (Array.isArray(course.lessons)) {
          totalNumberOfLessons = course.lessons.length;
        }

        return {
          ...course,
          totalNumberOfParticipants,
          categories,
          totalNumberOfLessons,
        };
      } catch (error) {
        throw error;
      }
    }
  }

  async searchCourse(studentId: number, title: string): Promise<Course[]> {
    const courses = await this.courseRepository.findCoursesWithSimilarTitle(studentId, title);
    return (courses ?? []).map((course) => 
      normalizeCourseWithEnrollmentInfoOnly(course)
    ) as Course[];
  }

  async getCoursesInProgress(studentId: number) {
    const LIMIT = 2;
    const enrolledCourses =
      await this.courseRepository.findStudentEnrolledCoursesWithProgress(
        studentId, LIMIT
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
    const LIMIT = 2;
    const enrolledCourses = await this.courseRepository.findStudentEnrolledCoursesWithProgress(studentId, LIMIT);
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

  async publishCourse(courseId: number, creatorId: number): Promise<Boolean> {
    if (creatorId === undefined) {
      throw new Error("Creator ID is required to publish course. Please authenticate as a creator.");
    }
    try {
      await this.courseRepository.modifyCourseStatus(courseId, creatorId);
      return true;
    } catch (error) {
      return false;
    }
  }
}
