"use strict";
// features/course/course.repository.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRepository = void 0;
class CourseRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByTitle(title) {
        return this.prisma.course.findUnique({
            where: { title },
        });
    }
    async create(courseData) {
        const newCourse = await this.prisma.course.create({
            data: {
                title: courseData.title,
                creator_id: courseData.creator_id,
                tagline: courseData.tagline,
                description: courseData.description,
                categories: {
                    create: courseData.categories.map((categoryName) => ({
                        category: {
                            connectOrCreate: {
                                where: { name: categoryName.toLowerCase() },
                                create: { name: categoryName.toLowerCase() },
                            },
                        },
                    })),
                },
            },
            include: {
                categories: { include: { category: true } },
            },
        });
        return newCourse;
    }
    async findByIdAndTitle(courseId, title, creatorId) {
        const whereClause = {
            id: courseId,
            title: {
                equals: title,
                mode: "insensitive",
            },
        };
        // Apply creator filter if provided
        if (creatorId !== undefined) {
            whereClause.creator_id = creatorId;
        }
        const course = await this.prisma.course.findFirst({
            where: whereClause,
            select: {
                id: true,
                title: true,
                tagline: true,
                description: true,
                status: true,
                created_at: true,
                categories: {
                    select: {
                        category: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                lessons: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                    },
                },
                creator: {
                    select: {
                        first_name: true,
                        last_name: true,
                    },
                },
            },
        });
        return course;
    }
    async findAllCourses(options) {
        const { creatorId, studentId } = options;
        const whereClause = {};
        if (creatorId) {
            whereClause.creator_id = creatorId;
        }
        const baseSelect = {
            id: true,
            title: true,
            tagline: true,
            created_at: true,
            categories: { select: { category: { select: { name: true } } } },
            creator: { select: { first_name: true, last_name: true } },
        };
        if (studentId) {
            return await this.prisma.course.findMany({
                where: whereClause,
                select: {
                    ...baseSelect,
                    studentsEnrolled: {
                        where: { student_id: studentId },
                        select: { id: true },
                    },
                },
            });
        }
        return await this.prisma.course.findMany({
            where: whereClause,
            select: baseSelect,
        });
    }
    async findEnrolledCoursesByStudentId(studentId) {
        return this.prisma.enrolled_Course.findMany({
            where: {
                student_id: studentId,
            },
            include: {
                course: {
                    include: {
                        categories: { include: { category: true } },
                        lessons: true,
                        creator: true,
                    },
                },
            },
        });
    }
    async createEnrollment(courseId, studentId) {
        await this.prisma.enrolled_Course.create({
            data: {
                course_id: courseId,
                student_id: studentId,
            },
        });
    }
    async checkEnrollmentStatus(courseId, studentId) {
        const enrollment = await this.prisma.enrolled_Course.findFirst({
            where: {
                course_id: courseId,
                student_id: studentId,
            },
            select: {
                id: true,
            },
        });
        return {
            isEnrolled: enrollment !== null,
            enrolledCourseId: enrollment?.id,
        };
    }
}
exports.CourseRepository = CourseRepository;
