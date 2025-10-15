import { PrismaClient } from "@prisma/client";
import { DashboardPage } from "../../generated/graphql";
import { StudentService } from "../features/student/student.service";
import { CourseService } from "../features/courses/courses.service";

interface DashboardServiceInterface {
    getInfo(studentId: number): Promise<DashboardPage | null>;
}

export class DashboardService implements DashboardServiceInterface {
    private prisma: PrismaClient;
    private courseService: CourseService;

    constructor(prismaInstance: PrismaClient, studentService: StudentService, courseService: CourseService) {
        this.prisma = prismaInstance;
        this.courseService = courseService;
    }

    async getInfo(studentId: number): Promise<DashboardPage | null> {
        const student = await this.prisma.student.findUnique({
            where: { id: studentId }
        });

        if (!student) {
            return null; 
        }
        const coursesInProgress = await this.courseService.getCoursesInProgress(studentId);
        const courseRecommendations = await this.courseService.getRandomCourseRecommendations(studentId);
        return {
            student: {
                id: student.id.toString(),
                firstName: student.first_name,
                lastName: student.last_name,
                level: student.level,
                exp: student.exp,
            },
            coursesInProgress,
            courseRecommendations
        };
    }
}