import { CoursesPage } from "../../../generated/graphql";
import { CourseService } from "../../features/courses/courses.service";
import { formatStudentProfile } from "../../../utils/studentProfileFormatter";
import { PrismaClient } from "@prisma/client";

interface CoursesServiceInterface {
    getData(studentId: number): Promise<CoursesPage>;
}

export class CoursesService implements CoursesServiceInterface {
    private prisma: PrismaClient;
    private courseService: CourseService;

    constructor(prisma: PrismaClient, courseService: CourseService) {
        this.prisma = prisma;
        this.courseService = courseService;
    }

    async getData(studentId: number): Promise<CoursesPage> {
        const student = await this.prisma.student.findUnique({
            where: { id: studentId }
        });

        if (!student) {
            throw new Error('Student not found');
        }

        const allCourses = await this.courseService.coursesForStudents(studentId);
        const featuredCourses = allCourses.slice(0, 3);
        const enrollCourse = await this.courseService.studentEnrolledCourses(studentId);

        return {
            student: formatStudentProfile(student),
            allCourses,
            featuredCourses,
            enrollCourse,
        };
    }
}