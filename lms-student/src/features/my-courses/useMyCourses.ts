import * as ApolloReact from "@apollo/client/react";
import { ENROLLED_COURSES_QUERY } from "./query";
import { Course } from "@/types/data";

interface EnrolledCoursesData {
  enrolledCourses: Course[];
}

export const useMyCourses = () => {
  const { data, loading, error, refetch } = ApolloReact.useQuery<EnrolledCoursesData>(ENROLLED_COURSES_QUERY);

  return {
    courses: data?.enrolledCourses ?? [],
    loading,
    error,
    refetch,
  };
};
