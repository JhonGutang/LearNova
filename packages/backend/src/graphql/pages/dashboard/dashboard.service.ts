import { PrismaClient } from "@prisma/client";
import { DashboardPage } from "../../../generated/graphql";
import { CourseService } from "../../features/courses/courses.service";
import { formatStudentProfile } from "../../../utils/studentProfileFormatter";

interface DashboardServiceInterface {
    getInfo(studentId: number): Promise<DashboardPage | null>;
}

export class DashboardService implements DashboardServiceInterface {
    private prisma: PrismaClient;
    private courseService: CourseService;

    constructor(prismaInstance: PrismaClient, courseService: CourseService) {
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
            student: formatStudentProfile(student),
            coursesInProgress,
            courseRecommendations
        };
    }
}