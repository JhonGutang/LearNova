import prisma from "../../../config/prisma";
import { EditLessonInput, Lesson, LessonInput } from "../../../generated/graphql";
import { LessonServiceInterface } from "../../../interfaces/lesson.interface";
import { LessonRepository } from "./lesson.repository";

function convertLessonIdToString(lesson: any): Lesson {
    return {
        ...lesson,
        id: String(lesson.id),
    };
}

export class LessonService implements LessonServiceInterface {
    private lessonRepository: LessonRepository;

    constructor() {
        // Inject the repository with the shared prisma instance
        this.lessonRepository = new LessonRepository(prisma);
    }

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

    async edit(lesson: EditLessonInput, creatorId: number): Promise<Lesson[]> {
        if (!creatorId) {
            throw new Error(
                "creatorId is required to edit lessons. Make sure to pass the logged-in creator's ID to lessonService.edit()."
            );
        }
        return this.lessonRepository.updateLessonsWithAuthorization(lesson);
    }
}
