import * as ApolloReact from "@apollo/client/react";
import { COURSES_PAGE_QUERY } from "./query";
import { Course } from "@/types/data";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  level: number;
  exp: number;
}

export interface CoursesPageData {
  coursesPage: {
    allCourses: Course[];
    featuredCourses: Course[];
    enrollCourse: (Course & { studentEnrollment?: any })[];
    student: Student;
  }
}

// Custom hook to fetch courses page data
export function useCourses() {
  const { data, loading, error, refetch } = ApolloReact.useQuery<CoursesPageData>(COURSES_PAGE_QUERY);
  return {
    coursesPageData: data?.coursesPage,
    loading,
    error,
    refetch,
  };
}
