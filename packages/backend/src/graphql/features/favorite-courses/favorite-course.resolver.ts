import prisma from "../../../config/prisma";
import { ResponseStatus } from "../../../generated/graphql";
import { MyContext } from "../../../types/context";
import { FavoriteCourseRepository } from "./favorite-course.repository";
import { FavoriteCourseService } from "./favorite-course.service";

const favoriteCourseRepository = new FavoriteCourseRepository(prisma);
const favoriteCourseService = new FavoriteCourseService(favoriteCourseRepository);

export const resolvers = {
  Query: {
    favoriteCourses: async (_: unknown, __: unknown, context: MyContext) => {
      const { userId, studentId, role } = context.session;
      
      if (!userId || !studentId || role !== "STUDENT") {
        return null;
      }

      return await favoriteCourseService.getFavoriteCourses(studentId);
    }
  },
  Mutation: {
    toggleFavoriteCourse: async (_: unknown, args: { courseId: number }, context: MyContext) => {
      const { userId, studentId, role } = context.session;

      if (!userId || !studentId || role !== "STUDENT") {
        return {
          status: ResponseStatus.Error,
          message: "Unauthorized: Only students can toggle favorite courses",
          isFavorite: false
        };
      }

      const result = await favoriteCourseService.toggleFavoriteCourse(studentId, args.courseId);

      if (result.success) {
        return {
          status: ResponseStatus.Success,
          message: result.isFavorite 
            ? "Course added to favorites successfully" 
            : "Course removed from favorites successfully",
          isFavorite: result.isFavorite
        };
      } else {
        return {
          status: ResponseStatus.Error,
          message: "Failed to toggle favorite course",
          isFavorite: false
        };
      }
    }
  }
};

