import express, { Router } from "express";
import { LessonController } from "./lesson.controller";

const router: Router = express.Router();
const lessonController = new LessonController();

router.post("/lesson", lessonController.createLesson);
router.get("/course/:courseId/lessons", lessonController.getLessonsByCourseid)

export default router;
