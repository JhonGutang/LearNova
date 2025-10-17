import prisma from "../../config/prisma";
import { MyContext } from "../../types/context";
import { CourseRepository } from "../features/courses/course.repository";
import { CourseService } from "../features/courses/courses.service";
import { DashboardService } from "./dashboard.service";


const courseRepository = new CourseRepository(prisma)
const courservice = new CourseService(courseRepository)
const dashboardService = new DashboardService(prisma, courservice)

export const resolvers = {
    Query: {
        DashboardPage: async (_: any, __: any, context: MyContext) => {
            const studentId = context.session?.studentId;
            if (!studentId) {
                throw new Error('Student not authenticated');
            }
            try {
                const student = await dashboardService.getInfo(studentId);
                if (!student) {
                    throw new Error('Student not found');
                }
                return student;
            } catch (error: any) {
                throw new Error(error.message || 'Failed to fetch student details');
            }
        }
    }
}