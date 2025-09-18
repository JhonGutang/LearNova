import prisma from "../../config/prisma";
import { CreateOrUpdateLessonPageInput, LessonPage } from "../../generated/graphql";

export interface LessonPageServiceInterface {
    getLessonPage(id: number): Promise<LessonPage | null>;
    getLessonPages(lessonId: number): Promise<LessonPage[]>;
    getLessonByPageNumber(lessonId: number, pageNumber: number): Promise<LessonPage | null>; 
    createLessonPage(input: CreateOrUpdateLessonPageInput): Promise<LessonPage>;
    updateLessonPage(id: number, input: CreateOrUpdateLessonPageInput): Promise<LessonPage>;
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
}