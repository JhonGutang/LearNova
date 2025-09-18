import prisma from "../../config/prisma";
import { CreateLessonPageInput, LessonPage } from "../../generated/graphql";
export interface LessonPageServiceInterface {
    getLessonPage(id: number): Promise<LessonPage | null>;
    getLessonPages(lessonId: number): Promise<LessonPage[]>;
    createLessonPage(input: CreateLessonPageInput): Promise<LessonPage>;
}


export class LessonPageService implements LessonPageServiceInterface {
    async getLessonPage(id: number): Promise<LessonPage | null> {
        return await prisma.lesson_Page.findUnique({
            where: { id }
        });
    }

    async getLessonPages(lessonId: number): Promise<LessonPage[]> {
        return await prisma.lesson_Page.findMany({
            where: { lesson_id: lessonId }
        });
    }

    async createLessonPage(input: CreateLessonPageInput): Promise<LessonPage> {
        return await prisma.lesson_Page.create({
            data: {
                lesson_id: input.lessonId,
                page_number: input.pageNumber,
                content_json: input.contentJson,
            }
        });
    }
}