import { CreateStudentInput, StudentProfile } from "../../generated/graphql";
import bcrypt from 'bcrypt'

// Normalizer function to convert Prisma student + user to StudentProfile
function normalizeStudentProfile(student: any, user: any): StudentProfile {
    return {
        id: student.id,
        user_id: user.id,
        first_name: student.first_name,
        last_name: student.last_name,
        middle_name: student.middle_name,
        email: user.email,
        phone: student.phone,
        address: student.address,
        created_at: student.created_at,
        updated_at: student.updated_at,
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
                        first_name: input.first_name,
                        last_name: input.last_name,
                        middle_name: input.middle_name,
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