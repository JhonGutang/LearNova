import prisma from "../../config/prisma";
import { CreateStudentInput, Status } from "../../generated/graphql";
import { StudentService } from "./student.service";

const studentService = new StudentService(prisma)

export const resolvers = {
    Mutation: {
        createStudent: (_:any, args: {input: CreateStudentInput}) => {
            const student = studentService.create(args.input);
            if(!student) {
                return {
                    status: Status.Error,
                    message: "Student creation failed"
                }
            }

            return {
                status: Status.Success,
                message: "Student Created Successfully"
            }
        }
    }
}