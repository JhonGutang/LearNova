import prisma from "../../config/prisma";
import { CreateOrUpdateLessonPageInput, LessonPage } from "../../generated/graphql";

export interface LessonPageServiceInterface {
    getLessonPage(id: number): Promise<LessonPage | null>;
    getLessonPages(lessonId: number): Promise<LessonPage[]>;
    getLessonByPageNumber(lessonId: number, pageNumber: number): Promise<LessonPage | null>;
    reOrderPages(lessonId: number, deletedPageNumber: number): Promise<Boolean>;
    createLessonPage(input: CreateOrUpdateLessonPageInput): Promise<LessonPage>;
    updateLessonPage(id: number, input: CreateOrUpdateLessonPageInput): Promise<LessonPage>;
    deleteLessonPage(id: number): Promise<boolean>;
}

export class LessonPageService implements LessonPageServiceInterface {
    async getLessonPages(lessonId: number): Promise<LessonPage[]> {
        const pages = await prisma.lesson_Page.findMany({
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

    async getLessonPage(id: number): Promise<LessonPage | null> {
        const page = await prisma.lesson_Page.findUnique({
            where: { id }
        });
        if (!page) return null;
        return {
            id: page.id,
            lessonId: page.lesson_id,
            pageNumber: page.page_number,
            contentJson: page.content_json,
            createdAt: page.created_at,
        };
    }

    async getLessonByPageNumber(lessonId: number, pageNumber: number): Promise<LessonPage | null> {
        const page = await prisma.lesson_Page.findUnique({
            where: { lesson_id_page_number: { lesson_id: lessonId, page_number: pageNumber } },
        });
        if (!page) return null;
        return {
            id: page.id,
            lessonId: page.lesson_id,
            pageNumber: page.page_number,
            contentJson: page.content_json,
            createdAt: page.created_at,
        };
    }

    async reOrderPages(lessonId: number, deletedPageNumber: number): Promise<Boolean> {
        await prisma.lesson_Page.updateMany({
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

    async createLessonPage(input: CreateOrUpdateLessonPageInput): Promise<LessonPage> {
        const page = await prisma.lesson_Page.create({
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

    async updateLessonPage(id: number, input: CreateOrUpdateLessonPageInput): Promise<LessonPage> {
        const page = await prisma.lesson_Page.update({
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

    async deleteLessonPage(id: number): Promise<boolean> {
        try {
            await prisma.lesson_Page.delete({
                where: { id }
            });
            return true;
        } catch (error) {
            // If the record does not exist, Prisma will throw an error
            return false;
        }
    }
}