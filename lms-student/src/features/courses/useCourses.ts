import * as ApolloReact from "@apollo/client/react";
import { COURSES_PAGE_QUERY, SEARCH_COURSE_QUERY } from "./query";
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

export interface SearchCourseData {
  searchCourse: (Course & { studentEnrollment?: any })[];
}

export function useCourses(category: string) {
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

export function useSearchCourse(title: string) {
  const { data, loading, error, refetch } = ApolloReact.useQuery<SearchCourseData>(SEARCH_COURSE_QUERY, {
    variables: { title },
    skip: !title,
  });

  return {
    courses: data?.searchCourse,
    loading,
    error,
    refetch,
  };
}
