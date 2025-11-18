import { CourseCategory, CoursesPage } from "../../../generated/graphql";
import { CourseService } from "../../features/courses/courses.service";
import { formatStudentProfile } from "../../../utils/studentProfileFormatter";
import { PrismaClient } from "@prisma/client";

interface CoursesServiceInterface {
    getData(category: CourseCategory, studentId: number): Promise<CoursesPage>;
}

export class CoursesService implements CoursesServiceInterface {
    private prisma: PrismaClient;
    private courseService: CourseService;

    constructor(prisma: PrismaClient, courseService: CourseService) {
        this.prisma = prisma;
        this.courseService = courseService;
    }

    async getData(category: CourseCategory, studentId: number): Promise<CoursesPage> {
        const student = await this.prisma.student.findUnique({
            where: { id: studentId }
        });

        if (!student) {
            throw new Error('Student not found');
        }

        const studentProfile = formatStudentProfile(student);

        switch (category) {
            case CourseCategory.All: {
                const allCourses = await this.courseService.coursesForStudents(studentId);
                return {
                    student: studentProfile,
                    courses: allCourses,
                } as CoursesPage;
            }
            case CourseCategory.Featured: {
                const allCourses = await this.courseService.coursesForStudents(studentId);
                const featuredCourses = allCourses.slice(0, 3);
                return {
                    student: studentProfile,
                    courses: featuredCourses,
                } as CoursesPage;
            }
            case CourseCategory.Enrolled: {
                const enrollCourse = await this.courseService.studentEnrolledCourses(studentId);
                return {
                    student: studentProfile,
                    courses: enrollCourse,
                } as CoursesPage;
            }
            default:
                throw new Error('Invalid course category');
        }
    }
}