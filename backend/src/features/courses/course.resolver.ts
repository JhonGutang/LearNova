import prisma from "../../config/prisma";
import { CourseInput, Status } from "../../generated/graphql";
import { MyContext } from "../../types/context";
import { CourseService } from "./courses.service";

const courseService = new CourseService(prisma);

export const resolvers = {
  Query: {
    course: async (
      _: any,
      args: { id: string; title: string },
      context: MyContext
    ) => {
      try {
        const courseId = parseInt(args.id);
        if (!context.session.role) return null;
        console.log(context.session.role);

        if (context.session.role === "STUDENT") {
          const getOptions = context.session.studentId
            ? { studentId: context.session.studentId }
            : undefined;
          const course = await courseService.getById(courseId, args.title, getOptions);
          return course;
        }

        if (context.session.role === "CREATOR") {
          if (!context.session.creatorId) return null;
          const getOptions = { creatorId: context.session.creatorId };
          const course = await courseService.getById(
            courseId,
            args.title,
            getOptions
          );
          if (!course) {
            throw new Error("Course not found");
          }
          return course;
        }
      } catch (error) {
        throw new Error(`Internal server error: ${error}`);
      }
    },
    courses: async (_: any, __: any, context: MyContext) => {
      try {
        if (!context.session.role) return null;
        if (context.session.role === "STUDENT") {
          return await courseService.getAll({ studentId: context.session.studentId });
        }

        if ((context.session.role = "CREATOR")) {
          if (!context.session.creatorId) return null;
          return await courseService.getAll({ creatorId: context.session.creatorId });
        }
      } catch (error) {
        throw new Error(`Internal server error: ${error}`);
      }
    },
    enrolledCourses: async (_: any, __: any, context: MyContext) => {
      try {
        if (!context.session.studentId) return null;
        return await courseService.enrolled(context.session.studentId);
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
    startProgress: async (_: any, args: { enrolledCourseId: number, lessonId: number }) => {
      try {
        console.log(args.enrolledCourseId, args.lessonId)
        const isStarted = await courseService.startProgress(args.enrolledCourseId, args.lessonId);
        if (!isStarted) {
          return {
            status: Status.Error,
            message: "Starting Progress Failed"
          };
        }

        return {
          status: Status.Success,
          message: "Progress Started Successfully"
        };
      } catch (error) {
        console.error("Error starting progress:", error);
        return {
          status: Status.Error,
          message: "Internal server error"
        };
      }
    },
  }
};
