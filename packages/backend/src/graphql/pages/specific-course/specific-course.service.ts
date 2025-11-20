import { SpecificCourse } from "../../../generated/graphql";

interface SpecificCoursePageServiceInterface {
    getInfo(studentId: number, courseId: number, title: string): Promise<SpecificCourse | null>;
}

import { formatStudentProfile } from "../../../utils/studentProfileFormatter";

export class SpecificCoursePageService implements SpecificCoursePageServiceInterface {
    private prisma: any;
    private courseService: any;

    constructor(prisma: any, courseService: any) {
        this.prisma = prisma;
        this.courseService = courseService;
    }

    async getInfo(studentId: number, courseId: number, title: string): Promise<SpecificCourse | null> {
        const student = await this.prisma.student.findUnique({
            where: { id: studentId },
            select: {
                first_name: true,
                last_name: true,
            },
        });

        if (!student) {
            return null; 
        }

        const course = await this.courseService.course(studentId, courseId, title, "STUDENT");
        if (!course) {
            return null;
        }

        return {
            student: formatStudentProfile(student),
            course
        } as SpecificCourse;
    }
}