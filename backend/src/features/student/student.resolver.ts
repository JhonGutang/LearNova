import prisma from "../../config/prisma";
import { CreateStudentInput, ResponseStatus } from "../../generated/graphql";
import { MyContext } from "../../types/context";
import { StudentService } from "./student.service";

const studentService = new StudentService(prisma)

export const resolvers = {
    Query: {
        studentDetails: async (_:any, args: any, context: MyContext) => {
            const { studentId } = context.session;
            if (!studentId ) {
                throw new Error('Student not authenticated');
            }
            
            return await studentService.getDetails(studentId);
        }
    },
    Mutation: {
        createStudent: (_:any, args: {input: CreateStudentInput}) => {
            const student = studentService.create(args.input);
            if(!student) {
                return {
                    status: ResponseStatus.Error,
                    message: "Student creation failed"
                }
            }

            return {
                status: ResponseStatus.Success,
                message: "Student Created Successfully"
            }
        }
    }
}