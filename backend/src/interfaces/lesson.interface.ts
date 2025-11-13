import { EditLessonInput, Lesson } from "../generated/graphql";

export interface LessonPayload {
    course_id: number;
    title: string;
    description: string;
}

export interface LessonServiceInterface {
    create(lessonData: LessonPayload): Promise<Lesson>;
    edit(lessons: EditLessonInput, creatorId: number): Promise<Lesson[]>;
}