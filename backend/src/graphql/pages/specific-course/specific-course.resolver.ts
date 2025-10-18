import prisma from "../../../config/prisma";
import { MyContext } from "../../../types/context";
import { CourseRepository } from "../../features/courses/course.repository";
import { CourseService } from "../../features/courses/courses.service";
import { SpecificCoursePageService } from "./specific-course.service";

const courseRepository = new CourseRepository(prisma);
const courseService = new CourseService(courseRepository);
const specificCoursePageService = new SpecificCoursePageService(prisma, courseService)

export const resolvers = {
    Query: {
        specificCoursePage: async (_: unknown, args: { courseId: number, title: string }, context: MyContext) => {
            const { studentId, role } = context.session;
            if ((studentId === undefined || studentId === null) && role !== 'STUDENT') return null;
            if (studentId === undefined || studentId === null) return null;
            return await specificCoursePageService.getInfo(studentId, args.courseId, args.title);
        }
    }
};