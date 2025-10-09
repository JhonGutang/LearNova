import { CreateStudentInput, StudentProfile } from "../../generated/graphql";
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
}