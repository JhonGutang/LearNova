import {
  Course,
  CourseInput,
  Lesson,
  LessonProgress,
} from "../../../generated/graphql";
import { normalizeCourse } from "../../../utils/courseNormalizer";
import { CourseRepository } from "./course.repository";
import { LessonRepository } from "../lessons/lesson.repository";
import { LevelSystemService } from "../level_system/level_system.service"; // Import Level System Service

type CreateCourseData = CourseInput & { creator_id: number };

// Define interface for course in progress
export interface ICourseInProgress {
  courseId: string;
  title: string;
  tagline: string;
  progressPercentage: number;
  notFinished: boolean;
}

export interface CourseQueryOptions {
  creatorId?: number;
  studentId?: number;
}

interface ProgressReponse {
  progressStatus: string;
  message: string;
}

interface CourseServiceInterface {
  create(course: CreateCourseData): Promise<Course>;
  enroll(courseId: number, studentId: number): Promise<boolean>;
  getEnrolledCourses(studentId: number): Promise<Course[]>;
  startProgress(
    enrolledCourseId: number,
    lessonId: number
  ): Promise<ProgressReponse>;
  finishProgress(studentId: number, lessonId: number): Promise<ProgressReponse>;
  getSpecificCourse(
    courseId: number,
    title: string,
    options?: CourseQueryOptions
  ): Promise<Course | null>;
  getAllCourses(options?: CourseQueryOptions): Promise<Course[]>;
  getCoursesInProgress(studentId: number): Promise<ICourseInProgress[]>;
}

export class CourseService implements CourseServiceInterface {
  constructor(
    private courseRepository: CourseRepository,
    private lessonRepository: LessonRepository,
    private levelSystemService: LevelSystemService // Inject LevelSystemService
  ) {}

  async create(courseData: CreateCourseData): Promise<Course> {
    const existingCourse = await this.courseRepository.findByTitle(
      courseData.title
    );

    if (existingCourse) {
      throw new Error("A course with this title already exists.");
    }
    const newCourse = await this.courseRepository.create(courseData);
    return normalizeCourse(newCourse, {
      includeCreatorName: false,
      includeLessons: false,
    });
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

  async getEnrolledCourses(studentId: number): Promise<Course[]> {
    const enrolledCourses =
      await this.courseRepository.findEnrolledCoursesByStudentId(studentId);

    return enrolledCourses
      .filter((enrolled) => enrolled.course)
      .map((enrolled) =>
        normalizeCourse(enrolled.course, {
          includeCreatorName: true,
          includeLessons: false,
        })
      );
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
      const enrollmentStatus =
        await this.courseRepository.checkEnrollmentStatus(
          courseId,
          options.studentId
        );

      // Also check lesson progress if enrolledCourseId exists
      let lessonProgress: LessonProgress[] = [];
      if (enrollmentStatus.enrolledCourseId) {
        lessonProgress =
          await this.lessonRepository.findLessonProgressByEnrollment(
            enrollmentStatus.enrolledCourseId
          );
      }

      return normalizeCourse(course, {
        includeCreatorName: true,
        includeLessons: true,
        enrolledCourseId: enrollmentStatus.enrolledCourseId,
        lessonProgress: lessonProgress, // Pass lesson progress to normalizeCourse
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
      const isEnrolled =
        (course.studentsEnrolled?.length ?? 0) > 0 ? true : false;
      return normalizeCourse(course, {
        includeCreatorName: true,
        includeLessons: false,
        isEnrolled,
      });
    });
  }

  async startProgress(
    enrolledCourseId: number,
    lessonId: number
  ): Promise<ProgressReponse> {
    try {
      const existingProgress = await this.lessonRepository.findLessonProgress({
        enrolledCourseId,
        lessonId,
      });
      if (existingProgress) {
        return {
          progressStatus: "IN_PROGRESS",
          message: "This lesson is already " + existingProgress.status,
        };
      }

      const newProgress: LessonProgress =
        await this.lessonRepository.createLessonProgress(
          enrolledCourseId,
          lessonId
        );
      return {
        progressStatus: "STARTED",
        message: "This lesson is now " + newProgress.status,
      };
    } catch (error) {
      return {
        progressStatus: "FAILED",
        message: "Error creating lesson progress: " + error,
      };
    }
  }

  async finishProgress(
    studentId: number,
    lessonId: number
  ): Promise<ProgressReponse> {
    const existingProgress = await this.lessonRepository.findLessonProgress({
      studentId,
      lessonId,
    });
    console.log(existingProgress);
    if (!existingProgress) {
      return {
        progressStatus: "FAILED",
        message: "User doesn't have progress with this lesson",
      };
    }

    if (
      existingProgress.status &&
      existingProgress.status.toUpperCase() === "FINISHED"
    ) {
      return {
        progressStatus: "FINISHED",
        message: "Lesson progress is already marked as FINISHED.",
      };
    }

    try {
      await this.lessonRepository.updateLessonProgressStatus(
        Number(existingProgress.id),
        "FINISHED"
      );
      let expGained: number | undefined = undefined;
      if (
        (existingProgress as any).lesson &&
        typeof (existingProgress as any).lesson.exp === "number"
      ) {
        expGained = (existingProgress as any).lesson.exp;
      }

      let levelUpResult = null;
      if (typeof expGained === "number" && expGained > 0) {
        levelUpResult = await this.levelSystemService.levelUp(
          studentId,
          expGained
        );
      }

      let message = "Lesson progress marked as FINISHED";
      if (levelUpResult) {
        message += ` and student awarded ${expGained} EXP.`;
      }

      return {
        progressStatus: "FINISHED",
        message,
      };
    } catch (error) {
      return {
        progressStatus: "FAILED",
        message: "Error updating lesson progress: " + error,
      };
    }
  }

  async getCoursesInProgress(studentId: number): Promise<ICourseInProgress[]> {
    const enrolledCourses = await this.courseRepository.findEnrolledCoursesWithProgressByStudentId(studentId);
    return enrolledCourses.map((enrolled: any) => {
        const totalLessons = enrolled.course.lessons.length;
        const finishedLessons = (enrolled.lessonProgress || []).filter(
            (progress: any) => progress.status === 'FINISHED'
        ).length;

        const notFinished = finishedLessons < totalLessons;
        
        const progressPercentage = totalLessons > 0 
            ? (finishedLessons / totalLessons) * 100 
            : 0;

        return {
            courseId: String(enrolled.course.id),
            title: enrolled.course.title,
            tagline: enrolled.course.tagline,
            progressPercentage: Math.round(progressPercentage * 100) / 100,
            notFinished 
        } as ICourseInProgress;
    }).filter((enrolled: ICourseInProgress) => enrolled.notFinished); 
  }

  async getRandomCourseRecommendations(studentId: number, limit: number = 5) {
    const randomCourses =
      await this.courseRepository.findRandomRecommendedPublishedCoursesExcludingEnrolled(
        studentId,
        limit
      );

    return randomCourses.map((course) => ({
      courseId: course.id,
      title: course.title,
      tagline: course.tagline,
      rate: Math.random() * 5,
    }));
  }
}
