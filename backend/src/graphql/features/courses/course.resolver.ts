import prisma from "../../../config/prisma";
import { CourseInput, ResponseStatus } from "../../../generated/graphql";
import { MyContext } from "../../../types/context";
import { CourseRepository } from "./course.repository";
import { CourseService } from "./courses.service";


const courseRepository = new CourseRepository(prisma);
const courseService = new CourseService(courseRepository);

export const resolvers = {
  Query: {
    courses: async (_: unknown, __: {}, context: MyContext) => {
      const { studentId, role } = context.session;
      if(!studentId && role !== 'STUDENT') return null
      return await courseService.coursesForStudents();
    },
    course: async (_: unknown, args: { courseId: number, title: string }, context: MyContext) => {
      const { studentId, role } = context.session;
      if ((studentId === undefined || studentId === null) && role !== 'STUDENT') return null;
      if (studentId === undefined || studentId === null) return null;
      return await courseService.course(studentId, args.courseId, args.title);
    }
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
        const isSuccess = await courseService.enroll(
          args.courseId,
          context.session.studentId
        );
        if (!isSuccess) {
          return {
            status: ResponseStatus.Error,
            message: "Enrolling Course Failed",
          };
        }

        return {
          status: ResponseStatus.Success,
          message: "Course Enrolled Successfully",
        };
      } catch (error) {
        console.error(error);
      }
    },
  }
};
