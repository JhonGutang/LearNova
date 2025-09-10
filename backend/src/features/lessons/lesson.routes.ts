import express, { Router } from "express";
import { LessonController } from "./lesson.controller";

const router: Router = express.Router();
const lessonController = new LessonController();

router.post("/lesson", lessonController.createLesson);

export default router;
