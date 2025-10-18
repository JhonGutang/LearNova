import { MyContext } from "../../../types/context";
import { CoursesService } from "./courses.service";
import { CourseService } from "../../features/courses/courses.service";
import { CourseRepository } from "../../features/courses/course.repository";
import prisma from "../../../config/prisma";

const courseRepository = new CourseRepository(prisma);
const courseService = new CourseService(courseRepository);
const coursesService = new CoursesService(prisma, courseService);


export const resolvers = {
  Query: {
    coursesPage: async (_: unknown, args: {}, context: MyContext) => {
      const { studentId } = context.session;
      if (!studentId) return null;

      return await coursesService.getData(studentId);
    },
  },
};
