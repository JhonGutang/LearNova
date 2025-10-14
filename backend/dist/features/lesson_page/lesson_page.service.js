"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonPageService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class LessonPageService {
    async getLessonPages(lessonId) {
        const pages = await prisma_1.default.lesson_Page.findMany({
            where: { lesson_id: lessonId }
        });
        return pages.map(page => ({
            id: page.id,
            lessonId: page.lesson_id,
            pageNumber: page.page_number,
            contentJson: page.content_json,
            createdAt: page.created_at,
        }));
    }
    async getLessonPage(id) {
        const page = await prisma_1.default.lesson_Page.findUnique({
            where: { id }
        });
        if (!page)
            return null;
        return {
            id: page.id,
            lessonId: page.lesson_id,
            pageNumber: page.page_number,
            contentJson: page.content_json,
            createdAt: page.created_at,
        };
    }
    async getLessonByPageNumber(lessonId, pageNumber) {
        const page = await prisma_1.default.lesson_Page.findUnique({
            where: { lesson_id_page_number: { lesson_id: lessonId, page_number: pageNumber } },
        });
        if (!page)
            return null;
        return {
            id: page.id,
            lessonId: page.lesson_id,
            pageNumber: page.page_number,
            contentJson: page.content_json,
            createdAt: page.created_at,
        };
    }
    async reOrderPages(lessonId, deletedPageNumber) {
        await prisma_1.default.lesson_Page.updateMany({
            where: {
                lesson_id: lessonId,
                page_number: {
                    gt: deletedPageNumber,
                },
            },
            data: {
                page_number: {
                    decrement: 1,
                },
            },
        });
        return true;
    }
    async createLessonPage(input) {
        const page = await prisma_1.default.lesson_Page.create({
            data: {
                lesson_id: input.lessonId,
                page_number: input.pageNumber,
                content_json: input.contentJson,
            }
        });
        return {
            id: page.id,
            lessonId: page.lesson_id,
            pageNumber: page.page_number,
            contentJson: page.content_json,
            createdAt: page.created_at,
        };
    }
    async updateLessonPage(id, input) {
        const page = await prisma_1.default.lesson_Page.update({
            where: { id },
            data: {
                lesson_id: input.lessonId,
                page_number: input.pageNumber,
                content_json: input.contentJson,
            }
        });
        return {
            id: page.id,
            lessonId: page.lesson_id,
            pageNumber: page.page_number,
            contentJson: page.content_json,
            createdAt: page.created_at,
        };
    }
    async deleteLessonPage(id) {
        try {
            await prisma_1.default.lesson_Page.delete({
                where: { id }
            });
            return true;
        }
        catch (error) {
            // If the record does not exist, Prisma will throw an error
            return false;
        }
    }
}
exports.LessonPageService = LessonPageService;
