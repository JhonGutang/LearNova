import { Lesson } from './lesson';

// Base Course interface - core fields shared across both apps
export interface Course {
  id: string;
  title: string;
  tagline?: string;
  description?: string;
  status?: string;
  categories: string[];
  createdAt?: string;
}

// Course with creator information (used in student app)
export interface CourseWithCreator extends Course {
  creator: {
    firstName: string;
    lastName: string;
  };
  studentEnrollment?: StudentEnrollment;
}

// Course with creator name string (used in creator app)
export interface CourseWithCreatorName extends Course {
  creatorName: string;
  totalNumberOfParticipants?: number;
  totalNumberOfLessons?: number;
}

// Course with lessons - base structure
export interface CourseWithLessonsBase extends Course {
  lessons: Lesson[];
  status: string;
  createdAt: string;
}

// Course with lessons for creator app
export interface CourseWithLessonsCreator extends CourseWithCreatorName {
  lessons: Lesson[];
  updated_at: string;
}

// Course with lessons for student app
export interface CourseWithLessonsStudent extends CourseWithCreator {
  description: string;
  enrolledCourseId: number;
  lessons: Lesson[];
  status: string;
  createdAt: string;
}

// Student enrollment information
export interface StudentEnrollment {
  enrolledCourseId: string;
  enrolledAt: string;
  progress: number;
}

// Course creation form data
export type CreateCourseFormData = Omit<CourseWithCreatorName, "id" | "status" | "createdAt">;

// Course creation response
export interface CreateCourseResponse {
  createCourse: CourseWithCreatorName;
}

// Course statistics for creator dashboard
export type BarChart = {
  id: number;
  title: string;
  totalEnrollees: number;
  completionRate: number;
  rateAverage?: number;
};

export type StatCards = {
  totalCourses: number;
  totalEnrollees: number;
};

export type EnrolleeRating = {
  rate: number;
  count: number;
};

// Course progress tracking
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

