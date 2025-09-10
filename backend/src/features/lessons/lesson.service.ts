import { LessonPayload } from "../../interfaces/lesson.interface";
import { LessonRepository } from "../../repositories/lesson.repository";

interface LessonServiceInterface {
    createLesson(lessonData: LessonPayload): Promise<object>; 
}

export class LessonService implements LessonServiceInterface{
    private lessonRepository: LessonRepository;

    constructor() {
        this.lessonRepository = new LessonRepository();
    }

    async createLesson(lessonData: LessonPayload): Promise<object> {
        return await this.lessonRepository.create(lessonData);
    }
}
