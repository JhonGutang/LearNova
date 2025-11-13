import { EditLessonInput, LessonInput } from "../../../generated/graphql";
import { MyContext } from "../../../types/context";
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
        },
        editLesson: async (_: unknown, args: { lessons: EditLessonInput }, context: MyContext) => {
            const { creatorId, role } = context.session ?? {};
            if (!creatorId || role !== "CREATOR") {
                throw new Error("Unauthorized: Only course creators can edit lessons.");
            }
            console.log(args.lessons)
            return await lessonService.edit(args.lessons, creatorId)
        }
    }
}