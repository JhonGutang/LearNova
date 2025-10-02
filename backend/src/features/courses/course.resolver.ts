import prisma from '../../config/prisma';
import { CourseInput } from '../../generated/graphql';
import { MyContext } from '../../types/context';
import { CourseService } from './courses.service';

const courseService = new CourseService(prisma);

export const resolvers = {
  Query: {
    course: async (_: any, args: { id: string }, context: MyContext) => {
      if (!context.session.creatorId) return null;
      try {
        const courseId = parseInt(args.id);
        const course = await courseService.getById(courseId, context.session.creatorId);
        if (!course) {
          throw new Error('Course not found');
        }
        return course;
      } catch (error) {
        throw new Error(`Internal server error: ${error}`);
      }
    },
    courses: async (_: any, __: any, context: MyContext) => {
      try {
        console.log(context.session.role)
        if(!context.session.role) return null
        if(context.session.role === "STUDENT") {
          return await courseService.getAll();
        }
        
        if(context.session.role = "CREATOR") {
          if (!context.session.creatorId) return null;
          return await courseService.getAll(context.session.creatorId);
        }
      } catch (error) {
        throw new Error(`Internal server error: ${error}`);
      }
    },
    courseWithCreator: async (_: any, args: { id: string, title: string }) => {
      try {
        const courseId = parseInt(args.id);
        const course = await courseService.getByIdWithCreator(courseId, args.title);
        if (!course) {
          throw new Error('Course not found');
        }
        return course;
      } catch (error) {
        throw new Error(`Internal server error: ${error}`);
      }
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
