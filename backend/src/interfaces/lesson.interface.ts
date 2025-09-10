export interface LessonPayload {
    course_id: number;
    title: string;
    description: string;
}

export interface LessonRepositoryInterface {
    create(lesson: LessonPayload): Promise<object>;
}