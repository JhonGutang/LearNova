import prisma from '../../config/prisma';
import { CourseInput } from '../../generated/graphql';
import { MyContext } from '../../types/context';
import { CourseService } from './courses.service';

const courseService = new CourseService(prisma);

export const resolvers = {
  Query: {
    courses: async () => {
      try {
        return await courseService.getAll();
      } catch (error) {
        console.error('Error getting courses:', error);
        throw new Error('Internal server error');
      }
    },
    course: async (_: any, args: { id: string }) => {
      try {
        const courseId = parseInt(args.id);
        const course = await courseService.getById(courseId);
        if (!course) {
          throw new Error('Course not found');
        }
        return course;
      } catch (error) {
        throw new Error(`Internal server error: ${error}`);
      }
    },
    coursesByCreator: async (_: any, __: any, context: MyContext) => {
      console.log("SESSION CONTENT:", context.session);
      if (!context.session.creatorId) return null;
      return courseService.getByCreator(context.session.creatorId);
    }
  },

  Mutation: {
    createCourse: async (_: any, args: { input: CourseInput }, context: MyContext) => {
      try {
      if (!context.session.creatorId) return null;
      const inputWithCreatorId = {
        ...args.input,
        creator_id: context.session.creatorId,
      };
        return await courseService.create(inputWithCreatorId);
      } catch (error) {
        console.error('Error creating course:', error);
        throw new Error('Internal server error');
      }
    },
  },
};
