import prisma from "../config/prisma";
import { LessonPayload, LessonRepositoryInterface } from "../interfaces/lesson.interface"; 


export class LessonRepository implements LessonRepositoryInterface {
    async create(lesson: LessonPayload): Promise<object> {
        const newLesson = await prisma.lesson.create({
            data: {
                course_id: lesson.course_id,
                title: lesson.title,
                description: lesson.description,
            },
        });
        return newLesson;
    }

    async getAll(courseId: number): Promise<object> {
        const lessons = await prisma.lesson.findMany({
            where: {
                course_id: courseId,
            },
            select: {
                id: true,
                course_id: true,
                title: true,
                description: true,
            },
        });
        return lessons;
    }
}
