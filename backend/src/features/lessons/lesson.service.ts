import prisma from "../../config/prisma";
import { Lesson, LessonInput } from "../../generated/graphql";
import { LessonServiceInterface } from "../../interfaces/lesson.interface";

export class LessonService implements LessonServiceInterface{
    async createLesson(lessonData: LessonInput): Promise<Lesson> {
        try {
            const newLesson = await prisma.lesson.create({
                data: {
                    course_id: lessonData.course_id,
                    title: lessonData.title,
                    description: lessonData.description,
                },
            });
            if (!newLesson) {
                throw new Error("Failed to create lesson");
            }
            return newLesson;
        } catch (error) {
            console.error("Error creating lesson:", error);
            throw new Error("Failed to create lesson");
        }
    }

    async getLessons(courseid: number): Promise<Lesson[]> {
        try {
            const lessons = await prisma.lesson.findMany({
                where: { course_id: courseid }
            });
            return lessons ?? [];
        } catch (error) {
            console.error("Error fetching lessons:", error);
            throw new Error("Failed to fetch lessons");
        }
    }

    async getLessonById(lessonId: number): Promise<Lesson | null> {
        try {
            const lesson = await prisma.lesson.findUnique({
                where: {id: lessonId}
            });
            return lesson;
        } catch (error) {
            console.error("Error fetching lesson by id:", error);
            throw new Error("Failed to fetch lesson by id");
        }
    }
}
