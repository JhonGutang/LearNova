import { LessonPageService } from "./lesson_page.service";
import { CreateOrUpdateLessonPageInput } from "../../generated/graphql";
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
    createOrUpdateLessonPage: async (_: any, args: { input: CreateOrUpdateLessonPageInput }) => {
      const { lessonId, pageNumber, contentJson } = args.input;
      const existingPage = await lessonPageService.getLessonByPageNumber(lessonId, pageNumber);

      if (existingPage) {
        return await lessonPageService.updateLessonPage(existingPage.id, {
          lessonId,
          pageNumber,
          contentJson,
        });
      }

      return await lessonPageService.createLessonPage(args.input);
    },
    deleteLessonPage: async (_: any, args: { id: number }) => {
      const pageToDelete = await lessonPageService.getLessonPage(args.id);
      if (!pageToDelete) {
        return false;
      }
      const { lessonId, pageNumber } = pageToDelete;
      const deleted = await lessonPageService.deleteLessonPage(args.id);

      if (!deleted) {
        return false;
      }

      return await lessonPageService.reOrderPages(lessonId, pageNumber);
    },
  },
}  
