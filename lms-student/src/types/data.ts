export enum Role {
    STUDENT = "STUDENT",
    CREATOR = "CREATOR",
}

export interface credentials {
    email: string
    password: string
    role:  Role
}

export interface studentCreateInput {
    address: string;
    email: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    password: string;
    phone: string;
}

export interface Course {
    id: string;
    creatorName: string;
    title: string;
    tagline?: string;
    categories: string[];
    isEnrolled: boolean
}

interface Lesson {
    id?: string | number
    title: string
    description: string 
}

export interface CourseWithLessons extends Course {
    description: string;
    lessons: Lesson[];
    status: string;
    createdAt: string;
}

export interface LessonPages {
    id: number,
    lessonId: number,
    pageNumber: number,
    contentJson: string
    createdAt: string
}