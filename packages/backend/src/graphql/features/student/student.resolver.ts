import prisma from "../../../config/prisma";
import { CreateStudentInput, ResponseStatus } from "../../../generated/graphql";
import { CourseRepository } from "../courses/course.repository";
import { StudentService } from "./student.service";
const courseRepository = new CourseRepository(prisma)
const studentService = new StudentService(prisma, courseRepository)

export const resolvers = {
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