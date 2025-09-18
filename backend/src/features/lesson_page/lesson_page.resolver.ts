import { LessonPageService } from "./lesson_page.service";
import { CreateLessonPageInput } from "../../generated/graphql";
const lessonPageService = new LessonPageService();

export const resolvers = {
  Query: {
    lessonPage: async (_: any, args: { id: number }) => {
      return await lessonPageService.getLessonPage(args.id);
    },
    lessonPages: async (_: any, args: { lessonId: number }) => {
      return await lessonPageService.getLessonPages(args.lessonId);
    },
  },
  Mutation: {
    createLessonPage: async (
      _: any,
      args: { input: CreateLessonPageInput }
    ) => {
      return await lessonPageService.createLessonPage(args.input);
    },
  },
};
