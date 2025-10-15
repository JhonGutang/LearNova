import { LessonInput } from "../../../generated/graphql";
import { LessonService } from "./lesson.service"

const lessonService = new LessonService();

export const resolvers = {
    Mutation: {
        createLesson: async (_: any, args: {input: LessonInput}) => {
            try {
                return await lessonService.create(args.input);
            } catch (error) {
                console.error("Error creating lesson:", error);
                throw new Error("Failed to create lesson");
            }
        }
    }
}