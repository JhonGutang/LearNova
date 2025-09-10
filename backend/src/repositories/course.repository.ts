import { CoursePayload } from "../interfaces/course.interface";
import prisma from "../config/prisma";

interface CourseRepositoryInterface {
    create(course: Object): Promise<object>;
    getAll(): Promise<object>;
    getSpecificCourse(courseId: number): Promise<object | null>;
}

export class CourseRepository implements CourseRepositoryInterface {
    async create(course: CoursePayload): Promise<object> {
        const newCourse = await prisma.course.create({
            data: {
                title: course.title,
                description: course.description,
                tagline: course.tagline,
                categories: {
                    create: course.categories.map((categoryName: string) => ({
                        category: {
                            connectOrCreate: {
                                where: { name: categoryName },
                                create: { name: categoryName }
                            }
                        }
                    }))
                }
            },
            include: {
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        });
        return newCourse;
    }

    async getAll(): Promise<object> {
        const courses = await prisma.course.findMany({
            include: {
                categories: {
                    select: {
                        category: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        return courses;
    }

    async getSpecificCourse(courseId: number): Promise<object | null> {
        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
            },
            include: {
                categories: {
                    include: {
                        category: {
                            select: {
                                name: true,
                            },
                        }
                    }
                },
                lessons: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                    }
                    }
            }
        });
        return course;
    }
}