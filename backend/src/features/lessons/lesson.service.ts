import { LessonPayload, LessonServiceInterface } from "../../interfaces/lesson.interface";
import { LessonRepository } from "../../repositories/lesson.repository";



export class LessonService implements LessonServiceInterface{
    private lessonRepository: LessonRepository;

    constructor() {
        this.lessonRepository = new LessonRepository();
    }

    async createLesson(lessonData: LessonPayload): Promise<object> {
        return await this.lessonRepository.create(lessonData);
    }

    async getLessons(courseid: number): Promise<object> {
        const lessons = this.lessonRepository.getAll(courseid);
        return lessons
    }

}
