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
        return await prisma.lesson_Page.findMany({
            where: { lesson_id: lessonId }
        });
    }

    async getLessonPage(id: number): Promise<LessonPage | null> {
        return await prisma.lesson_Page.findUnique({
            where: { id }
        });
    }

    async getLessonByPageNumber(lessonId: number, pageNumber: number): Promise<LessonPage | null> {
        return await prisma.lesson_Page.findUnique({
            where: { lesson_id_page_number: { lesson_id: lessonId, page_number: pageNumber } },
        });
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
        return await prisma.lesson_Page.create({
            data: {
                lesson_id: input.lessonId,
                page_number: input.pageNumber,
                content_json: input.contentJson,
            }
        });
    }

    async updateLessonPage(id: number, input: CreateOrUpdateLessonPageInput): Promise<LessonPage> {
        return await prisma.lesson_Page.update({
            where: { id },
            data: {
                lesson_id: input.lessonId,
                page_number: input.pageNumber,
                content_json: input.contentJson,
            }
        });
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