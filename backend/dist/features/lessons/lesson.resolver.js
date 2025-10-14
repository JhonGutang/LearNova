"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const lesson_service_1 = require("./lesson.service");
const lessonService = new lesson_service_1.LessonService();
exports.resolvers = {
    Mutation: {
        createLesson: async (_, args) => {
            try {
                return await lessonService.create(args.input);
            }
            catch (error) {
                console.error("Error creating lesson:", error);
                throw new Error("Failed to create lesson");
            }
        }
    }
};
