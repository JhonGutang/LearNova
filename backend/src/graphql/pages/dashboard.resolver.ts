import prisma from "../../config/prisma";
import { MyContext } from "../../types/context";
import { CourseRepository } from "../features/courses/course.repository";
import { StudentService } from "../features/student/student.service";
const courseRepository = new CourseRepository(prisma)
const studentService = new StudentService(prisma, courseRepository);

export const resolvers = {
    Query: {
        DashboardPage: async (_: any, __: any, context: MyContext) => {
            const studentId = context.session?.studentId;
            if (!studentId) {
                throw new Error('Student not authenticated');
            }
            try {
                const student = await studentService.getDetails(studentId);
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