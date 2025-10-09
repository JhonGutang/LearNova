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
            level: 1, // Default level since it's not in schema
            exp: 0, // Default exp since it's not in schema
            coursesInProgress,
            courseRecommendations
        };
    }

    private async getCoursesInProgress(studentId: number) {
        // Fetch enrolled courses with course details
        const enrolledCourses = await this.prisma.enrolled_Course.findMany({
            where: { student_id: studentId },
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
            const completedLessons = enrolled.lessonProgress.filter(
                (progress: any) => progress.status === 'FINISHED'
            ).length;
            
            const progressPercentage = totalLessons > 0 
                ? (completedLessons / totalLessons) * 100 
                : 0;

            return {
                courseId: enrolled.course.id, // Attach the course id as courseId
                title: enrolled.course.title,
                tagline: enrolled.course.tagline,
                progressPercentage: Math.round(progressPercentage * 100) / 100 // Round to 2 decimal places
            };
        });
    }

    private async getRandomCourseRecommendations(studentId: number, limit: number = 5) {
        // Get enrolled course IDs to exclude them from recommendations
        const enrolledCourseIds = await this.prisma.enrolled_Course.findMany({
            where: { student_id: studentId },
            select: { course_id: true }
        });

        const enrolledIds = enrolledCourseIds.map((ec: any) => ec.course_id);

        // Get random courses that the student hasn't enrolled in
        const randomCourses = await this.prisma.course.findMany({
            where: {
                id: {
                    notIn: enrolledIds
                },
                status: 'PUBLISHED' // Only recommend published courses
            },
            take: limit,
            orderBy: {
                id: 'desc' // This is a simple way to get "random" courses
                // In production, you might want to use a more sophisticated randomization
            }
        });

        return randomCourses.map((course: any) => ({
            courseId: course.id, // Attach the course id to the recommendation
            title: course.title,
            tagline: course.tagline,
            rate: Math.random() * 5 // Random rating between 0-5 for demo purposes
            // In production, this could be based on actual ratings/reviews
        }));
    }
}