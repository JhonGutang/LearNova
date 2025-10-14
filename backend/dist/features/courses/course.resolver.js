"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const graphql_1 = require("../../generated/graphql");
const course_repository_1 = require("./course.repository");
const courses_service_1 = require("./courses.service");
const lesson_repository_1 = require("../lessons/lesson.repository");
const level_system_service_1 = require("../level_system/level_system.service");
const courseRepository = new course_repository_1.CourseRepository(prisma_1.default);
const lessonRepository = new lesson_repository_1.LessonRepository(prisma_1.default);
const levelSystemService = new level_system_service_1.LevelSystemService(prisma_1.default);
const courseService = new courses_service_1.CourseService(courseRepository, lessonRepository, levelSystemService);
exports.resolvers = {
    Query: {
        course: async (_, args, context) => {
            const { role, studentId, creatorId } = context.session;
            if (!role)
                return null;
            const courseId = parseInt(args.id);
            const getOptions = role === "STUDENT"
                ? studentId
                    ? { studentId }
                    : undefined
                : role === "CREATOR"
                    ? creatorId
                        ? { creatorId }
                        : null
                    : null;
            if (getOptions === null)
                return null;
            const course = await courseService.getSpecificCourse(courseId, args.title, getOptions);
            if (!course && role === "CREATOR") {
                throw new Error("Course not found");
            }
            return course;
        },
        courses: async (_, __, context) => {
            try {
                const { role, studentId, creatorId } = context.session;
                if (!role)
                    return null;
                const getOptions = role === "STUDENT"
                    ? studentId
                        ? { studentId }
                        : undefined
                    : role === "CREATOR"
                        ? creatorId
                            ? { creatorId }
                            : null
                        : null;
                if (getOptions === null)
                    return null;
                return await courseService.getAllCourses(getOptions);
            }
            catch (error) {
                throw new Error(`Internal server error: ${error}`);
            }
        },
        enrolledCourses: async (_, __, context) => {
            try {
                if (!context.session.studentId)
                    return null;
                return await courseService.getEnrolledCourses(context.session.studentId);
            }
            catch (error) {
                console.error("Error fetching enrolled courses:", error);
                throw new Error("Internal server error");
            }
        },
    },
    Mutation: {
        createCourse: async (_, args, context) => {
            try {
                if (!context.session.creatorId)
                    return null;
                const inputWithCreatorId = {
                    ...args.input,
                    creator_id: context.session.creatorId,
                };
                return await courseService.create(inputWithCreatorId);
            }
            catch (error) {
                console.error("Error creating course:", error);
                throw new Error("Internal server error");
            }
        },
        enrollCourse: async (_, args, context) => {
            try {
                if (!context.session.studentId)
                    return null;
                const isSuccess = await courseService.enroll(args.courseId, context.session.studentId);
                if (!isSuccess) {
                    return {
                        status: graphql_1.ResponseStatus.Error,
                        message: "Enrolling Course Failed",
                    };
                }
                return {
                    status: graphql_1.ResponseStatus.Success,
                    message: "Course Enrolled Successfully",
                };
            }
            catch (error) {
                console.error(error);
            }
        },
        startProgress: async (_, args) => {
            try {
                const isStarted = await courseService.startProgress(args.enrolledCourseId, args.lessonId);
                if (isStarted.progressStatus === "FAILED") {
                    return {
                        status: graphql_1.ResponseStatus.Error,
                        progressStatus: isStarted.progressStatus,
                        message: isStarted.message,
                    };
                }
                return {
                    status: graphql_1.ResponseStatus.Success,
                    progressStatus: isStarted.progressStatus,
                    message: isStarted.message,
                };
            }
            catch (error) {
                console.error("Error starting progress:", error);
                return {
                    status: graphql_1.ResponseStatus.Error,
                    progressStatus: "FAILED",
                    message: "Internal server error",
                };
            }
        },
        finishProgress: async (_, args, context) => {
            try {
                const { studentId } = context.session;
                if (!studentId)
                    return {
                        status: graphql_1.ResponseStatus.Error,
                        message: "Student not found",
                    };
                const isStarted = await courseService.finishProgress(studentId, args.lessonId);
                if (isStarted.progressStatus === "FAILED") {
                    return {
                        status: graphql_1.ResponseStatus.Error,
                        progressStatus: isStarted.progressStatus,
                        message: isStarted.message,
                    };
                }
                return {
                    status: graphql_1.ResponseStatus.Success,
                    progressStatus: isStarted.progressStatus,
                    message: isStarted.message,
                };
            }
            catch (error) {
                console.error("Error starting progress:", error);
                return {
                    status: graphql_1.ResponseStatus.Error,
                    progressStatus: "FAILED",
                    message: "Internal server error",
                };
            }
        },
    },
};
