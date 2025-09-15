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
  description: string;
  status: string;
  categories: string[];
  lessons: Lesson[];
  created_at: string;
  updated_at: string;
  // Optional field for display purposes
  totalNumberOfStudents?: number;
}

export interface CreateCourseFormData {
  title: string;
  tagline: string;
  description: string;
  categories: string[];
}

export interface Lesson {
  title: string;
  description: string;
  progressLevel?: number;
}

export interface CreateLessonFormData extends Omit<Lesson, 'progressLevel'> {}
