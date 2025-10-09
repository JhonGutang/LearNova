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
    firstName: string;
    lastName: string;
    middleName?: string;
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

export interface Lesson {
    id?: string | number
    title: string
    description: string 
    progress: LessonProgress
}

interface LessonProgress {
    id?: string
    status?: string
    completedAt: string
}

export interface CourseWithLessons extends Course {
    description: string;
    enrolledCourseId: number;
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

export interface Post {
    id: string;
    owner: PostOwner
    topic: string;
    content: string;
    hasLiked: boolean;
    createdAt: string;
    comments: Comment[]
}

interface PostOwner {
    id: string
    firstName: string
    lastName: string
}

export interface ReactPostInput {
    postId: string;
    isLiked: boolean;
  }

export interface Comment {
    id: string
    owner: string
    comment: string
}