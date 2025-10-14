"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const lesson_page_service_1 = require("./lesson_page.service");
const lessonPageService = new lesson_page_service_1.LessonPageService();
exports.resolvers = {
    Query: {
        lessonPage: async (_, args) => {
            return await lessonPageService.getLessonPage(args.id);
        },
        lessonPages: async (_, args) => {
            return await lessonPageService.getLessonPages(args.lessonId);
        },
    },
    Mutation: {
        createOrUpdateLessonPage: async (_, args) => {
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
        deleteLessonPage: async (_, args) => {
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
};
