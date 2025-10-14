"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
function convertLessonIdToString(lesson) {
    return {
        ...lesson,
        id: String(lesson.id),
    };
}
class LessonService {
    // Only select this data: id, title, description
    async create(lessonData) {
        try {
            const newLesson = await prisma_1.default.lesson.create({
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
        }
        catch (error) {
            console.error("Error creating lesson:", error);
            throw new Error("Failed to create lesson");
        }
    }
}
exports.LessonService = LessonService;
