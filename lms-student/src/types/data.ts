export enum Role {
  STUDENT = "STUDENT",
  CREATOR = "CREATOR",
}

export interface credentials {
  email: string;
  password: string;
  role: Role;
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
  creator: {
    firstName: string,
    lastName: string
  }
  title: string;
  tagline?: string;
  description?: string;
  status?: string;
  categories: string[];
  createdAt?: string;
  studentEnrollment?: StudentEnrollment
}

export interface Lesson {
  id?: string | number;
  title: string;
  description: string;
  progress: LessonProgress;
}

interface LessonProgress {
  id?: string;
  status?: string;
  completedAt: string;
}

export interface CourseWithLessons extends Course {
  description: string;
  enrolledCourseId: number;
  lessons: Lesson[];
  status: string;
  createdAt: string;
}

export interface LessonPages {
  id: number;
  lessonId: number;
  pageNumber: number;
  contentJson: string;
  createdAt: string;
}

export interface Post {
  id: string;
  owner: PostOwner;
  topic: string;
  content: string;
  hasLiked: boolean;
  createdAt: string;
  comments: Comment[];
  reactionCount: number;
}

interface PostOwner {
  id: string;
  firstName: string;
  lastName: string;
}

export interface ReactPostInput {
  postId: string;
  isLiked: boolean;
}

export interface Comment {
  id: string;
  owner: string;
  comment: string;
}

export interface DashboardPage {
  student: Student;
  coursesInProgress: CoursesInProgress[];
  courseRecommendations: CourseRecommendation[];
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  level: number;
  exp: number;
}

export interface CoursesInProgress {
  courseId: string;
  title: string;
  tagline: string;
  progressPercentage: number;
}

export interface CourseRecommendation {
  courseId: string;
  title: string;
  tagline: string;
  rate: number;
}

export interface Error {
  message: string;
}


export interface StudentEnrollment {
  enrolledCourseId: string;
  enrolledAt: string; 
  progress: number;
}
