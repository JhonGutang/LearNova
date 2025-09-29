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

export interface CourseWithCreatorBase {
    id: string;
    creatorName: string;
    title: string;
    tagline?: string;
    categories: string[];
}

export interface CourseWithCreatorAndLessons extends CourseWithCreatorBase {
    creatorMiddleName?: string | null;
    description: string;
    lessons: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
}