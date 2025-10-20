import { MyContext } from "../../../types/context";
import { CoursesService } from "./courses.service";
import { CourseService } from "../../features/courses/courses.service";
import { CourseRepository } from "../../features/courses/course.repository";
import prisma from "../../../config/prisma";
import { CourseCategory } from "../../../generated/graphql";

const courseRepository = new CourseRepository(prisma);
const courseService = new CourseService(courseRepository);
const coursesService = new CoursesService(prisma, courseService);

export const resolvers = {
  Query: {
    coursesPage: async (
      _: unknown,
      args: { category: CourseCategory },
      context: MyContext
    ) => {
      const { studentId } = context.session;
      if (!studentId) return null;

      return await coursesService.getData(args.category, studentId);
    },
  },
};
