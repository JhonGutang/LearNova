import { CreateStudentInput, StudentDetails, StudentProfile } from "../../generated/graphql";
import bcrypt from 'bcrypt'

// Normalizer function to convert Prisma student + user to StudentProfile
function normalizeStudentProfile(student: any, user: any): StudentProfile {
    return {
        id: student.id,
        userId: user.id,
        firstName: student.first_name,
        lastName: student.last_name,
        middleName: student.middle_name,
        email: user.email,
        phone: student.phone,
        address: student.address,
        createdAt: student.created_at,
    };
}

interface StudentServiceInterface {
    create(input: CreateStudentInput): Promise<StudentProfile>
    getDetails(studentId: number): Promise<StudentDetails | null>
}

export class StudentService implements StudentServiceInterface {
    private prisma: any;

    constructor(prisma: any) {
      this.prisma = prisma;
    }

    async create(input: CreateStudentInput): Promise<StudentProfile> {
        const hashedPassword = await bcrypt.hash(input.password, 10);

        const user = await this.prisma.user.create({
            data: {
                email: input.email,
                password: hashedPassword,
                role: "STUDENT",
                student: {
                    create: {
                        first_name: input.firstName,
                        last_name: input.lastName,
                        middle_name: input.middleName,
                        phone: input.phone,
                        address: input.address,
                    }
                }
            },
            include: { student: true }
        });

        return normalizeStudentProfile(user.student, user);
    }

    async getDetails(studentId: number): Promise<StudentDetails | null> {
        const student = await this.prisma.student.findUnique({
            where: { id: studentId }
        });

        if (!student) {
            return null;
        }
        const coursesInProgress = await this.getCoursesInProgress(studentId);
        const courseRecommendations = await this.getRandomCourseRecommendations(studentId);
        return {
            id: student.id.toString(),
            firstName: student.first_name,
            lastName: student.last_name,
            level: student.level, 
            exp: student.exp,
            coursesInProgress,
            courseRecommendations
        };
    }

    private async getCoursesInProgress(studentId: number) {
        const enrolledCourses = await this.prisma.enrolled_Course.findMany({
            where: { student_id: studentId },
            orderBy: {
                updated_at: 'desc'
            },
            take: 2,
            include: {
                course: {
                    include: {
                        lessons: true
                    }
                },
                lessonProgress: true
            }
        });

        return enrolledCourses.map((enrolled: any) => {
            const totalLessons = enrolled.course.lessons.length;
            const finishedLessons = enrolled.lessonProgress.filter(
                (progress: any) => progress.status === 'FINISHED'
            ).length;

            const notFinished = finishedLessons < totalLessons;
            
            const progressPercentage = totalLessons > 0 
                ? (finishedLessons / totalLessons) * 100 
                : 0;

            return {
                courseId: enrolled.course.id,
                title: enrolled.course.title,
                tagline: enrolled.course.tagline,
                progressPercentage: Math.round(progressPercentage * 100) / 100,
                notFinished 
            };
        }).filter((enrolled: any) => enrolled.notFinished); 
    }

    private async getRandomCourseRecommendations(studentId: number, limit: number = 5) {
        const enrolledCourseIds = await this.prisma.enrolled_Course.findMany({
            where: { student_id: studentId },
            select: { course_id: true }
        });

        const enrolledIds = enrolledCourseIds.map((ec: any) => ec.course_id);
        const randomCourses = await this.prisma.course.findMany({
            where: {
                id: {
                    notIn: enrolledIds
                },
                status: 'PUBLISHED'
            },
            take: limit,
            orderBy: {
                id: 'desc' 
            }
        });

        return randomCourses.map((course: any) => ({
            courseId: course.id, 
            title: course.title,
            tagline: course.tagline,
            rate: Math.random() * 5 
        }));
    }
}