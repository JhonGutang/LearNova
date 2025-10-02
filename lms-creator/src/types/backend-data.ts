// Course
export enum Status {
  PUBLISHED = "PUBLISHED",
  DRAFT = "DRAFT",
  UNLISTED = "UNLISTED",
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  creatorName: string;
  description: string;
  status: string;
  categories: string[];
  createdAt: string;
}

export interface CourseWithLessons extends Course {
  lessons: Lesson[];
  updated_at: string;
  totalNumberOfStudents?: number;
}

export type CreateCourseFormData = Omit<Course, "id" | "status" | "createdAt">;

export interface CreateCourseResponse {
  createCourse: Course
}

export interface Lesson {
  id: number,
  title: string;
  description: string;
  progressLevel?: number;
}

export interface CreateLessonFormData extends Omit<Lesson, 'progressLevel' | "id"> {}

export interface CreateLessonResponse {
  createLesson: Lesson
}