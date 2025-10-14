"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const graphql_1 = require("../../generated/graphql");
const student_service_1 = require("./student.service");
const studentService = new student_service_1.StudentService(prisma_1.default);
exports.resolvers = {
    Query: {
        studentDetails: async (_, args, context) => {
            const { studentId } = context.session;
            if (!studentId) {
                throw new Error('Student not authenticated');
            }
            return await studentService.getDetails(studentId);
        }
    },
    Mutation: {
        createStudent: (_, args) => {
            const student = studentService.create(args.input);
            if (!student) {
                return {
                    status: graphql_1.ResponseStatus.Error,
                    message: "Student creation failed"
                };
            }
            return {
                status: graphql_1.ResponseStatus.Success,
                message: "Student Created Successfully"
            };
        }
    }
};
