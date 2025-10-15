import prisma from "../../../config/prisma";
import { Lesson, LessonInput } from "../../../generated/graphql";
import { LessonServiceInterface } from "../../../interfaces/lesson.interface";

function convertLessonIdToString(lesson: any): Lesson {
    return {
        ...lesson,
        id: String(lesson.id),
    };
}

export class LessonService implements LessonServiceInterface {
    // Only select this data: id, title, description
    async create(lessonData: LessonInput): Promise<Lesson> {
        try {
            const newLesson = await prisma.lesson.create({
                data: {
                    course_id: lessonData.course_id,
                    title: lessonData.title,
                    description: lessonData.description,
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                },
            });
            if (!newLesson) {
                throw new Error("Failed to create lesson");
            }
            return convertLessonIdToString(newLesson);
        } catch (error) {
            console.error("Error creating lesson:", error);
            throw new Error("Failed to create lesson");
        }
    }
}
