import prisma from "../../config/prisma";
import { CourseInput, Status } from "../../generated/graphql";
import { MyContext } from "../../types/context";
import { CourseRepository } from "./course.repository";
import { CourseService } from "./courses.service";
import { LessonRepository } from "../lessons/lesson.repository";
const courseRepository = new CourseRepository(prisma);
const lessonRepository = new LessonRepository(prisma);
const courseService = new CourseService(courseRepository, lessonRepository);

export const resolvers = {
  Query: {
    course: async (
      _: any,
      args: { id: string; title: string },
      context: MyContext
    ) => {
      const { role, studentId, creatorId } = context.session;
      if (!role) return null;

      const courseId = parseInt(args.id);
      const getOptions =
        role === "STUDENT"
          ? studentId
            ? { studentId }
            : undefined
          : role === "CREATOR"
          ? creatorId
            ? { creatorId }
            : null
          : null;

      if (getOptions === null) return null;

      const course = await courseService.getSpecificCourse(
        courseId,
        args.title,
        getOptions
      );

      if (!course && role === "CREATOR") {
        throw new Error("Course not found");
      }

      return course;
    },
    courses: async (_: any, __: any, context: MyContext) => {
      try {
        const { role, studentId, creatorId } = context.session;
        if (!role) return null;

        const getOptions =
        role === "STUDENT"
          ? studentId
            ? { studentId }
            : undefined
          : role === "CREATOR"
          ? creatorId
            ? { creatorId }
            : null
          : null;

      if (getOptions === null) return null;
      return await courseService.getAllCourses(
        getOptions
      );

      } catch (error) {
        throw new Error(`Internal server error: ${error}`);
      }
    },
    enrolledCourses: async (_: any, __: any, context: MyContext) => {
      try {
        if (!context.session.studentId) return null;
        return await courseService.getEnrolledCourses(context.session.studentId);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        throw new Error("Internal server error");
      }
    },
  },

  Mutation: {
    createCourse: async (
      _: any,
      args: { input: CourseInput },
      context: MyContext
    ) => {
      try {
        if (!context.session.creatorId) return null;
        const inputWithCreatorId = {
          ...args.input,
          creator_id: context.session.creatorId,
        };
        return await courseService.create(inputWithCreatorId);
      } catch (error) {
        console.error("Error creating course:", error);
        throw new Error("Internal server error");
      }
    },
    enrollCourse: async (
      _: any,
      args: { courseId: number },
      context: MyContext
    ) => {
      try {
        if (!context.session.studentId) return null;
        const isSuccess = courseService.enroll(
          args.courseId,
          context.session.studentId
        );
        if (!isSuccess) {
          return {
            status: Status.Error,
            message: "Enrolling Course Failed",
          };
        }

        return {
          status: Status.Success,
          message: "Course Enrolled Successfully",
        };
      } catch (error) {
        console.error(error);
      }
    },
    startProgress: async (
      _: any,
      args: { enrolledCourseId: number; lessonId: number }
    ) => {
      try {
        const isStarted = await courseService.startProgress(
          args.enrolledCourseId,
          args.lessonId
        );
        if (isStarted.progressStatus === "FAILED") {
          return {
            status: Status.Error,
            progressStatus: isStarted.progressStatus,
            message: isStarted.message,
          };
        }

        return {
          status: Status.Success,
          progressStatus: isStarted.progressStatus,
          message: isStarted.message,
        };
      } catch (error) {
        console.error("Error starting progress:", error);
        return {
          status: Status.Error,
          progressStatus: "FAILED",
          message: "Internal server error",
        };
      }
    },
    finishProgress: async (
      _: any,
      args: { lessonId: number },
      context: MyContext
    ) => {
      try {
        const { studentId } = context.session

        if(!studentId) return {
          status: Status.Error,
          message: "Student not found",
        }

        const isStarted = await courseService.finishProgress(
          studentId,
          args.lessonId
        );

        if (isStarted.progressStatus === "FAILED") {
          return {
            status: Status.Error,
            progressStatus: isStarted.progressStatus,
            message: isStarted.message,
          };
        }

        return {
          status: Status.Success,
          progressStatus: isStarted.progressStatus,
          message: isStarted.message,
        };
      } catch (error) {
        console.error("Error starting progress:", error);
        return {
          status: Status.Error,
          progressStatus: "FAILED",
          message: "Internal server error",
        };
      }
    },
  },
};
