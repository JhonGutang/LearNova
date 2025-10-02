// import { LessonInput } from "../../generated/graphql";
// import { LessonService } from "./lesson.service"

// const lessonService = new LessonService();

// export const resolvers = {
//     Query: {
//         lessons: async (_: any, args: { courseId: string }) => {
//             try {
//                 const courseId: number = parseInt(args.courseId);
//                 return await lessonService.getLessons(courseId);
//             } catch (error) {
//                 console.error("Error fetching lessons:", error);
//                 throw new Error("Failed to fetch lessons");
//             }
//         },
//         lesson: async(_: any, args: { lessonId: string }) => {
//             const lessonId: number = parseInt(args.lessonId)
//             return await lessonService.getLessonById(lessonId)
//         }
//     },

//     Mutation: {
//         createLesson: async (_: any, args: {input: LessonInput}) => {
//             try {
//                 return await lessonService.createLesson(args.input);
//             } catch (error) {
//                 console.error("Error creating lesson:", error);
//                 throw new Error("Failed to create lesson");
//             }
//         }
//     }
// }