import { CourseInput } from '../../generated/graphql';
import { CourseService } from './courses.service';

const courseService = new CourseService();

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
  },

  Mutation: {
    createCourse: async (_: any, args: { input: CourseInput }) => {
      try {
        return await courseService.create(args.input);
      } catch (error) {
        console.error('Error creating course:', error);
        throw new Error('Internal server error');
      }
    },
  },
};
