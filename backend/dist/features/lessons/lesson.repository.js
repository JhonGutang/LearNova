"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonRepository = void 0;
class LessonRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createLessonProgress(enrolledCourseId, lessonId) {
        return this.prisma.lesson_Progress.create({
            data: {
                enrolled_course_id: enrolledCourseId,
                lesson_id: lessonId,
            },
        });
    }
    async findLessonProgress(options) {
        const { enrolledCourseId, studentId, lessonId } = options;
        // Validate input to avoid ambiguous queries
        if (!enrolledCourseId && !studentId) {
            throw new Error("Either enrolledCourseId or studentId must be provided");
        }
        const whereClause = {
            lesson_id: lessonId,
        };
        if (enrolledCourseId) {
            whereClause.enrolled_course_id = enrolledCourseId;
        }
        else if (studentId) {
            whereClause.enrolledCourse = { student_id: studentId };
        }
        // Now also select the id
        return this.prisma.lesson_Progress.findFirst({
            where: whereClause,
            select: {
                id: true,
                status: true,
                lesson: {
                    select: {
                        exp: true,
                    },
                },
            },
        });
    }
    async findLessonProgressByEnrollment(enrolledCourseId) {
        return this.prisma.lesson_Progress.findMany({
            where: {
                enrolled_course_id: enrolledCourseId,
            },
        });
    }
    async updateLessonProgressStatus(progressId, status) {
        const result = await this.prisma.lesson_Progress.update({
            where: { id: progressId },
            data: { status },
        });
        return result !== null;
    }
}
exports.LessonRepository = LessonRepository;
