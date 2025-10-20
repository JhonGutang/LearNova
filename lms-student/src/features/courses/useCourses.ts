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
    courses: (Course & { studentEnrollment?: any })[];
    student: Student;
  }
}

// Custom hook to fetch courses page data by category
export function useCourses(category: string) {
  console.log(category)
  const { data, loading, error, refetch } = ApolloReact.useQuery<CoursesPageData>(COURSES_PAGE_QUERY, {
    variables: { category },
  });
  return {
    coursesPageData: data?.coursesPage,
    loading,
    error,
    refetch,
  };
}
