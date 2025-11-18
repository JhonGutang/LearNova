import { ProgressResponse } from "../../../generated/graphql";
import { LessonRepository } from "../lessons/lesson.repository";
import { LevelSystemService } from "../level_system/level_system.service";

interface ProgressServiceInterface {
  startProgress(
    enrolledCourseId: number,
    lessonId: number
  ): Promise<ProgressResponse>;
  finishProgress(
    studentId: number,
    lessonId: number
  ): Promise<ProgressResponse>;
}

export class ProgressService implements ProgressServiceInterface {
  private lessonRepository: any;
  private levelSystemService: any;

  constructor(lessonRepository: LessonRepository, levelSystemService: LevelSystemService) {
    this.lessonRepository = lessonRepository;
    this.levelSystemService = levelSystemService;
  }

  async startProgress(
    enrolledCourseId: number,
    lessonId: number
  ): Promise<ProgressResponse> {
    try {
      const existingProgress = await this.lessonRepository.findLessonProgress({
        enrolledCourseId,
        lessonId,
      });
      if (existingProgress) {
        return {
          progressStatus: "IN_PROGRESS",
          message: "This lesson is already " + existingProgress.status,
        };
      }

      const newProgress = await this.lessonRepository.createLessonProgress(
        enrolledCourseId,
        lessonId
      );
      return {
        progressStatus: "STARTED",
        message: "This lesson is now " + newProgress.status,
      };
    } catch (error) {
      return {
        progressStatus: "FAILED",
        message: "Error creating lesson progress: " + error,
      };
    }
  }

  async finishProgress(
    studentId: number,
    lessonId: number
  ): Promise<ProgressResponse> {
    const existingProgress = await this.lessonRepository.findLessonProgress({
      studentId,
      lessonId,
    });
    console.log(existingProgress);
    if (!existingProgress) {
      return {
        progressStatus: "FAILED",
        message: "User doesn't have progress with this lesson",
      };
    }

    if (
      existingProgress.status &&
      existingProgress.status.toUpperCase() === "FINISHED"
    ) {
      return {
        progressStatus: "FINISHED",
        message: "Lesson progress is already marked as FINISHED.",
      };
    }

    try {
      await this.lessonRepository.updateLessonProgressStatus(
        Number(existingProgress.id),
        "FINISHED"
      );
      let expGained: number | undefined = undefined;
      if (
        (existingProgress as any).lesson &&
        typeof (existingProgress as any).lesson.exp === "number"
      ) {
        expGained = (existingProgress as any).lesson.exp;
      }

      let levelUpResult = null;
      if (typeof expGained === "number" && expGained > 0) {
        levelUpResult = await this.levelSystemService.levelUp(
          studentId,
          expGained
        );
      }

      let message = "Lesson progress marked as FINISHED";
      if (levelUpResult) {
        message += ` and student awarded ${expGained} EXP.`;
      }

      return {
        progressStatus: "FINISHED",
        message,
      };
    } catch (error) {
      return {
        progressStatus: "FAILED",
        message: "Error updating lesson progress: " + error,
      };
    }
  }
}
