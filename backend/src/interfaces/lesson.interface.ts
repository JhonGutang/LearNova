export interface LessonPayload {
    course_id: number;
    title: string;
    description: string;
}

export interface LessonServiceInterface {
    createLesson(lessonData: LessonPayload): Promise<object>; 
    getLessons(courseid: number): Promise<object>
}
export interface LessonRepositoryInterface {
    create(lesson: LessonPayload): Promise<object>;
    getAll(courseId: number): Promise<object>;
}