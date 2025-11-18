// Type aliases for convenient usage
// Note: Since both apps need different variants, they should import the specific types
// This file provides additional convenience exports

import { CourseWithLessonsStudent } from './course';

// Student-specific type
export interface SpecificPageData {
  specificCoursePage: {
    student: {
      firstName: string;
      lastName: string;
    };
    course: CourseWithLessonsStudent;
  };
}

