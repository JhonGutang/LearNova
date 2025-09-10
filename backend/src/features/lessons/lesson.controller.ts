import { Request, Response } from "express";
import { LessonService } from "./lesson.service";
import { LessonPayload } from "../../interfaces/lesson.interface";

export class LessonController {
    private lessonService: LessonService;

    constructor() {
        this.lessonService = new LessonService();
    }

    createLesson = async(req: Request, res: Response) => {
        try {
            const lessonData: LessonPayload = req.body;
            const newLesson = await this.lessonService.createLesson(lessonData);
            res.status(201).json(newLesson);
        } catch (error) {
            console.error("Error creating lesson:", error);
            res.status(500).json({ message: "Failed to create lesson" });
        }
    }
}
