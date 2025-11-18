// Base Lesson interface
export interface Lesson {
  id?: string | number;
  title: string;
  description: string;
}

// Lesson with progress level (used in creator app)
export interface LessonWithProgress extends Lesson {
  id: number;
  progressLevel?: number;
}

// Lesson with progress tracking (used in student app)
export interface LessonWithProgressTracking extends Lesson {
  progress: LessonProgress;
}

// Lesson progress information
export interface LessonProgress {
  id?: string;
  status?: string;
  completedAt: string;
}

// Lesson pages
export interface LessonPages {
  id: number;
  lessonId: number;
  pageNumber: number;
  contentJson: string;
  createdAt: string;
}

// Lesson creation form data
export interface CreateLessonFormData extends Omit<LessonWithProgress, 'progressLevel' | "id"> {}

// Lesson creation response
export interface CreateLessonResponse {
  createLesson: LessonWithProgress;
}

