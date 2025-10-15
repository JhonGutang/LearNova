import prisma from "../../../config/prisma";
import { ResponseStatus } from "../../../generated/graphql";
import { MyContext } from "../../../types/context";
import { LessonRepository } from "../lessons/lesson.repository";
import { LevelSystemService } from "../level_system/level_system.service";
import { ProgressService } from "./progress.service";


const lessonRepository = new LessonRepository(prisma)
const levelSystemService = new LevelSystemService(prisma)
const progressService = new ProgressService(lessonRepository, levelSystemService)

export const resolvers = {
  Mutation: {
    startProgress: async (
      _: unknown,
      args: { enrolledCourseId: number; lessonId: number }
    ) => {
      try {
        const isStarted = await progressService.startProgress(
          args.enrolledCourseId,
          args.lessonId
        );
        if (isStarted.progressStatus === "FAILED") {
          return {
            status: ResponseStatus.Error,
            progressStatus: isStarted.progressStatus,
            message: isStarted.message,
          };
        }

        return {
          status: ResponseStatus.Success,
          progressStatus: isStarted.progressStatus,
          message: isStarted.message,
        };
      } catch (error) {
        console.error("Error starting progress:", error);
        return {
          status: ResponseStatus.Error,
          progressStatus: "FAILED",
          message: "Internal server error",
        };
      }
    },
    finishProgress: async (
      _: unknown,
      args: { lessonId: number },
      context: MyContext
    ) => {
      try {
        const { studentId } = context.session

        if(!studentId) {
          return {
            status: ResponseStatus.Error,
            message: "Student not found",
          }
        }

        const isStarted = await progressService.finishProgress(
          studentId,
          args.lessonId
        );

        if (isStarted.progressStatus === "FAILED") {
          return {
            status: ResponseStatus.Error,
            progressStatus: isStarted.progressStatus,
            message: isStarted.message,
          };
        }

        return {
          status: ResponseStatus.Success,
          progressStatus: isStarted.progressStatus,
          message: isStarted.message,
        };
      } catch (error) {
        console.error("Error starting progress:", error);
        return {
          status: ResponseStatus.Error,
          progressStatus: "FAILED",
          message: "Internal server error",
        };
      }
    }
  }
};